import React from 'react';

import styles from '../styles/App.module.css';
import Board from './Board';
import Controls from './Controls';
import Selector from './Selector';

function App() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <Selector />
        <Board />
        <Controls />
      </div>
    </main>
  );
}

export default App;
