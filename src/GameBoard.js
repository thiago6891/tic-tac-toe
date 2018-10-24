import React, { Component } from 'react';
import './Styles/GameBoard.css'

class GameBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board: props.board,
            winningLine: props.winningLine
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.board !== null && this.props.board !== prevProps.board) {
            this.setState({board: this.props.board});
        }

        if (this.props.winningLine !== prevProps.winningLine) {
            this.setState({winningLine: this.props.winningLine});
        }
    }

    renderBox(n) {
        let className = "col-4 border box font-weight-bold text-center";
        if (this.state.winningLine && this.state.winningLine.includes(n)) {
            className += " bg-success";
        } else {
            className += " bg-light";
        }

        return (
            <div className={className}
                onClick={() => this.props.handleClick(n)}>
                    {this.state.board[n]}
            </div>
        );
    }

    render() {
        return(
            <div>
                <div className="row">
                    {this.renderBox(0)}
                    {this.renderBox(1)}
                    {this.renderBox(2)}
                </div>
                <div className="row">
                    {this.renderBox(3)}
                    {this.renderBox(4)}
                    {this.renderBox(5)}
                </div>
                <div className="row">
                    {this.renderBox(6)}
                    {this.renderBox(7)}
                    {this.renderBox(8)}
                </div>
            </div>
        );
    }
}

export default GameBoard;