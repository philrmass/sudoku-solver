import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import boardReducer from './board/reducer';
import puzzlesReducer from './puzzles/reducer';

const rootReducer = combineReducers({
  board: boardReducer,
  puzzles: puzzlesReducer,
});

export default createStore(
  rootReducer,
  {},
  applyMiddleware(thunk),
);

//??? store.dispatch();
