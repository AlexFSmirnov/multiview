import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { omit } from 'lodash/fp';
import { useDropzone } from 'react-dropzone';
import { useTheme, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { AddFilesContainer, OrDividerContainer, OrDividerLine, OrDividerTextContainer, UrlTextFieldContainer } from './style';

interface AddVideosDialogProps {
    open: boolean;
    onClose: () => void;
}

const AddVideosDialog: React.FC<AddVideosDialogProps> = ({ open, onClose }) => {
    const theme = useTheme();

    const [urls, setUrls] = useState<Record<string, string>>({ [uuidv4()]: '' });

    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone();

    const handleUrlInputChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== '' && Object.keys(urls).every(i => i === id || urls[i] !== '')) {
            urls[uuidv4()] = '';
        }

        setUrls({ ...urls, [id]: e.target.value });
    };

    const handleUrlInputBlur = (id: string) => () => {
        if (urls[id] === '' && Object.keys(urls).some(i => i !== id && urls[i] === '')) {
            setUrls(omit(id, urls));
        }
    };

    const handleConfirm = () => {

    };

    const addFilesContainerProps = {
        ...getRootProps({ isDragActive }),
        activeColor: theme.palette.primary.main,
    };

    return (
        <Dialog fullWidth open={open} onClose={onClose}>
            <DialogTitle>Add new videos</DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    Paste links to the videos here
                </Typography>
                {Object.keys(urls).map((id, index) => {
                    const props = {
                        value: urls[id],
                        onChange: handleUrlInputChange(id),
                        onBlur: handleUrlInputBlur(id),
                        placeholder: `Video ${index + 1}`,
                        fullWidth: true,
                    };

                    return (
                        <UrlTextFieldContainer key={id}>
                            <TextField {...props} />
                        </UrlTextFieldContainer>
                    );
                })}

                <OrDividerContainer>
                    <OrDividerLine color={theme.palette.divider} />
                    <OrDividerTextContainer>
                        <Typography variant="h6">OR</Typography>
                    </OrDividerTextContainer>
                    <OrDividerLine color={theme.palette.divider} />
                </OrDividerContainer>

                <AddFilesContainer {...addFilesContainerProps}>
                    <input {...getInputProps()} />
                    <Typography variant="body1">Add files</Typography>
                </AddFilesContainer>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button color="primary" variant="contained" onClick={handleConfirm}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddVideosDialog;
