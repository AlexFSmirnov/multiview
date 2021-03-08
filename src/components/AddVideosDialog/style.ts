import styled from 'styled-components';

export const UrlTextFieldContainer = styled.div`
    padding-top: 8px;
`;

export const OrDividerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    padding-top: 24px;
    padding-bottom: 24px;
`;

export const OrDividerLine = styled.div<{ color: string }>`
    flex: 1;
    height: 1px;
    box-shadow: inset 0 0 0 1px ${props => props.color};
`;

export const OrDividerTextContainer = styled.div`
    padding-left: 8px;
    padding-right: 8px;
    color: rgba(255, 255, 255, 0.4);
`;

interface AddFilesContainerProps {
    activeColor: string;
    isDragActive?: boolean;
}

export const AddFilesContainer = styled.div<AddFilesContainerProps>`
    width: 100%;
    height: 72px;

    display: flex;
    justify-content: center;
    align-items: center;

    outline: none;
    border-radius: 8px;
    border: 1px dashed rgba(255, 255, 255, 0.7);
    color: white;

    ${props => props.isDragActive && `
        border-color: ${props.activeColor};
        color: ${props.activeColor};
    `}
`;
