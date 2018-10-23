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
                <div className="row">
                    <button>X</button>
                    <button>O</button>
                </div>
                <div className="row">
                    <p>INFO HERE</p>
                </div>
                <div className="row">
                    <p>GAME HERE</p>
                </div>
                <div className="row">
                    <button>Restart Game</button>
                </div>
            </div>
        )
    }
}

export default App;
