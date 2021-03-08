import { useDropzone } from 'react-dropzone';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography, useTheme } from '@material-ui/core';
import { AddFilesContainer, OrDividerContainer, OrDividerLine, OrDividerTextContainer } from './style';

interface AddVideosDialogProps {
    open: boolean;
    onClose: () => void;
}

const AddVideosDialog: React.FC<AddVideosDialogProps> = ({ open, onClose }) => {
    const theme = useTheme();

    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone();

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
                <DialogContentText>
                    Paste links to the videos here
                </DialogContentText>
                <TextField fullWidth />

                <OrDividerContainer>
                    <OrDividerLine color={theme.palette.divider} />
                    <OrDividerTextContainer>
                        <Typography variant="h6">OR</Typography>
                    </OrDividerTextContainer>
                    <OrDividerLine color={theme.palette.divider} />
                </OrDividerContainer>

                <AddFilesContainer {...addFilesContainerProps}>
                    <input {...getInputProps()} />
                    <Typography variant="body2">Add files</Typography>
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
