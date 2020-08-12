import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/Selector.module.css';

function Selector({
  puzzles,
  index,
}) {
  return (
    <main className={styles.main}>
      <button className={styles.button}>
        {'<--'}
      </button>
      {puzzles[index].name}
      <button className={styles.button}>
        {'-->'}
      </button>
    </main>
  );
}

Selector.propTypes = {
  puzzles: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
};

const mapState = (state) => ({
  puzzles: state.board.puzzles,
  index: state.board.index,
});

export default connect(mapState)(Selector);
