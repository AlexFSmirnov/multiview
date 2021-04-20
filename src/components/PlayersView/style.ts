import styled from 'styled-components';
import { PlayerPosition } from './types';

export const PlayersViewContainer = styled.div`
    position: relative;

    width: 100%;
    flex-grow: 1;

    overflow: hidden;
`;

interface PlayersViewPlayerWrapperProps extends PlayerPosition {
    padding: number;
    zIndex?: number;
}

export const PlayersViewPlayerWrapper = styled.div<PlayersViewPlayerWrapperProps>`
    position: absolute;
    top: ${props => props.top}px;
    left: ${props => props.left}px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    padding: ${props => props.padding}px;

    ${props => props.zIndex ? `z-index: ${props.zIndex};` : ''}

    transition: 300ms;
`;

interface PlayersFocusedViewGrabberProps {
    heightFraction: number;
}

export const PlayersFocusedViewGrabber = styled.div<PlayersFocusedViewGrabberProps>`
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
    z-index: 1;
`;

export const PlayersFocusedViewGrabberDashes = styled.div`
    position: absolute;
    top: 3.5px;
    left: 16px;
    right: 16px;
    height: 0;

    border-top: 3px dashed rgba(255, 255, 255, 0.3);
`;

interface PlayersOverlayViewGrabberProps {
    top: number;
    left: number;
    height: number;
}

export const PlayersOverlayViewGrabber = styled.div<PlayersOverlayViewGrabberProps>`
    position: absolute;
    top: ${props => props.top}px;
    left: ${props => props.left}px;

    width: 10px;
    height: ${props => props.height}px;

    opacity: 0;
    transition: opacity 200ms;

    &:hover {
        opacity: 1;
    }

    cursor: ew-resize;
    z-index: 3;
`;

export const PlayersOverlayViewGrabberDashes = styled.div<{ color: string }>`
    position: absolute;
    top: 4px;
    left: 2px;
    bottom: 4px;
    width: 0;

    border-left: 4px dashed ${props => props.color};
`;
