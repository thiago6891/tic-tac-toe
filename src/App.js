import React, { Component } from 'react';
import GameBoard from './GameBoard';

const GAME_MODE = {
    EASY: "Easy",
    MEDIUM: "Medium",
    HARD: "Impossible",
    VERSUS: "Play Against a Friend"
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board: Array(9).fill(null),
            currentMark: 'X',
            winningLine: null,
            currentMode: GAME_MODE.VERSUS
        };
    }

    handleDropdownClick(gameMode) {
        if (this.state.currentMode === gameMode) return;

        switch (gameMode) {
            case GAME_MODE.VERSUS:
                this.setState({
                    board: Array(9).fill(null), 
                    currentMark: 'X', 
                    winningLine: null,
                    currentMode: gameMode
                });
                break;
            default:
                break;
        }
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
            let nextMark = this.state.currentMark === 'X' ? 'O' : 'X';
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
        this.setState({board: Array(9).fill(null), currentMark: 'X', winningLine: null});
    }

    isBoardFull(board) {
        for (let i = 0; i < board.length; i++)
            if (board[i] === null)
                return false;

        return true;
    }

    renderDropdownItem(gameMode) {
        let className = "dropdown-item";
        if (this.state.currentMode === gameMode) className += " active";
        
        return (
            <button className={className} onClick={() => this.handleDropdownClick(gameMode)}>
                {gameMode}
            </button>
        )
    }

    render() {
        let info = this.state.currentMark + " Turn";
        let winner = this.getWinner(this.state.board);
        if (winner) {
            info = winner.mark + " Wins";
        } else if (this.isBoardFull(this.state.board)) {
            info = "Draw";
        }

        return (
            <div className="container" style={{"max-width": "700px"}}>
                
                <div className="row mt-3 mb-3 ml-1">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.state.currentMode}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {this.renderDropdownItem(GAME_MODE.HARD)}
                            {this.renderDropdownItem(GAME_MODE.VERSUS)}
                        </div>
                    </div>
                </div>
                
                <div className="row justify-content-center">
                    <button className="btn btn-primary btn-sm font-weight-bold mr-1" 
                        disabled={this.state.currentMark !== 'X'}>X</button>
                    <button className="btn btn-primary btn-sm font-weight-bold ml-1" 
                        disabled={this.state.currentMark !== 'O'}>O</button>
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
