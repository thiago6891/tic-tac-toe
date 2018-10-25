import GameState from './GameState';

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

function maxValue(state) {
    if (terminalTest(state)) return utility(state);
    
    let v = Number.NEGATIVE_INFINITY;
    state.getActions().forEach(action => {
        let resultingState = state.getResultingState(action);
        if (resultingState) {
            v = Math.max(v, minValue(resultingState));
        }
    });
    
    return v;
}

function minValue(state) {
    if (terminalTest(state)) return utility(state);

    let v = Number.POSITIVE_INFINITY;
    state.getActions().forEach(action => {
        let resultingState = state.getResultingState(action);
        if (resultingState) {
            v = Math.min(v, maxValue(resultingState));
        }
    });

    return v;
}

class AI {
    static getNextMove(game) {
        markToMax = game.currentMark;
        var state = new GameState(game.board, game.currentMark);

        let actionResults = [];
        state.getActions().forEach(action => {
            let newState = state.getResultingState(action);
            if (newState) {
                actionResults.push({
                    action: action,
                    value: minValue(newState)
                });
            }
        });

        if (actionResults.length === 0) return;
        
        actionResults.sort((a, b) => {
            return b.value - a.value;
        })

        return actionResults[0].action;
    }
}

export default AI;