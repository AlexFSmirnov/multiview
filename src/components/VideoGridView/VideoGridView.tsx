import { useState, useEffect, useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { Video } from '../../redux/types';
import { getOptimalGridPlayerSize } from '../../utils/getOptimalGridPlayerSize';
import { VideoPlayer } from '../VideoPlayer';
import { VideoGridViewContainer } from './style';

const CONTAINER_PADDING = 4;

interface VideoGridViewProps {
    videos: Record<string, Video>;
    padding?: number;
}

const VideoGridView: React.FC<VideoGridViewProps> = ({ videos, padding = 0 }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [playerSize, setPlayerSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

    useEffect(() => {
        const { current: container } = containerRef;
        if (container) {
            const handleWindowResize = () => {
                const numberOfPlayers = Object.keys(videos).length;

                if (numberOfPlayers === 0) {
                    setPlayerSize({ width: 0, height: 0 });
                    return;
                }

                const { playerWidth, playerHeight } = getOptimalGridPlayerSize({
                    containerWidth: container.clientWidth - CONTAINER_PADDING,
                    containerHeight: container.clientHeight - CONTAINER_PADDING,
                    numberOfPlayers,
                });

                setPlayerSize({ width: playerWidth - padding, height: playerHeight - padding });
            };

            handleWindowResize();

            new ResizeObserver(handleWindowResize).observe(container);
        }
    }, [videos, padding, containerRef]);
    
    return (
        <VideoGridViewContainer ref={containerRef}>
            {Object.keys(videos).map(id => (
                <VideoPlayer key={id} id={id} video={videos[id]} width={playerSize.width} height={playerSize.height} />
            ))}
        </VideoGridViewContainer>
    );
};

export default VideoGridView;
