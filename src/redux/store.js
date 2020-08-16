import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { selectPuzzle } from './puzzles/actions';
import boardReducer from './board/reducer';
import puzzlesReducer from './puzzles/reducer';

const rootReducer = combineReducers({
  board: boardReducer,
  puzzles: puzzlesReducer,
});

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(thunk),
);

store.dispatch(selectPuzzle(0));

export default store;
