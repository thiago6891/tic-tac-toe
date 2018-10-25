import React, { Component } from 'react';
import GameBoard from './GameBoard';
import GameModePicker, { GAME_MODE } from './GameModePicker';
import GameState, { MARK } from '../GameState';
import AI from '../AI';

class App extends Component {
    constructor(props) {
        super(props);

        this._game = new GameState();

        this.state = {
            board: this._game.board,
            currentMark: this._game.currentMark,
            winningLine: null,
            currentMode: GAME_MODE.VERSUS,
            aiMark: null
        };
    }

    componentDidUpdate() {
        let isAIMove = this.state.aiMark === this.state.currentMark &&
            !this._game.isOver();
        if (isAIMove) {
            let n = AI.getNextMove(this._game, this.state.currentMode);
            this.handleBoxClick(n);
        }
    }

    changeGameMode(gameMode) {
        if (this.state.currentMode === gameMode) return;

        this._game = new GameState();

        this.setState({
            board: this._game.board, 
            currentMark: this._game.currentMark, 
            winningLine: null,
            currentMode: gameMode,
            aiMark: gameMode !== GAME_MODE.VERSUS ? MARK.O : null
        });
    }

    handleBoxClick(n) {
        let newState = this._game.getResultingState(n);

        if (newState) {
            this._game = newState;

            this.setState({
                board: this._game.board,
                currentMark: this._game.currentMark
            });

            let winner = this._game.calculateWinner();
            if (winner) this.setState({winningLine: winner.line});
        }
    }

    restartGame() {
        this._game = new GameState();

        this.setState({
            board: this._game.board,
            currentMark: this._game.currentMark,
            winningLine: null,
            aiMark: this.state.currentMode !== GAME_MODE.VERSUS ? MARK.O : null
        });
    }

    getInfo() {
        let info = {
            text: "",
            xBtnDisabled: true,
            oBtnDisabled: true,
            xBtnClassname: "btn btn-primary btn-sm font-weight-bold mr-1",
            oBtnClassname: "btn btn-primary btn-sm font-weight-bold ml-1"
        };

        let winner = this._game.calculateWinner();
        
        if (winner) {
            info.text = winner.mark + " Wins";
            if (winner.mark === MARK.X) {
                info.xBtnClassname = info.xBtnClassname
                    .replace("btn-primary", "btn-success");
                info.oBtnClassname = info.oBtnClassname
                    .replace("btn-primary", "btn-danger");
            } else {
                info.oBtnClassname = info.oBtnClassname
                    .replace("btn-primary", "btn-success");
                info.xBtnClassname = info.xBtnClassname
                    .replace("btn-primary", "btn-danger");
            }
        } else if (this._game.isBoardFull()) {
            info.text = "Draw";
            info.oBtnClassname = info.oBtnClassname
                .replace("btn-primary", "btn-secondary");
            info.xBtnClassname = info.xBtnClassname
                .replace("btn-primary", "btn-secondary");
        } else if (this._game.isBoardEmpty() && this.state.currentMode !== GAME_MODE.VERSUS) {
            info.text = "Start Game or Click X to Let The AI Play";
            info.xBtnDisabled = false;
        } else {
            info.text = this.state.currentMark + " Turn";
            if (this.state.currentMark === MARK.X) {
                info.xBtnDisabled = false;
            } else {
                info.oBtnDisabled = false;
            }
        }

        return info;
    }

    letAIPlayFirst() {
        if (this._game.isBoardEmpty() && this.state.currentMode !== GAME_MODE.VERSUS) {
            this.setState({aiMark: MARK.X});
        }
    }

    render() {
        let info = this.getInfo();

        return (
            <div className="container" style={{maxWidth: "700px"}}>
                
                <div className="row mt-3 mb-3 ml-1">
                    <GameModePicker gameMode={this.state.currentMode} 
                        changeGameMode={(mode) => this.changeGameMode(mode)} />
                </div>
                
                <div className="row justify-content-center">
                    <button className={info.xBtnClassname} disabled={info.xBtnDisabled}
                        onClick={() => this.letAIPlayFirst()}>
                            {MARK.X}
                    </button>
                    <button className={info.oBtnClassname} disabled={info.oBtnDisabled}>
                        {MARK.O}
                    </button>
                </div>
                
                <div className="row justify-content-center mt-2">
                    <p><small>{info.text}</small></p>
                </div>
                
                <div className="row justify-content-center">
                    <GameBoard handleClick={(n) => this.handleBoxClick(n)} 
                        board={this.state.board} 
                        winningLine={this.state.winningLine} />
                </div>
                
                <div className="row justify-content-center mt-3">
                    <button className="btn btn-secondary" 
                        onClick={() => this.restartGame()}>
                            Restart Game
                    </button>
                </div>
            </div>
        )
    }
}

export default App;
