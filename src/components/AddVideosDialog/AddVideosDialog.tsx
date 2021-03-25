import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { omit } from 'lodash/fp';
import { useDropzone } from 'react-dropzone';
import { useTheme, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { addVideos, Video } from '../../redux/actions/videos';
import { AddFilesContainer, FileItemContainer, FilesListContainer, OrDividerContainer, OrDividerLine, OrDividerTextContainer, UrlTextFieldContainer } from './style';

interface OwnProps {
    open: boolean;
    onClose: () => void;
}

interface DispatchProps {
    addVideos: typeof addVideos;
}

export type AddVideosDialogProps = OwnProps & DispatchProps;

const AddVideosDialog: React.FC<AddVideosDialogProps> = ({ open, onClose, addVideos }) => {
    const theme = useTheme();

    const [urls, setUrls] = useState<Record<string, Video>>({ '1': { url: 'https://www.youtube.com/watch?v=ODY6JWzS8WU' } });
    // const [urls, setUrls] = useState<Record<string, Video>>({ [uuidv4()]: { url: '' } });
    const [files, setFiles] = useState<Record<string, Video>>({});
    const [fileNames, setFileNames] = useState<Record<string, string>>({});

    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({
        accept: 'video/*',
        onDropAccepted: (acceptedFiles: File[]) => {
            const parsedFiles = acceptedFiles.map(file => {
                const id = uuidv4();
                const { name } = file;
                const url = URL.createObjectURL(file);

                return { id, name, url };
            });

            const acceptedVideos = Object.fromEntries(parsedFiles.map(({ id, url }) => [id, { url }]));
            const acceptedNames = Object.fromEntries(parsedFiles.map(({ id, name }) => [id, name ]));

            setFiles({ ...files, ...acceptedVideos });
            setFileNames({ ...fileNames, ...acceptedNames });
        },
    });

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                handleConfirm();
            }
        };

        if (open) {
            window.addEventListener('keypress', handleKeyPress);
        } else {
            window.removeEventListener('keypress', handleKeyPress);
        }

        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleUrlInputChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        // Adds a new TextField if all others are non-empty.
        if (e.target.value !== '' && Object.keys(urls).every(i => i === id || urls[i].url !== '')) {
            urls[uuidv4()] = { url: '' };
        }

        setUrls({ ...urls, [id]: { url: e.target.value } });
    };

    const handleUrlInputBlur = (id: string) => () => {
        if (urls[id].url === '' && Object.keys(urls).some(i => i !== id && urls[i].url === '')) {
            setUrls(omit(id, urls));
        }
    };

    const handleFileDelete = (id: string) => () => {
        setFiles(omit(id, files));
        setFileNames(omit(id, fileNames));
    };

    const handleConfirm = () => {
        const filterEmpty = (videos: Record<string, Video>) => Object.fromEntries(Object.entries(videos).filter(([_, value]) => value.url !== ''));

        addVideos({
            ...filterEmpty(urls),
            ...filterEmpty(files),
        });

        onClose();

        setUrls({ [uuidv4()]: { url: '' } });
        setFiles({});
        setFileNames({});
    };

    const isConfirmActive = Object.keys(files).length > 0 || Object.keys(urls).some(id => urls[id].url !== '');

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
                    const urlTextFieldProps = {
                        value: urls[id].url,
                        onChange: handleUrlInputChange(id),
                        onBlur: handleUrlInputBlur(id),
                        placeholder: `Video ${index + 1}`,
                        fullWidth: true,
                    };

                    return (
                        <UrlTextFieldContainer key={id}>
                            <TextField {...urlTextFieldProps} />
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
                <FilesListContainer>
                    {Object.keys(files).map(id => (
                        <FileItemContainer key={id}>
                            <IconButton size="small" onClick={handleFileDelete(id)}>
                                <Delete fontSize="small" />
                            </IconButton>
                            <div style={{ width: '4px' }} />
                            <Typography variant="body1">{fileNames[id]}</Typography>
                        </FileItemContainer>
                    ))}
                </FilesListContainer>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button color="primary" variant="contained" onClick={handleConfirm} disabled={!isConfirmActive}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default connect(
    null,
    {
        addVideos,
    },
)(AddVideosDialog);
