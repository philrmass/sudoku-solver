import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { selectBoard } from '../redux/board/actions';
import styles from '../styles/Selector.module.css';

function Selector({
  puzzles,
  index,
  selectBoard,
}) {
  return (
    <main className={styles.main}>
      <button
        className={styles.button}
        disabled={index <= 0}
        onClick={() => selectBoard(index - 1)}
      >
        {'<--'}
      </button>
      {puzzles[index].name}
      <button
        className={styles.button}
        disabled={index >= puzzles.length - 1}
        onClick={() => selectBoard(index + 1)}
      >
        {'-->'}
      </button>
    </main>
  );
}

Selector.propTypes = {
  puzzles: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
  selectBoard: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  puzzles: state.board.puzzles,
  index: state.board.index,
});

const mapDispatch = {
  selectBoard,
};

export default connect(mapState, mapDispatch)(Selector);
