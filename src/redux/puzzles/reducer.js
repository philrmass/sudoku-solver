import puzzlesStr from '../../data/puzzles.txt';
import { parsePuzzles } from '../../utilities/puzzles';

import {
  solve,
  getAveragePossibles,
} from '../../utilities/board';
import {
  getPuzzleBoard,
  getSolvedSummary,
} from '../../utilities/puzzles';

import {
  SELECT_PUZZLE,
  SOLVE_ALL_PUZZLES,
} from './actions';

const defaultState = {
  index: 0,
  unsolved: parsePuzzles(puzzlesStr),
  solved: [],
};

export default function puzzlesReducer(state = defaultState, action) {
  switch(action.type) {
    case SELECT_PUZZLE: {
      return {
        ...state,
        index: action.index,
      };
    }
    case SOLVE_ALL_PUZZLES: {
      const solved = state.unsolved.map((puzzle) => {
        const board = getPuzzleBoard(puzzle);
        const cells = solve(board);
        const average = getAveragePossibles(cells);
        return {
          ...puzzle,
          cells,
          average,
        };
      });
      console.log(getSolvedSummary(solved));
      return {
        ...state,
        solved,
      };
    }
    default:
      return state;
  }
}
