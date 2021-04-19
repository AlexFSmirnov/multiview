import { useState, useRef, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getPlayerGridPositions } from '../../utils/getPlayerGridPositions';
import { State, VideosState, Layout } from '../../redux/types';
import { getIsFullscreen, getLayout, getMainPlayerIds, getSecondaryPlayerIds, getVideos } from '../../redux/selectors';
import { VideoPlayer } from '../VideoPlayer';
import { PlayerPosition } from './types';
import { PlayersViewContainer, PlayersViewDivider, PlayersViewDividerDashes, PlayersViewPlayerWrapper } from './style';

interface OwnProps {
    padding?: number;
    minFocusedGroupHeight?: number;
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
    minFocusedGroupHeight = 32,
    layout,
    videos,
    isFullscreen,
    mainPlayerIds,
    secondaryPlayerIds,
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    
    const [mainPlayersHeightFraction, setMainPlayersHeightFraction] = useState(0.75);
    const [playerPositions, setPlayerPositions] = useState<Record<string, PlayerPosition>>({});

    const updatePlayersFocusedPosition = useCallback(() => {
        const { current: container } = containerRef;
        if (container) {
            const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();

            const mainContainerHeight = containerHeight * mainPlayersHeightFraction;
            const secondaryContainerHeight = containerHeight * (1 - mainPlayersHeightFraction) - 10;

            const mainPlayerPositions = getPlayerGridPositions({
                containerWidth,
                containerHeight: mainContainerHeight,
                numberOfPlayers: mainPlayerIds.length,
            });

            const offsetSecondaryPlayerPositions = getPlayerGridPositions({
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
    }, [mainPlayerIds, secondaryPlayerIds, mainPlayersHeightFraction]);

    const updatePlayersGridPosition = useCallback(() => {
        const { current: container } = containerRef;
        if (container) {
            const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();

            const playerPositions = getPlayerGridPositions({
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
            case Layout.Grid:
                updatePlayersGridPosition();
                break;
        }
    }, [containerRef, layout, videos, isFullscreen, updatePlayersFocusedPosition, updatePlayersGridPosition]);

    const handleWindowMouseMove = (event: MouseEvent) => {
        const { current: container } = containerRef;
        if (container) {
            const mouseY = event.clientY;
            const { height: containerHeight, y: containerY } = container.getBoundingClientRect();

            const relativeMouseY = mouseY - containerY;
            const clampedMouseY = Math.max(minFocusedGroupHeight, Math.min(containerHeight - minFocusedGroupHeight, relativeMouseY));

            setMainPlayersHeightFraction(clampedMouseY / containerHeight);
        }
    };

    const handleDividerMouseDown = () => {
        window.addEventListener('mousemove', handleWindowMouseMove);
        window.addEventListener('mouseup', handleDividerMouseUp);
    };

    const handleDividerMouseUp = () => {
        window.removeEventListener('mousemove', handleWindowMouseMove);
        window.removeEventListener('mouseup', handleDividerMouseUp);
    };

    const dividerProps = {
        heightFraction: mainPlayersHeightFraction,
        onMouseDown: handleDividerMouseDown,
        onMouseUp: handleDividerMouseUp,
    };

    return (
        <PlayersViewContainer ref={containerRef}>
            {layout === Layout.Focused ? (
                <PlayersViewDivider {...dividerProps}>
                    <PlayersViewDividerDashes />
                </PlayersViewDivider>
            ) : null}

            {Object.entries(videos).map(([id, video]) => (
                playerPositions[id]
                    ? (
                        <PlayersViewPlayerWrapper key={id} padding={padding} {...playerPositions[id]}>
                            <VideoPlayer id={id} video={video} width={playerPositions[id].width - padding * 2} height={playerPositions[id].height - padding * 2} />
                        </PlayersViewPlayerWrapper>
                    )
                    : null
            ))}
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
