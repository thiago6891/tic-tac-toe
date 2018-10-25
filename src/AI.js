import GameState from './GameState';
import { GAME_MODE } from './Components/GameModePicker';

var markToMax;

function utility(state) {
    let winner = state.calculateWinner();
    if (winner) {
        if (winner.mark === markToMax) return 1;
        return -1;
    }
    return 0;
}

function terminalTest(state) {
    return state.isOver();
}

function maxValue(state, alpha, beta) {
    if (terminalTest(state)) return utility(state);
    
    let v = Number.NEGATIVE_INFINITY;
    state.getActions().forEach(action => {
        let resultingState = state.getResultingState(action);
        if (resultingState) {
            v = Math.max(v, minValue(resultingState, alpha, beta));
            if (v >= beta) return v;
            alpha = Math.max(alpha, v);
        }
    });
    
    return v;
}

function minValue(state, alpha, beta) {
    if (terminalTest(state)) return utility(state);

    let v = Number.POSITIVE_INFINITY;
    state.getActions().forEach(action => {
        let resultingState = state.getResultingState(action);
        if (resultingState) {
            v = Math.min(v, maxValue(resultingState, alpha, beta));
            if (v <= alpha) return v;
            beta = Math.min(beta, v);
        }
    });

    return v;
}

class AI {
    async getNextMove(game, mode) {
        markToMax = game.currentMark;
        
        let state = new GameState(game.board, game.currentMark);

        let actionResults = [];
        state.getActions().forEach(action => {
            let newState = state.getResultingState(action);
            if (newState) {
                actionResults.push({
                    action: action,
                    value: minValue(
                        newState, 
                        Number.NEGATIVE_INFINITY, 
                        Number.POSITIVE_INFINITY)
                });
            }
        });

        if (actionResults.length === 0) return;
        
        actionResults.sort((a, b) => {
            return b.value - a.value;
        })

        let difficultyFactor;
        if (mode === GAME_MODE.HARD) difficultyFactor = 1;
        else if (mode === GAME_MODE.MEDIUM) difficultyFactor = 0.75;
        else difficultyFactor = 0.5;

        while (actionResults.length > 1) {
            if (Math.random() < difficultyFactor) {
                return actionResults[0].action;
            }
            actionResults.shift();
        }
        return actionResults[0].action;
    }
}

export default AI;