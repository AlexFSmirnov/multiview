import styled from 'styled-components';

export const PlayerControlOverlayContainer = styled.div<{ isBlockingPointerEvents: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    pointer-events: ${props => props.isBlockingPointerEvents ? 'initial' : 'none' };

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

    /* box-shadow: 0 0 100px black; */
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1) 70%, rgba(0, 0, 0, 0));

    transition: opacity 200ms;
    opacity: ${props => props.isVisible ? 1 : 0};
`;

export const PlaybackControlBarFlexSpacer = styled.div`
    height: 46px;
`;
