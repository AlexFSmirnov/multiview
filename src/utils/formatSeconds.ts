export const formatSeconds = (totalSeconds: number) => {
    const roundedSeconds = Math.round(totalSeconds);

    const hours = Math.floor(roundedSeconds / (60 * 60));
    const minutes = Math.floor((roundedSeconds % (60 * 60)) / 60);
    const seconds = roundedSeconds % 60;

    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours > 0 ? `${hours}:` : ''}${minutes}:${paddedSeconds}`
};
