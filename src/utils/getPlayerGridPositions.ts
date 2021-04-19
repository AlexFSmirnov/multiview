import { getOptimalGridPlayerSize } from './getOptimalGridPlayerSize'

export interface GetPlayerGridPositionsProps {
    containerWidth: number;
    containerHeight: number;
    numberOfPlayers: number;
}

export const getPlayerGridPositions = ({ containerWidth, containerHeight, numberOfPlayers }: GetPlayerGridPositionsProps) => {
    const { playerWidth, playerHeight } = getOptimalGridPlayerSize({ containerWidth, containerHeight, numberOfPlayers });

    const cols = Math.floor(containerWidth / playerWidth);
    const rows = Math.floor(containerHeight / playerHeight);

    return Array.from({ length: numberOfPlayers }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;

        const playersInCol = (row === rows - 1) ? (cols - (cols * rows - numberOfPlayers)) : cols;

        const topOffset = (containerHeight - rows * playerHeight) / 2;
        const leftOffset = (containerWidth - playersInCol * playerWidth) / 2;

        const top = row * playerHeight + topOffset;
        const left = col * playerWidth + leftOffset;

        return {
            top,
            left,
            width: playerWidth,
            height: playerHeight,
        };
    });
};