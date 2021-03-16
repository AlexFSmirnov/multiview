export interface GetOptimalGridPlayerSizeProps {
    containerWidth: number;
    containerHeight: number;
    numberOfPlayers: number;
}

export const getOptimalGridPlayerSize = ({ containerWidth, containerHeight, numberOfPlayers }: GetOptimalGridPlayerSizeProps) => {
    let left = 0;
    let right = containerWidth;

    let iters = 0;
    while (Math.abs(left - right) >= 1e-5 && iters <= 1000) {
        let middle = Math.ceil((right + left) / 2);

        const playerWidth = middle;
        const playerHeight = Math.ceil(playerWidth / 16 * 9);

        if (canFitPlayersOfSize({ containerWidth, containerHeight, playerWidth, playerHeight, numberOfPlayers })) {
            left = middle;
        } else {
            right = middle - 1;
        }

        iters += 1;
    }

    const playerWidth = left;
    const playerHeight = Math.ceil(playerWidth / 16 * 9);

    return { playerWidth, playerHeight };
};

interface CanFitPlayersOfSizeProps {
    containerWidth: number;
    containerHeight: number;
    playerWidth: number;
    playerHeight: number;
    numberOfPlayers: number;
}

const canFitPlayersOfSize = ({ containerWidth, containerHeight, playerWidth, playerHeight, numberOfPlayers }: CanFitPlayersOfSizeProps) => {
    const playersInRow = Math.floor(containerWidth / playerWidth);
    const playersInColumn = Math.ceil(numberOfPlayers / playersInRow);

    return (playersInColumn * playerHeight) <= containerHeight;
};
