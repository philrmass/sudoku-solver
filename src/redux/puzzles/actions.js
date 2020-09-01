import { getPuzzleBoard } from '../../utilities/puzzles';
import { setBoard } from '../board/actions';

export const SELECT_PUZZLE = 'SELECT_PUZZLE';
export const SOLVE_ALL_PUZZLES = 'SOLVE_ALL_PUZZLES';

export function selectPuzzle(puzzleIndex) {
  return async (dispatch, getState) => {
    const state = getState();
    const puzzles = state.puzzles.unsolved;
    const index = inRange(puzzleIndex, 0, puzzles.length);
    const board = getPuzzleBoard(puzzles[index]);

    dispatch(setBoard(board));

    return dispatch({
      type: SELECT_PUZZLE,
      index,
    });
  };
}

export function solveAllPuzzles() {
  return {
    type: SOLVE_ALL_PUZZLES,
  };
}

function inRange(value, min, max) {
  return Math.min(Math.max(min, value), max);
}
