import React, { Component } from 'react';
import './Styles/GameBoard.css'

class GameBoard extends Component {
    render() {
        return(
            <div>
                <div className="row">
                    <div className="col-4 bg-light border box">
                        
                    </div>
                    <div className="col-4 bg-light border box">
                        
                    </div>
                    <div className="col-4 bg-light border box">
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 bg-light border box">
                        
                    </div>
                    <div className="col-4 bg-light border box">
                        
                    </div>
                    <div className="col-4 bg-light border box">
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 bg-light border box">
                        
                    </div>
                    <div className="col-4 bg-light border box">
                        
                    </div>
                    <div className="col-4 bg-light border box">
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default GameBoard;