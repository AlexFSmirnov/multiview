export const formatSeconds = (totalSeconds: number) => {
    const roundedSeconds = Math.round(totalSeconds);

    const hours = Math.floor(roundedSeconds / (60 * 60));
    const minutes = Math.floor((roundedSeconds % (60 * 60)) / 60);
    const seconds = roundedSeconds % 60;

    const paddedHours = hours > 0 ? `${hours}:` : '';
    const paddedMinutes = (hours > 0 && minutes < 10) ? `0${minutes}` : `${minutes}:`;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${paddedHours}${paddedMinutes}${paddedSeconds}`;
};
