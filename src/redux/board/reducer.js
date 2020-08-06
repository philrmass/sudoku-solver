import puzzlesStr from '../../data/puzzles.txt';
import { removeRowPossibles } from '../../utilities/board';
import { parsePuzzles, getPuzzleBoard } from '../../utilities/puzzles';

import {
  REMOVE_ROW_POSSIBLES,
} from './actions';

const puzzles = parsePuzzles(puzzlesStr);
const index = 0;

const defaultState = {
  puzzles,
  index,
  current: getPuzzleBoard(puzzles[index]),
};

export default function boardReducer(state = defaultState, action) {
  console.log('ACT', action);
  switch(action.type) {
    case REMOVE_ROW_POSSIBLES: {
      return {
        ...state,
        current: removeRowPossibles(0, state.current),
      };
    }
    default:
      return state;
  }
}
