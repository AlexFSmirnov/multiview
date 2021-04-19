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
}

export const PlayersViewPlayerWrapper = styled.div<PlayersViewPlayerWrapperProps>`
    position: absolute;
    top: ${props => props.top}px;
    left: ${props => props.left}px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    padding: ${props => props.padding}px;
`;

interface PlayersViewDividerProps {
    heightFraction: number;
}

export const PlayersViewDivider = styled.div<PlayersViewDividerProps>`
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

export const PlayersViewDividerDashes = styled.div`
    position: absolute;
    top: 3.5px;
    left: 16px;
    right: 16px;
    height: 0;

    border-top: 3px dashed rgba(255, 255, 255, 0.3);
`;
