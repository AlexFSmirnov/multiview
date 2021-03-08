import { useState, useEffect, useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { getOptimalGridPlayerSize } from '../../utils/getOptimalGridPlayerSize';
import { VideoPlayer } from '../VideoPlayer';
import { VideoGridViewContainer } from './style';

const CONTAINER_PADDING = 4;

const videos = [
    { url: 'https://www.youtube.com/watch?v=ODY6JWzS8WU' },
    { url: 'https://www.youtube.com/watch?v=ODY6JWzS8WU' },
    { url: 'https://www.youtube.com/watch?v=ODY6JWzS8WU' },
    { url: 'https://www.youtube.com/watch?v=ODY6JWzS8WU' },
];

interface VideoGridViewProps {
    padding?: number;
}

const VideoGridView: React.FC<VideoGridViewProps> = ({ padding = 0 }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [playerSize, setPlayerSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

    useEffect(() => {
        const { current: container } = containerRef;
        if (container) {
            const handleWindowResize = () => {
                const { playerWidth, playerHeight } = getOptimalGridPlayerSize({
                    containerWidth: container.clientWidth - CONTAINER_PADDING,
                    containerHeight: container.clientHeight - CONTAINER_PADDING,
                    numberOfPlayers: 4,
                });

                console.log({ playerWidth, playerHeight });

                setPlayerSize({ width: playerWidth - padding, height: playerHeight - padding });
            };

            handleWindowResize();

            new ResizeObserver(handleWindowResize).observe(container);
        }
    }, [padding, containerRef]);
    
    return (
        <VideoGridViewContainer ref={containerRef}>
            {/* {Array.from({ length: 4 }).map(v => (
                <VideoPlayer width={playerSize.width} height={playerSize.height} />
            ))} */}
        </VideoGridViewContainer>
    );
};

export default VideoGridView;
