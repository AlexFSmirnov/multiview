import styled from 'styled-components';

export const SettingsMenuContainer = styled.div`
    width: 220px;
    height: 500px;
    padding-bottom: 16px;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    overflow: hidden;
    pointer-events: none;
`;

export const SettingsMenuPaper = styled.div<{ height: number }>`
    width: 100%;
    height: ${props => props.height}px;

    border-radius: 4px;
    background-color: rgba(28, 28, 28, 0.9);
    overflow: hidden;
    pointer-events: all;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    transition: height 100ms;
`;

export const SettingsMenuListItemContainer = styled.div`
    width: 100%;
    height: 24px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const SettingsMenuListItemValueContainer = styled.div`
    margin-right: -8px;

    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const SettingsMenuListItemTitle = styled.span`
    font-size: 0.875rem;
    line-height: 24px;
`;

export const SettingsMenuListItemValue = styled.span`
    margin-top: 2px;
    font-size: 0.75rem;
    line-height: 24px;
`;

export const SettingsMenuListItemSpacer = styled.div`
    width: 64px;
`;

export const SettingsMenuSectionHeader = styled.div`
    height: 32px;

    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const SettingsMenuDescriptionListItemContainer = styled.div`
    width: calc(100% + 20px);
    margin-left: -12px;
    margin-right: -8px;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;

export const SettingsMenuDescriptionListItemCheckmarContainer = styled.div`
    width: 36px;
    padding: 4px;
    padding-right: 8px;
`;

export const SettingsMenuDescriptionListItemTextContainer = styled.div`
    flex: 1;
    padding-top: 4px;
    padding-bottom: 4px;

    display: flex;
    flex-direction: column;
`;

export const SettingsMenuDescriptionListItemTitleContainer = styled.div`
    font-size: 0.875rem;
    margin-bottom: 2px;
`;

export const SettingsMenuDescriptionListItemSubitleContainer = styled.div`
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.7);
`;
