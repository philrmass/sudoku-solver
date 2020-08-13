import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { selectPuzzle } from '../redux/puzzles/actions';
import styles from '../styles/Selector.module.css';

function Selector({
  puzzles,
  index,
  selectPuzzle,
}) {
  return (
    <main className={styles.main}>
      <button
        className={styles.button}
        disabled={index <= 0}
        onClick={() => selectPuzzle(index - 1)}
      >
        {'<--'}
      </button>
      {puzzles[index].name}
      <button
        className={styles.button}
        disabled={index >= puzzles.length - 1}
        onClick={() => selectPuzzle(index + 1)}
      >
        {'-->'}
      </button>
    </main>
  );
}

Selector.propTypes = {
  puzzles: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
  selectPuzzle: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  puzzles: state.puzzles.unsolved,
  index: state.puzzles.index,
});

const mapDispatch = {
  selectPuzzle,
};

export default connect(mapState, mapDispatch)(Selector);
