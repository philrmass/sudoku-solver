import React from 'react';
import ReactDOM from 'react-dom';

import './styles/normalize.css';
import './styles/index.css';
import App from './components/App';
import puzzlesTxt from './data/puzzles.txt';

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);

console.log('PUZ\n', puzzlesTxt);
