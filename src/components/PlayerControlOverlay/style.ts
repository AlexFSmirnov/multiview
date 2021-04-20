import styled from 'styled-components';

interface PlayerControlOverlayContainerProps {
    isBlockingPointerEvents: boolean;
    isCursorHidden: boolean;
    zIndex?: number;
}

export const PlayerControlOverlayContainer = styled.div<PlayerControlOverlayContainerProps>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    pointer-events: ${props => props.isBlockingPointerEvents ? 'initial' : 'none' };
    ${props => props.isCursorHidden ? 'cursor: none;' :''}

    ${props => props.zIndex ? `z-index: ${props.zIndex};` : ''}

    overflow: hidden;
`;

interface WithVisibility {
    isVisible: boolean;
}

export const PlaybackControlBarWrapper = styled.div<WithVisibility>`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: all;

    transition: opacity 200ms;
    opacity: ${props => props.isVisible ? 1 : 0};
`;

export const PlaybackControlOverlayBottomShadow = styled.div<WithVisibility>`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;

    height: 30%;

    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1) 70%, rgba(0, 0, 0, 0));

    transition: opacity 200ms;
    opacity: ${props => props.isVisible ? 1 : 0};
`;

export const PlayerControlOverlayClickCapture = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const PlaybackControlBarFlexSpacer = styled.div`
    height: 46px;
`;

export const MinimizedButtonContainer = styled.div`
    position: absolute;

    top: calc(50% - 20px);
    right: 8px;

    width: 40px;
    height: 40px;

    z-index: 10;
`;
