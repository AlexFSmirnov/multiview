import styled from 'styled-components';

export const PlaybackSliderInteractionContainer = styled.div`
    height: 19px;
    margin-left: 8px;
    margin-right: 8px;

    position: relative;
    top: -8px;
    left: 0;
    right: 0;

    z-index: 1000;
    cursor: pointer;
`;

export const PlaybackSliderContainer = styled.div<{ wide: boolean }>`
    height: 3px;

    position: relative;
    top: 8px;
    left: 0;
    right: 0;

    transition: 100ms;

    ${props => props.wide ? `
        height: 4px;
        top: 7.5px;
    ` : null}
`;

export const PlaybackSliderBar = styled.div.attrs<{ progress: number; color: string }>(props => ({
    style: { right: `calc(100% - 100% * ${props.progress})` },
}))<{ progress: number; color: string }>`
    width: auto;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    background-color: ${props => props.color};
`;

export const PlaybackSliderScrubber = styled.div.attrs<{ progress: number; color: string; visible: boolean }>(props => ({
    style: { right: `calc(100% - 100% * ${props.progress} - 6px)` },
}))<{ progress: number; color: string; visible: boolean }>`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => props.color};

    position: absolute;
    top: -4px;

    transform: scale(${props => props.visible ? 1 : 0});
    transition: transform 100ms;
`;

export const PlaybackSliderTimePreviewContainer = styled.div`
    width: 100vw;
    height: 32px;

    position: relative;
    top: -32px;
    left: -8px;

    overflow: hidden;
`;

export const PlaybackSliderTimePreviewWrapper = styled.div.attrs<{ progress: number; visible: boolean }>(props => ({
    style: { left: `max(0px, min(calc(100% - 64px), calc(100% * ${props.progress} - 32px)))` },
}))<{ progress: number; visible: boolean }>`
    width: 64px;
    height: 32px;

    position: absolute;
    top: -32px;

    display: flex;
    justify-content: center;
    align-items: center;

    opacity: ${props => props.visible ? 1 : 0};
    transition: opacity 100ms;

    pointer-events: none;
`;
