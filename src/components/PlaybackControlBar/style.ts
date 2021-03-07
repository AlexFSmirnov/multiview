import styled from 'styled-components';

export const PlaybackControlBarContainer = styled.div`
    width: 100%;
    height: 42px;

    background-color: #222;
`;

export const PlaybackControlBarButtonsContainer = styled.div`
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;

    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const PlaybackControllBarButtonsSpacer = styled.div`
    flex: 1;
`;
