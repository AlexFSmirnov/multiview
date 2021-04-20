export interface GetPlayerGridPositionsProps {
    playerWidth: number;
    playerHeight: number;
    containerWidth: number;
    containerHeight: number;
    numberOfPlayers: number;
    alignToRight?: boolean;
}

export const getPlayerGridPositions = ({ playerWidth, playerHeight, containerWidth, containerHeight, numberOfPlayers, alignToRight }: GetPlayerGridPositionsProps) => {
    const cols = Math.floor(containerWidth / playerWidth);
    const rows = Math.ceil(numberOfPlayers / cols);

    return Array.from({ length: numberOfPlayers }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;

        const playersInCol = (row === rows - 1) ? (cols - (cols * rows - numberOfPlayers)) : cols;

        const topOffset = (containerHeight - rows * playerHeight) / 2;
        let leftOffset = (containerWidth - playersInCol * playerWidth) / 2;

        if (alignToRight) {
            leftOffset *= 2;
        }

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