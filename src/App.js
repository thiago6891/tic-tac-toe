import React, { Component } from 'react';
import GameBoard from './GameBoard';

const DROPDOWN_TEXT_VERSUS = "Play Against a Friend";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "dropdownText": DROPDOWN_TEXT_VERSUS
        };
    }

    handleClick(text) {
        this.setState({"dropdownText": text});
    }

    render() {
        return (
            <div className="container" style={{"max-width": "700px"}}>
                <div className="row mt-3 mb-3 ml-1">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.state.dropdownText}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button className="dropdown-item" onClick={() => this.handleClick(DROPDOWN_TEXT_VERSUS)}>
                                {DROPDOWN_TEXT_VERSUS}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <button className="btn btn-primary btn-sm font-weight-bold mr-1" disbaled="false">X</button>
                    <button className="btn btn-primary btn-sm font-weight-bold ml-1" disabled="true">O</button>
                </div>
                <div className="row justify-content-center mt-2">
                    <p><small>Info Here</small></p>
                </div>
                <div className="row justify-content-center">
                    <GameBoard />
                </div>
                <div className="row justify-content-center mt-3">
                    <button className="btn btn-secondary">Restart Game</button>
                </div>
            </div>
        )
    }
}

export default App;
