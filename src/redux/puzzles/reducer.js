import puzzlesStr from '../../data/puzzles.txt';
import { parsePuzzles } from '../../utilities/puzzles';

import {
  solve,
  getPossiblesCount,
  getSolveSteps,
  getBoardScore,
} from '../../utilities/board';
import {
  getPuzzleBoard,
  //getSolvedSummary,
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
        const remaining = getPossiblesCount(cells) - 81;
        const steps = getSolveSteps(board);
        const score = getBoardScore(steps);

        return {
          ...puzzle,
          cells,
          remaining,
          steps,
          score,
        };
      });
      //console.log(getSolvedSummary(solved));
      return {
        ...state,
        solved,
      };
    }
    default:
      return state;
  }
}
