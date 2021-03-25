import styled from 'styled-components';

export const VideoPlayerContainer = styled.div<{ width: number; height: number }>`
    position: relative;

    width: ${props => props.width}px;
    height: ${props => props.height}px;
`;

export const ReactPlayerWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;
