import puzzlesStr from '../../data/puzzles.txt';
import {
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
} from '../../utilities/board';
import { parsePuzzles, getPuzzleBoard } from '../../utilities/puzzles';

import {
  REMOVE_ROW_POSSIBLES,
  REMOVE_COLUMN_POSSIBLES,
  REMOVE_BOX_POSSIBLES,
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
    case REMOVE_ROW_POSSIBLES:
      return {
        ...state,
        current: removeRowPossibles(state.current),
      };
    case REMOVE_COLUMN_POSSIBLES:
      return {
        ...state,
        current: removeColumnPossibles(state.current),
      };
    case REMOVE_BOX_POSSIBLES:
      return {
        ...state,
        current: removeBoxPossibles(state.current),
      };
    default:
      return state;
  }
}
