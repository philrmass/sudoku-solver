import {
  getAllMoves,
  removePossibles,
  solve,
} from '../../utilities/board';

import {
  SET_BOARD,
  SET_REMOVABLES,
  REMOVE_POSSIBLES,
  SOLVE_CURRENT,
  CLEAR_ACTIVES,
} from './actions';

const defaultState = {
  current: null,
  actives: null,
  removables: null,
  rowPossibles: null,
};

export default function boardReducer(state = defaultState, action) {
  switch(action.type) {
    case SET_BOARD: {
      const moves = getAllMoves(action.board);
      return {
        ...state,
        current: action.board,
        ...moves,
      };
    }
    case SET_REMOVABLES: {
      return {
        ...state,
        removables: action.values,
      };
    }
    case REMOVE_POSSIBLES: {
      const current = removePossibles(state.current, action.values);
      const moves = getAllMoves(current);
      return {
        ...state,
        current,
        removables: null,
        ...moves,
      };
    }
    case SOLVE_CURRENT: {
      const current = solve(state.current);
      return {
        ...state,
        current,
      };
    }
    case CLEAR_ACTIVES:
      return {
        ...state,
        actives: null,
      };
    default:
      return state;
  }
}
