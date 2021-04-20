import { getOptimalGridPlayerSize } from './getOptimalGridPlayerSize';
import { getPlayerGridPositions } from './getPlayerGridPositions';

interface GetPlayerLinePositionsProps {
    lineWidth: number;
    minPlayerHeight: number;
    containerHeight: number;
    numberOfPlayers: number;
}

export const getPlayerLinePositions = ({ lineWidth, minPlayerHeight, containerHeight, numberOfPlayers }: GetPlayerLinePositionsProps) => {
    const minPlayerWidth = minPlayerHeight / 9 * 16;

    const playerWidth = lineWidth / numberOfPlayers;
    const playerHeight = playerWidth / 16 * 9;

    if (playerHeight < minPlayerHeight) {
        const cols = Math.floor(lineWidth / minPlayerWidth);
        const rows = Math.ceil(numberOfPlayers / cols);

        if (rows * minPlayerHeight < containerHeight) {
            const positions = getPlayerGridPositions({
                playerWidth: minPlayerWidth,
                playerHeight: minPlayerHeight,
                containerWidth: lineWidth,
                containerHeight: rows * minPlayerHeight,
                numberOfPlayers,
                alignToRight: true,
            });

            return {
                positions,
                rows,
                cols
            };
        }

        const { playerWidth, playerHeight } = getOptimalGridPlayerSize({
            containerWidth: lineWidth,
            containerHeight,
            numberOfPlayers,
        });

        const newCols = Math.floor(lineWidth / playerWidth);
        const newRows = Math.ceil(numberOfPlayers / newCols);

        const positions = getPlayerGridPositions({
            playerWidth,
            playerHeight,
            containerWidth: lineWidth,
            containerHeight: Math.min(containerHeight, newRows * playerHeight),
            numberOfPlayers,
            alignToRight: true,
        });

        return {
            positions,
            rows: newRows,
            cols: newCols,
        };
    }

    const positions = Array.from({ length: numberOfPlayers }).map((_, i) => ({
        top: 0,
        left: i * playerWidth,
        width: playerWidth,
        height: playerHeight,
    }));

    return {
        positions,
        rows: 1,
        cols: numberOfPlayers,
    };
};
