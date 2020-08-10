import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/Cell.module.css';

function Cell({
  index,
  board,
  actives,
}) {
  function buildValue() {
    const values = board[index];
    if (values.length === 1) {
      return buildSolution(values[0]);
    }
    return buildPossibles(values);
  }

  function buildSolution(value) {
    const isActive = actives && actives[index].length === 1;
    return (
      <div className={`${styles.done} ${isActive ? styles.active : ''}`}>
        {value}
      </div>
    );
  }

  function buildPossibles(values) {
    const blanks = Array.from({ length: 9 }, () => '');
    const all = values.reduce((all, value) => {
      return [...all.slice(0, value - 1), value, ...all.slice(value)];
    }, blanks);
    const cellActives = actives ? actives[index] : [];

    return (
      <div className={styles.possibles}>
        {all.map((value, i) => {
          const isActive = cellActives.includes(i + 1);

          if (isActive) {
            return (
              <div key={i} className={`${styles.possible} ${styles.active}`}>
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
  actives: PropTypes.array,
};

const mapState = (state) => ({
  board: state.board.current,
  actives: state.board.actives,
});

export default connect(mapState)(Cell);
