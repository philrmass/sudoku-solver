import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import boardReducer from './board/reducer';

const rootReducer = combineReducers({
  board: boardReducer,
});

export default createStore(
  rootReducer,
  {},
  applyMiddleware(thunk),
);
