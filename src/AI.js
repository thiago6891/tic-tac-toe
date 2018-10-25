class AI {
    static getNextMove(board) {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                return i;
            }
        }
    }
}

export default AI;