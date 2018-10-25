import React, { Component } from 'react';
import GameBoard from './GameBoard';
import GameModePicker, { GAME_MODE } from './GameModePicker'

const MARK = {
    X: 'X',
    O: 'O'
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board: Array(9).fill(null),
            currentMark: MARK.X,
            winningLine: null,
            currentMode: GAME_MODE.VERSUS,
            aiMark: null
        };
    }

    componentDidUpdate() {
        if (this.state.aiMark !== null && this.state.aiMark === this.state.currentMark) {
            const board = this.state.board.slice();
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    // TODO: calculate best AI move
                    this.handleBoxClick(i);
                    return;
                }
            }
        }
    }

    changeGameMode(gameMode) {
        if (this.state.currentMode === gameMode) return;

        this.setState({
            board: Array(9).fill(null), 
            currentMark: MARK.X, 
            winningLine: null,
            currentMode: gameMode,
            aiMark: gameMode !== GAME_MODE.VERSUS ? MARK.O : null
        });
    }

    handleBoxClick(n) {
        if (this.state.board[n] !== null) return;

        const board = this.state.board.slice();
        board[n] = this.state.currentMark;

        let winner = this.getWinner(board);

        if (winner) {
            let line = winner.line;
            this.setState({board: board, currentMark: null, winningLine: line});
        } else if (this.isBoardFull(board)) {
            this.setState({board: board, currentMark: null});
        } else {
            let nextMark = this.state.currentMark === MARK.X ? MARK.O : MARK.X;
            this.setState({board: board, currentMark: nextMark});
        }
    }

    getWinner(board) {
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

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return { mark: board[a], line: [a, b, c] };
            }
        }

        return null;
    }

    restartGame() {
        this.setState({
            board: Array(9).fill(null),
            currentMark: MARK.X,
            winningLine: null,
            aiMark: this.state.currentMode !== GAME_MODE.VERSUS ? MARK.O : null
        });
    }

    isBoardFull(board) {
        for (let i = 0; i < board.length; i++)
            if (board[i] === null)
                return false;

        return true;
    }

    isBoardEmpty(board) {
        for (let i = 0; i < board.length; i++)
            if (board[i] !== null)
                return false;

        return true;
    }

    getInfo() {
        let winner = this.getWinner(this.state.board);
        
        if (winner)
            return winner.mark + " Wins";
        if (this.isBoardFull(this.state.board))
            return "Draw";
        if (this.isBoardEmpty(this.state.board) && this.state.currentMode !== GAME_MODE.VERSUS)
            return "Start Game or Click X to Let The AI Play"

        return this.state.currentMark + " Turn";
    }

    letAIPlayFirst() {
        if (this.isBoardEmpty(this.state.board) && this.state.currentMode !== GAME_MODE.VERSUS) {
            this.setState({aiMark: MARK.X});
        }
    }

    render() {
        let info = this.getInfo();

        return (
            <div className="container" style={{"max-width": "700px"}}>
                
                <div className="row mt-3 mb-3 ml-1">
                    <GameModePicker gameMode={this.state.currentMode} 
                        changeGameMode={(mode) => this.changeGameMode(mode)} />
                </div>
                
                <div className="row justify-content-center">
                    <button className="btn btn-primary btn-sm font-weight-bold mr-1" 
                        disabled={this.state.currentMark !== MARK.X}
                        onClick={() => this.letAIPlayFirst()}>{MARK.X}</button>
                    <button className="btn btn-primary btn-sm font-weight-bold ml-1" 
                        disabled={this.state.currentMark !== MARK.O}>{MARK.O}</button>
                </div>
                
                <div className="row justify-content-center mt-2">
                    <p><small>{info}</small></p>
                </div>
                
                <div className="row justify-content-center">
                    <GameBoard handleClick={(n) => this.handleBoxClick(n)} 
                        board={this.state.board} 
                        winningLine={this.state.winningLine} />
                </div>
                
                <div className="row justify-content-center mt-3">
                    <button className="btn btn-secondary" onClick={() => this.restartGame()}>Restart Game</button>
                </div>
            </div>
        )
    }
}

export default App;
