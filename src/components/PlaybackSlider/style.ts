import styled from 'styled-components';

export const PlaybackSliderInteractionContainer = styled.div`
    height: 13px;
    margin-left: 8px;
    margin-right: 8px;

    position: relative;
    top: -5px;
    left: 0;
    right: 0;

    cursor: pointer;
`;

export const PlaybackSliderContainer = styled.div<{ wide: boolean }>`
    height: 3px;

    position: relative;
    top: 5px;
    left: 0;
    right: 0;

    transition: 100ms;

    ${props => props.wide ? `
        height: 4px;
        top: 4.5px;
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
