import styled from 'styled-components';

export const PlaybackSliderContainer = styled.div`
    height: 3px;
    margin-left: 8px;
    margin-right: 8px;

    position: relative;
    top: 0;
    left: 0;
    right: 0;

    background-color: rgba(255, 255, 255, 0.2);
`;

const playbackSliderBaseCss = `
    width: auto;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;

export const PlaybackSliderPlayed = styled.div.attrs<{ playedFraction: number }>(props => ({
    style: { right: `calc(100% - 100% * ${props.playedFraction})` },
}))<{ playedFraction: number }>`
    ${playbackSliderBaseCss}

    background-color: red;
`;

export const PlaybackSliderLoaded = styled.div.attrs<{ loadedFraction: number }>(props => ({
    style: { right: `calc(100% - 100% * ${props.loadedFraction})` },
}))<{ loadedFraction: number }>`
    ${playbackSliderBaseCss}

    background-color: rgba(255, 255, 255, 0.6);
`;
