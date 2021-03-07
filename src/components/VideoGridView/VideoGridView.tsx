import { VideoPlayer } from '../VideoPlayer';
import { VideoGridViewContainer } from './style';

interface VideoGridViewProps {

}

const VideoGridView: React.FC<VideoGridViewProps> = ({}) => {

    return (
        <VideoGridViewContainer>
            <VideoPlayer />
        </VideoGridViewContainer>
    );
};

export default VideoGridView;
