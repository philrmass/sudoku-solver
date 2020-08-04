import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import './styles/normalize.css';
import './styles/index.css';
import App from './components/App';
import puzzlesTxt from './data/puzzles.txt';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);

console.log('#### PUZZLES ####\n', puzzlesTxt);
