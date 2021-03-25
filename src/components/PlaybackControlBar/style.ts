import styled from 'styled-components';

export const PlaybackControlBarContainer = styled.div`
    width: 100%;
    height: 46px;
`;

export const PlaybackControlBarOuterWrapper = styled.div`
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;

    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const PlaybackControlBarInnerWrapper = styled.div`
    height: 30px;

    display: flex;
    flex-direction: row;
    flex: 1;
`;

export const PlaybackControlBarProgressTextWrapper = styled.div`
    height: 100%;
    padding-left: 12px;

    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const PlaybackControlBarButtonsSpacer = styled.div`
    flex: 1;
`;
