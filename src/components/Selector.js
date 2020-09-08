import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { selectPuzzle } from '../redux/puzzles/actions';
import styles from '../styles/Selector.module.css';

function Selector({
  puzzles,
  index,
  score,
  selectPuzzle,
}) {
  return (
    <main className={styles.main}>
      <div className={styles.current}>
        <button
          className={styles.button}
          disabled={index <= 0}
          onClick={() => selectPuzzle(index - 1)}
        >
          {'-'}
        </button>
        <button
          className={styles.button}
          disabled={index >= puzzles.length - 1}
          onClick={() => selectPuzzle(index + 1)}
        >
          {'+'}
        </button>
        <div className={styles.name}>
          {puzzles[index].name}
        </div>
        <div className={styles.score}>
          {score}
        </div>
      </div>
    </main>
  );
}

Selector.propTypes = {
  puzzles: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  selectPuzzle: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  puzzles: state.puzzles.unsolved,
  index: state.puzzles.index,
  score: state.puzzles.score,
});

const mapDispatch = {
  selectPuzzle,
};

export default connect(mapState, mapDispatch)(Selector);
