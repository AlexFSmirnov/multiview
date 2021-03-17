import styled from 'styled-components';

export const MasterPlaybackControlBarContainer = styled.div`
    width: 100%;
    height: 46px;
`;

export const MasterPlaybackControlBarOuterWrapper = styled.div`
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;

    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const MasterPlaybackControlBarInnerWrapper = styled.div`
    height: 30px;

    display: flex;
    flex-direction: row;
    flex: 1;
`;

export const MasterPlaybackControlBarProgressTextWrapper = styled.div`
    height: 100%;
    padding-left: 12px;

    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const MasterPlaybackControlBarButtonsSpacer = styled.div`
    flex: 1;
`;
