import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { boxIndices } from '../data/indices';
import { isValidBoard } from '../utilities/board';
import styles from '../styles/Board.module.css';
import Box from './Box';

function Board({ board }) {
  const isValid = isValidBoard(board);

  function buildBoxes() {
    const indices = Array.from({ length: 9 }, (_, index) => index);
    return indices.map((index) => (
      <Box key={index} indices={boxIndices[index]} />
    ));
  }
  
  return (
    <main className={`${styles.main} ${isValid ? '' : styles.invalid}`}>
      <div className={styles.content}>
        {buildBoxes()}
      </div>
    </main>
  );
}

Board.propTypes = {
  board: PropTypes.array.isRequired,
};

const mapState = (state) => ({
  board: state.board.current,
});

export default connect(mapState)(Board);
