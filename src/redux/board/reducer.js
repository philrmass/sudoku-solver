import puzzlesStr from '../../data/puzzles.txt';
import { parsePuzzles, getPuzzleBoard } from '../../utilities/puzzles';

const puzzles = parsePuzzles(puzzlesStr);
const index = 0;

const defaultState = {
  puzzles,
  index,
  current: getPuzzleBoard(puzzles[index]),
};

export default function boardReducer(state = defaultState, action) {
  switch(action.type) {
    default:
      return state;
  }
}
