import styled from 'styled-components';

interface VideoPlayerContainerProps {
    width: number;
    height: number;
    shadow?: boolean;
}

export const VideoPlayerContainer = styled.div<VideoPlayerContainerProps>`
    position: relative;

    width: ${props => props.width}px;
    height: ${props => props.height}px;

    ${props => props.shadow ? `
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4);
    ` : null}
`;

export const ReactPlayerWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;
