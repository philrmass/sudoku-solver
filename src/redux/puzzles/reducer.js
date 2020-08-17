import puzzlesStr from '../../data/puzzles.txt';
import { parsePuzzles } from '../../utilities/puzzles';

import {
  SELECT_PUZZLE,
} from './actions';

const defaultState = {
  unsolved: parsePuzzles(puzzlesStr),
  index: 0,
};

export default function puzzlesReducer(state = defaultState, action) {
  switch(action.type) {
    case SELECT_PUZZLE: {
      return {
        ...state,
        index: action.index,
      };
    }
    default:
      return state;
  }
}
