import {
  getAllMoves,
  removePossibles,
  solve,
  getSolveData,
} from '../../utilities/board';

import {
  SET_BOARD,
  SET_REMOVABLES,
  REMOVE_POSSIBLES,
  SOLVE_CURRENT,
} from './actions';

const defaultState = {
  current: null,
  removablesName: '',
  removables: null,
  moves: {},
};

export default function boardReducer(state = defaultState, action) {
  switch(action.type) {
    case SET_BOARD: {
      const moves = getAllMoves(action.board);
      return {
        ...state,
        current: action.board,
        moves,
      };
    }
    case SET_REMOVABLES: {
      const removables = state.moves[action.name] || null;
      return {
        ...state,
        removablesName: action.name,
        removables,
      };
    }
    case REMOVE_POSSIBLES: {
      const current = removePossibles(state.current, action.values);
      const moves = getAllMoves(current);
      return {
        ...state,
        current,
        removablesName: '',
        removables: null,
        moves,
      };
    }
    case SOLVE_CURRENT: {
      const current = solve(state.current);
      const steps = getSolveData(state.current);
      console.log(`STEPS (${steps.length}) ${steps.map(s => `\n${s.remaining} ${s.removed} ${s.type} ${s.step}`)}`);
      if (steps[steps.length - 1]?.remaining === 0) {
        console.log('  SOLVED');
      }
      const moves = getAllMoves(current);
      return {
        ...state,
        current,
        moves,
      };
    }
    default:
      return state;
  }
}
