import { getPuzzleBoard } from '../../utilities/puzzles';
import { setBoard } from '../board/actions';

export const SELECT_PUZZLE = 'SELECT_PUZZLE';

export function selectPuzzle(puzzleIndex) {
  return async (dispatch, getState) => {
    const state = getState();
    const puzzles = state.puzzles.unsolved;
    const index = inRange(puzzleIndex, 0, puzzles.length);
    const board = getPuzzleBoard(index, puzzles);

    dispatch(setBoard(board));

    return dispatch({
      type: SELECT_PUZZLE,
      index,
    });
  };
}

function inRange(value, min , max) {
  return Math.min(Math.max(min, value), max);
}
