import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/Cell.module.css';

function Cell({
  index,
  board,
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
      <div className={styles.solution}>
        {value}
      </div>
    );
  }

  function buildPossibles(values) {
    //??? reduce values, adding ''
    return (
      <div className={styles.possibles}>
        {values.map((value, index) => (
          <div key={index} className={styles.possible}>
            {value}
          </div>
        ))}
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
};

const mapState = (state) => ({
  board: state.board.current,
});

export default connect(mapState)(Cell);
