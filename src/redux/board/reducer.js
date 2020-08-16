import {
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
  removeEachPossibles,
  removeAllPossibles,
  setRowUniques,
  setColumnUniques,
  setBoxUniques,
  getActives,
} from '../../utilities/board';

import {
  SET_BOARD,
  REMOVE_ROW_POSSIBLES,
  REMOVE_COLUMN_POSSIBLES,
  REMOVE_BOX_POSSIBLES,
  REMOVE_EACH_POSSIBLES,
  REMOVE_ALL_POSSIBLES,
  SET_ROW_UNIQUES,
  SET_COLUMN_UNIQUES,
  SET_BOX_UNIQUES,
  CLEAR_ACTIVES,
} from './actions';

const defaultState = {
  current: null,
  actives: null,
};

export default function boardReducer(state = defaultState, action) {
  switch(action.type) {
    case SET_BOARD: {
      return {
        ...state,
        current: action.board,
      };
    }
    case REMOVE_ROW_POSSIBLES: {
      const board = removeRowPossibles(state.current);
      const actives = getActives(state.current, board);
      return {
        ...state,
        current: board,
        actives,
      };
    }
    case REMOVE_COLUMN_POSSIBLES: {
      const board = removeColumnPossibles(state.current);
      const actives = getActives(state.current, board);
      return {
        ...state,
        current: board,
        actives,
      };
    }
    case REMOVE_BOX_POSSIBLES: {
      const board = removeBoxPossibles(state.current);
      const actives = getActives(state.current, board);
      return {
        ...state,
        current: board,
        actives,
      };
    }
    case REMOVE_EACH_POSSIBLES: {
      const board = removeEachPossibles(state.current);
      const actives = getActives(state.current, board);
      return {
        ...state,
        current: board,
        actives,
      };
    }
    case REMOVE_ALL_POSSIBLES: {
      const board = removeAllPossibles(state.current);
      const actives = getActives(state.current, board);
      return {
        ...state,
        current: board,
        actives,
      };
    }
    case SET_ROW_UNIQUES: {
      const board = setRowUniques(state.current);
      const actives = getActives(state.current, board);
      return {
        ...state,
        current: board,
        actives,
      };
    }
    case SET_COLUMN_UNIQUES: {
      const board = setColumnUniques(state.current);
      const actives = getActives(state.current, board);
      return {
        ...state,
        current: board,
        actives,
      };
    }
    case SET_BOX_UNIQUES: {
      const board = setBoxUniques(state.current);
      const actives = getActives(state.current, board);
      return {
        ...state,
        current: board,
        actives,
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
