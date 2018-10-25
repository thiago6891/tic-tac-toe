const MARK = {
    X: 'X',
    O: 'O'
}

class GameState {
    constructor(board, mark) {
        if (board === null || board === undefined) {
            this._board = Array(9).fill(null);
        } else {
            this._board = board.slice();
        }
        
        if (mark === undefined) {
            this._currentMark = MARK.X;
        } else {
            this._currentMark = mark;
        }
    }

    get board() { return this._board.slice() }
    get currentMark() { return this._currentMark }

    getResultingState(action) {
        if (this._board[action] !== null) return;

        let board = this._board.slice();
        board[action] = this._currentMark;

        if (this.calculateWinner(board))
            return new GameState(board, null);
        
        let mark = this._currentMark === MARK.X ? MARK.O : MARK.X;
        return new GameState(board, mark);
    }

    calculateWinner(board) {
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

        if (board === null || board === undefined) board = this._board.slice();

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

    isOver() {
        if (this.calculateWinner()) return true;
        if (this.isBoardFull()) return true;
        return false;
    }

    getActions() {
        let actions = [];
        for (let i = 0; i < this._board.length; i++) {
            if (this._board[i] === null) {
                actions.push(i);
            }
        }
        return actions;
    }
}

export { MARK };
export default GameState;