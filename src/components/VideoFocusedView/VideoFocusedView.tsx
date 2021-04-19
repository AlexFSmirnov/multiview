import { useState, useRef, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { State, Video } from '../../redux/types';
import { getPlayerGridPositions } from '../../utils/getPlayerGridPositions';
import { getIsFullscreen, getMainPlayerIds, getSecondaryPlayerIds } from '../../redux/selectors';
import { VideoPlayer } from '../VideoPlayer';
import { PlayerPosition } from './types';
import {
    VideoFocusedViewContainer,
    VideoFocusedViewDivider,
    VideoFocusedViewDividerDashes,
    VideoFocusedViewPlayerWrapper,
} from './style';

interface OwnProps {
    videos: Record<string, Video>;
    padding: number;
    minGroupHeight?: number;
}

interface StateProps {
    isFullscreen: boolean;
    mainPlayerIds: string[];
    secondaryPlayerIds: string[];
}

export type VideoFocusedViewProps = OwnProps & StateProps;

const VideoFocusedView: React.FC<VideoFocusedViewProps> = ({
    videos,
    padding,
    minGroupHeight = 32,
    isFullscreen,
    mainPlayerIds,
    secondaryPlayerIds,
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    
    const [mainPlayersHeightFraction, setMainPlayersHeightFraction] = useState(0.75);
    const [playerPositions, setPlayerPositions] = useState<Record<string, PlayerPosition>>({});

    const updatePlayerPositions = useCallback(() => {
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

    useEffect(() => {
        updatePlayerPositions();
    }, [containerRef, videos, isFullscreen, updatePlayerPositions]);

    const handleWindowMouseMove = (event: MouseEvent) => {
        const { current: container } = containerRef;
        if (container) {
            const mouseY = event.clientY;
            const { height: containerHeight, y: containerY } = container.getBoundingClientRect();

            const relativeMouseY = mouseY - containerY;
            const clampedMouseY = Math.max(minGroupHeight, Math.min(containerHeight - minGroupHeight, relativeMouseY));

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
        <VideoFocusedViewContainer ref={containerRef}>
            <VideoFocusedViewDivider {...dividerProps}>
                <VideoFocusedViewDividerDashes />
            </VideoFocusedViewDivider>

            {Object.entries(videos).map(([id, video]) => (
                playerPositions[id]
                    ? (
                        <VideoFocusedViewPlayerWrapper key={id} padding={padding} {...playerPositions[id]}>
                            <VideoPlayer id={id} video={video} width={playerPositions[id].width - padding * 2} height={playerPositions[id].height - padding * 2} />
                        </VideoFocusedViewPlayerWrapper>
                    )
                    : null
            ))}
        </VideoFocusedViewContainer>
    );
};

export default connect<StateProps, {}, OwnProps, State>(
    createStructuredSelector({
        isFullscreen: getIsFullscreen,
        mainPlayerIds: getMainPlayerIds,
        secondaryPlayerIds: getSecondaryPlayerIds,
    }),
)(VideoFocusedView);
