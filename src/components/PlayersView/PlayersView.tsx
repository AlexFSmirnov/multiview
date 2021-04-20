import { useState, useRef, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useTheme } from '@material-ui/core';
import { getOptimalGridPlayerSize, getPlayerGridPositions, getPlayerLinePositions } from '../../utils';
import { State, VideosState, Layout } from '../../redux/types';
import { getIsFullscreen, getLayout, getMainPlayerIds, getSecondaryPlayerIds, getVideos } from '../../redux/selectors';
import { VideoPlayer } from '../VideoPlayer';
import { PlayerPosition } from './types';
import { PlayersViewContainer, PlayersFocusedViewGrabber, PlayersFocusedViewGrabberDashes, PlayersViewPlayerWrapper, PlayersOverlayViewGrabber, PlayersOverlayViewGrabberDashes } from './style';

interface OwnProps {
    padding?: number;
    minPlayerHeight?: number;
}

interface StateProps {
    layout: Layout;
    videos: VideosState;
    isFullscreen: boolean;
    mainPlayerIds: string[];
    secondaryPlayerIds: string[];
}

export type PlayersViewProps = OwnProps & StateProps;

const PlayersView: React.FC<PlayersViewProps> = ({
    padding = 8,
    minPlayerHeight = 150,
    layout,
    videos,
    isFullscreen,
    mainPlayerIds,
    secondaryPlayerIds,
}) => {
    const theme = useTheme();
    
    const containerRef = useRef<HTMLDivElement | null>(null);
    
    const [playerPositions, setPlayerPositions] = useState<Record<string, PlayerPosition>>({});
    const [isGrabberGrabbed, setIsGrabberGrabbed] = useState(false);
    const [focusedGrabberHeightFraction, setFocusedGrabberHeightFraction] = useState(0.75);
    const [overlayGrabberWidthFraction, setOverlayGrabberWidthFraction] = useState(0.3);
    const [overlayDimensions, setOverlayDimensions] = useState<{ rows: number; cols: number }>({ rows: 0, cols: 0 });

    // TODO: Fix the weird thingy happening when changing focused player in overlay view.

    const updatePlayersFocusedPosition = useCallback(() => {
        const { current: container } = containerRef;
        if (container) {
            const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();

            const mainContainerHeight = containerHeight * focusedGrabberHeightFraction;
            const secondaryContainerHeight = containerHeight * (1 - focusedGrabberHeightFraction) - 10;

            const mainPlayersSize = getOptimalGridPlayerSize({
                containerWidth,
                containerHeight: mainContainerHeight,
                numberOfPlayers: mainPlayerIds.length,
            });

            const secondaryPlayersSize = getOptimalGridPlayerSize({
                containerWidth,
                containerHeight: secondaryContainerHeight,
                numberOfPlayers: secondaryPlayerIds.length,
            });

            const mainPlayerPositions = getPlayerGridPositions({
                ...mainPlayersSize,
                containerWidth,
                containerHeight: mainContainerHeight,
                numberOfPlayers: mainPlayerIds.length,
            });

            const offsetSecondaryPlayerPositions = getPlayerGridPositions({
                ...secondaryPlayersSize,
                containerWidth,
                containerHeight: secondaryContainerHeight,
                numberOfPlayers: secondaryPlayerIds.length,
            });

            const secondaryPlayerPositions = offsetSecondaryPlayerPositions.map(pos => ({ ...pos, top: pos.top + mainContainerHeight + 10 }));

            const keyedMainPlayerPositions = mainPlayerIds.reduce(
                (positions, id, index) => ({
                    ...positions,
                    [id]: mainPlayerPositions[index],
                }),
                {},
            );

            const keyedSecondaryPlayerPositions = secondaryPlayerIds.reduce(
                (positions, id, index) => ({
                    ...positions,
                    [id]: secondaryPlayerPositions[index],
                }),
                {},
            );

            setPlayerPositions({ ...keyedMainPlayerPositions, ...keyedSecondaryPlayerPositions });
        }
    }, [mainPlayerIds, secondaryPlayerIds, focusedGrabberHeightFraction]);

    const updatePlayersOverlayPosition = useCallback(() => {
        if (mainPlayerIds.length === 0) {
            setPlayerPositions({});
        }

        const { current: container } = containerRef;
        if (container) {
            const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();

            const mainPlayerSize = getOptimalGridPlayerSize({
                containerWidth,
                containerHeight,
                numberOfPlayers: 1
            });

            const mainPlayerPosition = getPlayerGridPositions({
                ...mainPlayerSize,
                containerWidth,
                containerHeight,
                numberOfPlayers: 1
            })[0];

            const lineWidth = mainPlayerPosition.width * overlayGrabberWidthFraction;

            const {
                positions: offsetSecondaryPlayerPositions,
                rows: overlayRows,
                cols: overlayCols,
            } = getPlayerLinePositions({
                lineWidth,
                minPlayerHeight,
                containerHeight: mainPlayerSize.playerHeight - padding * 2 - 40,
                numberOfPlayers: secondaryPlayerIds.length,
            });

            const secondaryPlayerPositions = offsetSecondaryPlayerPositions.map(pos => ({
                ...pos,
                top: pos.top + mainPlayerPosition.top + padding,
                left: pos.left + (mainPlayerPosition.width - lineWidth) + mainPlayerPosition.left - padding,
            }));

            const keyedSecondaryPlayerPositions = secondaryPlayerIds.reduce(
                (positions, id, index) => ({
                    ...positions,
                    [id]: secondaryPlayerPositions[index],
                }),
                {},
            );

            setOverlayDimensions({
                rows: overlayRows,
                cols: overlayCols,
            });

            setPlayerPositions({
                [mainPlayerIds[0]]: mainPlayerPosition,
                ...keyedSecondaryPlayerPositions,
            });
        }
    }, [padding, mainPlayerIds, secondaryPlayerIds, minPlayerHeight, overlayGrabberWidthFraction]);

    const updatePlayersGridPosition = useCallback(() => {
        const { current: container } = containerRef;
        if (container) {
            const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();

            const playersSize = getOptimalGridPlayerSize({
                containerWidth,
                containerHeight,
                numberOfPlayers: Object.keys(videos).length,
            })

            const playerPositions = getPlayerGridPositions({
                ...playersSize,
                containerWidth,
                containerHeight,
                numberOfPlayers: Object.keys(videos).length,
            });

            const keyedPlayerPositions = Object.keys(videos).reduce(
                (positions, id, index) => ({
                    ...positions,
                    [id]: playerPositions[index],
                }),
                {},
            );

            setPlayerPositions(keyedPlayerPositions);
        }
    }, [videos]);

    useEffect(() => {
        switch (layout) {
            case Layout.Focused:
                updatePlayersFocusedPosition();
                break;
            case Layout.Overlay:
                updatePlayersOverlayPosition();
                break;
            case Layout.Grid:
                updatePlayersGridPosition();
                break;
        }
    }, [containerRef, layout, videos, isFullscreen, updatePlayersFocusedPosition, updatePlayersOverlayPosition, updatePlayersGridPosition]);

    const getPlayerPosition = useCallback((id: string) => {
        return playerPositions[id] || { top: -100000, left: -100000, width: 0, height: 0 };
    }, [playerPositions]);

    const getOverlayGrabberPosition = () => {
        const { current: container } = containerRef;
        if (secondaryPlayerIds.length === 0 || mainPlayerIds.length === 0 || !container) {
            return { top: -10000, left: -10000, height: 10000 };
        }

        const { top: mainPlayerTop, left: mainPlayerLeft, width: mainPlayerWidth } = getPlayerPosition(mainPlayerIds[0]);
        const { height: secondaryPlayerHeight } = getPlayerPosition(secondaryPlayerIds[0]);
        const { rows } = overlayDimensions;

        return {
            top: mainPlayerTop + padding,
            left: mainPlayerLeft + mainPlayerWidth * (1 - overlayGrabberWidthFraction) - padding,
            height: secondaryPlayerHeight * rows,
        };
    };

    const updateOverlayGrabberWidthFraction = useCallback(() => {
        const { cols } = overlayDimensions;

        if (mainPlayerIds.length > 0 && secondaryPlayerIds.length > 0) {
            const { width: mainPlayerWidth } = getPlayerPosition(mainPlayerIds[0]);
            const { width: secondaryPlayerWidth } = getPlayerPosition(secondaryPlayerIds[0]);

            const overlayWidth = cols * secondaryPlayerWidth;

            if (mainPlayerWidth > 0 && overlayWidth > 0) {
                const newOverlayGrabberWidthFraction = overlayWidth / mainPlayerWidth;
                if (newOverlayGrabberWidthFraction <= 1) {
                    setOverlayGrabberWidthFraction(overlayWidth / mainPlayerWidth);
                }
            }
        }
    }, [getPlayerPosition, mainPlayerIds, secondaryPlayerIds, overlayDimensions]);

    useEffect(() => {
        if (!isGrabberGrabbed) {
            updateOverlayGrabberWidthFraction();
        }
    }, [overlayDimensions, isGrabberGrabbed, updateOverlayGrabberWidthFraction]);

    const handleWindowMouseMove = useCallback((event: MouseEvent) => {
        const { current: container } = containerRef;
        if (container && isGrabberGrabbed) {
            if (layout === Layout.Focused) {
                const mouseY = event.clientY;
                const { height: containerHeight, y: containerY } = container.getBoundingClientRect();

                const relativeMouseY = mouseY - containerY;
                const clampedMouseY = Math.max(minPlayerHeight, Math.min(containerHeight - minPlayerHeight, relativeMouseY));

                setFocusedGrabberHeightFraction(clampedMouseY / containerHeight);
            }

            if (layout === Layout.Overlay && mainPlayerIds.length > 0) {
                const mouseX = event.clientX;
                const { left: mainPlayerLeft, width: mainPlayerWidth } = getPlayerPosition(mainPlayerIds[0]);

                const minPlayerWidth = minPlayerHeight / 9 * 16;
                const relativeMouseX = mouseX - mainPlayerLeft;
                const clampedMouseX = Math.max(0, Math.min(mainPlayerWidth - minPlayerWidth, relativeMouseX));

                setOverlayGrabberWidthFraction(1 - clampedMouseX / mainPlayerWidth);
            }
        }
    }, [getPlayerPosition, layout, mainPlayerIds, minPlayerHeight, isGrabberGrabbed]);

    const handleGrabberMouseDown = () => {
        setIsGrabberGrabbed(true);
    };

    const handleGrabberMouseUp = useCallback(() => {
        if (layout === Layout.Overlay) {
            updateOverlayGrabberWidthFraction();
        }
        setIsGrabberGrabbed(false);
    }, [layout, updateOverlayGrabberWidthFraction]);

    useEffect(() => {
        if (isGrabberGrabbed) {
            window.addEventListener('mousemove', handleWindowMouseMove);
            window.addEventListener('mouseup', handleGrabberMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleWindowMouseMove);
            window.removeEventListener('mouseup', handleGrabberMouseUp);
        };
    }, [isGrabberGrabbed, handleWindowMouseMove, handleGrabberMouseUp]);

    const focusedGrabberProps = {
        heightFraction: focusedGrabberHeightFraction,
        onMouseDown: handleGrabberMouseDown,
        onMouseUp: handleGrabberMouseUp,
    };

    const overlayGrabberProps = {
        ...getOverlayGrabberPosition(),
        onMouseDown: handleGrabberMouseDown,
        onMouseUp: handleGrabberMouseUp,
    };

    return (
        <PlayersViewContainer ref={containerRef}>
            {layout === Layout.Focused ? (
                <PlayersFocusedViewGrabber {...focusedGrabberProps}>
                    <PlayersFocusedViewGrabberDashes />
                </PlayersFocusedViewGrabber>
            ) : null}

            {layout === Layout.Overlay ? (
                <PlayersOverlayViewGrabber {...overlayGrabberProps}>
                    <PlayersOverlayViewGrabberDashes color={theme.palette.primary.main} />
                </PlayersOverlayViewGrabber>
            ) : null}

            {[...mainPlayerIds, ...secondaryPlayerIds].map(id => {
                const playerPosition = getPlayerPosition(id);

                return (
                    <PlayersViewPlayerWrapper key={id} padding={padding} {...playerPosition}>
                        <VideoPlayer id={id} video={videos[id]} width={playerPosition.width - padding * 2} height={playerPosition.height - padding * 2} />
                    </PlayersViewPlayerWrapper>
                );
            })}
        </PlayersViewContainer>
    );
};

export default connect<StateProps, {}, OwnProps, State>(
    createStructuredSelector({
        layout: getLayout,
        videos: getVideos,
        isFullscreen: getIsFullscreen,
        mainPlayerIds: getMainPlayerIds,
        secondaryPlayerIds: getSecondaryPlayerIds,
    }),
)(PlayersView);
