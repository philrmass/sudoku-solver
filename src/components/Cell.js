import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/Cell.module.css';

function Cell({
  index,
  board,
  removables,
}) {
  function buildValue() {
    const values = board[index];
    if (values.length === 1) {
      return buildSolution(values[0]);
    }
    return buildPossibles(values);
  }

  function buildSolution(value) {
    return (
      <div className={styles.done} >
        {value}
      </div>
    );
  }

  function buildPossibles(values) {
    const blanks = Array.from({ length: 9 }, () => '');
    const all = values.reduce((all, value) => {
      return [...all.slice(0, value - 1), value, ...all.slice(value)];
    }, blanks);
    const cellRemovables = removables ? removables[index] : [];

    return (
      <div className={styles.possibles}>
        {all.map((value, i) => {
          const isRemovable = cellRemovables.includes(i + 1);

          if (isRemovable) {
            return (
              <div key={i} className={`${styles.possible} ${styles.removable}`}>
                {i + 1}
              </div>
            );
          }
          return (
            <div key={i} className={styles.possible}>
              {value}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <main className={styles.main}>
      {buildValue()}
    </main>
  );
}

Cell.propTypes = {
  index: PropTypes.number.isRequired,
  board: PropTypes.array.isRequired,
  removables: PropTypes.array,
};

const mapState = (state) => ({
  board: state.board.current,
  removables: state.board.removables,
});

export default connect(mapState)(Cell);
