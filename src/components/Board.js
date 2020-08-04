import React from 'react';

import styles from '../styles/Board.module.css';
import Box from './Box';

function Board() {
  return (
    <main className={styles.main}>
      <Box indices={[0, 1, 2, 9, 10, 11, 18, 19, 20]} />
      <Box indices={[3, 4, 5, 12, 13, 14, 21, 22, 23]} />
      <Box indices={[6, 7, 8, 15, 16, 17, 24, 25, 26]} />
      <Box indices={[27, 28, 29, 36, 37, 38, 45, 46, 47]} />
      <Box indices={[30, 31, 32, 39, 40, 41, 48, 49, 50]} />
      <Box indices={[33, 34, 35, 42, 43, 44, 51, 52, 53]} />
      <Box indices={[54, 55, 56, 63, 64, 65, 72, 73, 74]} />
      <Box indices={[57, 58, 59, 66, 67, 68, 75, 76, 77]} />
      <Box indices={[60, 61, 62, 69, 70, 71, 78, 79, 80]} />
    </main>
  );
}

export default Board;
