import React, { Component } from 'react';

const DROPDOWN_TEXT_VERSUS = "Play Against a Friend";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "dropdownText": "Dropdown Button"
        };
    }

    handleClick(text) {
        this.setState({"dropdownText": text});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
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
                    <button className="btn btn-primary btn-lg font-weight-bold" disbaled="false">X</button>
                    <button className="btn btn-primary btn-lg font-weight-bold" disabled="true">O</button>
                </div>
                <div className="row justify-content-center">
                    <p>INFO HERE</p>
                </div>
                <div className="row justify-content-center">
                    <p>GAME HERE</p>
                </div>
                <div className="row justify-content-center">
                    <button className="btn btn-secondary">Restart Game</button>
                </div>
            </div>
        )
    }
}

export default App;
