const MARK = {
    X: 'X',
    O: 'O'
}

class Game {
    constructor() {
        this._board = Array(9).fill(null);
        this._currentMark = MARK.X;
    }

    get board() { return this._board.slice() }
    get currentMark() { return this._currentMark }

    makeMove(n) {
        if (this._board[n] !== null) return false;

        this._board[n] = this._currentMark;
        
        if (this.calculateWinner()) {
            this._currentMark = null;
        } else {
            this._currentMark = this._currentMark === MARK.X ? MARK.O : MARK.X;
        }
        
        return true;
    }

    calculateWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        let board = this._board.slice();

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return { mark: board[a], line: [a, b, c] };
            }
        }

        return null;
    }

    isBoardFull() {
        let board = this._board.slice();

        for (let i = 0; i < board.length; i++)
            if (board[i] === null)
                return false;

        return true;
    }

    isBoardEmpty() {
        let board = this._board.slice();

        for (let i = 0; i < board.length; i++)
            if (board[i] !== null)
                return false;

        return true;
    }
}

export { MARK };
export default Game;