import React, { Component } from 'react'

const GAME_MODE = {
    EASY: "Easy",
    MEDIUM: "Medium",
    HARD: "Impossible",
    VERSUS: "Play Against a Friend"
};

class GameModePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeMode: props.gameMode
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.gameMode !== prevProps.gameMode) {
            this.setState({activeMode: this.props.gameMode});
        }
    }

    handleSelectionChange(gameMode) {
        if (this.state.activeMode === gameMode) return;
        
        this.props.changeGameMode(gameMode);
    }

    renderDropdownItem(gameMode) {
        let className = "dropdown-item";
        if (this.state.activeMode === gameMode) className += " active";
        
        return (
            <button className={className} 
                onClick={() => this.handleSelectionChange(gameMode)}>
                    {gameMode}
            </button>
        )
    }
    
    render() {
        return (
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" 
                    type="button" id="dropdownMenuButton" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                        {this.state.activeMode}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {this.renderDropdownItem(GAME_MODE.EASY)}
                    {this.renderDropdownItem(GAME_MODE.MEDIUM)}
                    {this.renderDropdownItem(GAME_MODE.HARD)}
                    {this.renderDropdownItem(GAME_MODE.VERSUS)}
                </div>
            </div>
        );
    }
}

export { GAME_MODE };
export default GameModePicker;