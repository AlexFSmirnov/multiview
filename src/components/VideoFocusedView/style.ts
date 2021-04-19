import styled from 'styled-components';
import { PlayerPosition } from './types';

export const VideoFocusedViewContainer = styled.div`
    position: relative;

    width: 100%;
    flex-grow: 1;

    overflow: hidden;
`;

interface VideoFocusedViewPlayerWrapperProps extends PlayerPosition {
    padding: number;
}

export const VideoFocusedViewPlayerWrapper = styled.div<VideoFocusedViewPlayerWrapperProps>`
    position: absolute;
    top: ${props => props.top}px;
    left: ${props => props.left}px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    padding: ${props => props.padding}px;
`;

interface VideoFocusedViewDividerProps {
    heightFraction: number;
}

export const VideoFocusedViewDivider = styled.div<VideoFocusedViewDividerProps>`
    position: absolute;
    top: ${props => props.heightFraction * 100}%;
    left: 0;
    right: 0;
    height: 10px;

    opacity: 0;
    transition: opacity 200ms;

    &:hover {
        opacity: 1;
    }

    cursor: ns-resize;
    z-index: 10000;
`;

export const VideoFocusedViewDividerDashes = styled.div`
    position: absolute;
    top: 3.5px;
    left: 16px;
    right: 16px;
    height: 0;

    border-top: 3px dashed rgba(255, 255, 255, 0.3);
`;
