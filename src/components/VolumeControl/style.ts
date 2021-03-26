import styled from 'styled-components';

export const VolumeControlContainer = styled.div<{ isSliderVisible: boolean }>`
    width: ${props => props.isSliderVisible ? 114 : 30}px;
    height: 30px;
    overflow: hidden;

    display: flex;
    flex-direction: row;
    align-items: center;

    transition: width 100ms;
`;

export const VolumeControlIconContainer = styled.div`
    margin-right: 12px;
    z-index: 1;
`;

export const VolumeControlSliderContainer = styled.div`
    width: 62px;
    height: 28px;
    z-index: 0;
`;
