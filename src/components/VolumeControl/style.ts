import styled from 'styled-components';

export const VolumeControlContainer = styled.div<{ isSliderVisible: boolean }>`
    width: ${props => props.isSliderVisible ? 108 : 30}px;
    height: 30px;
    overflow: hidden;

    display: flex;
    flex-direction: row;
    align-items: center;

    transition: width 100ms;
`;

export const VolumeControlIconContainer = styled.div`
    margin-right: 6px;
`;

export const VolumeControlSliderContainer = styled.div`
    width: 62px;
    padding-right: 8px;
    height: 28px;
`;
