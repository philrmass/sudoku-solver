import React from 'react';

import { boxIndices } from '../data/indices';
import styles from '../styles/Board.module.css';
import Box from './Box';

function Board() {
  function buildBoxes() {
    const indices = Array.from({ length: 9 }, (_, index) => index);
    return indices.map((index) => (
      <Box key={index} indices={boxIndices[index]} />
    ));
  }
  
  return (
    <main className={styles.main}>
      {buildBoxes()}
    </main>
  );
}

export default Board;
