import puzzlesStr from '../../data/puzzles.txt';
import {
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
  removeEachPossibles,
  removeAllPossibles,
} from '../../utilities/board';
import { parsePuzzles, getPuzzleBoard } from '../../utilities/puzzles';

import {
  REMOVE_ROW_POSSIBLES,
  REMOVE_COLUMN_POSSIBLES,
  REMOVE_BOX_POSSIBLES,
  REMOVE_EACH_POSSIBLES,
  REMOVE_ALL_POSSIBLES,
} from './actions';

const puzzles = parsePuzzles(puzzlesStr);
const index = 0;

const defaultState = {
  puzzles,
  index,
  current: getPuzzleBoard(puzzles[index]),
};

export default function boardReducer(state = defaultState, action) {
  switch(action.type) {
    case REMOVE_ROW_POSSIBLES: {
      const board = removeRowPossibles(state.current);
      const actives = [];
      return {
        ...state,
        current: board,
        actives,
      };
    }
    case REMOVE_COLUMN_POSSIBLES: {
      const board = removeColumnPossibles(state.current);
      const actives = [];
      return {
        ...state,
        current: board,
        actives,
      };
    }
    case REMOVE_BOX_POSSIBLES: {
      const board = removeBoxPossibles(state.current);
      const actives = [];
      return {
        ...state,
        current: board,
        actives,
      };
    }
    case REMOVE_EACH_POSSIBLES: {
      const board = removeEachPossibles(state.current);
      const actives = [];
      return {
        ...state,
        current: board,
        actives,
      };
    }
    case REMOVE_ALL_POSSIBLES: {
      const board = removeAllPossibles(state.current);
      const actives = [];
      return {
        ...state,
        current: board,
        actives,
      };
    }
    default:
      return state;
  }
}
