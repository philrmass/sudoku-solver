import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Box.module.css';
import Cell from './Cell';

function Box({
  indices,
}) {
  function buildCells() {
    return indices.map((index) => (
      <li key={index}>
        <Cell index={index} />
      </li>
    ));
  }

  return (
    <main className={styles.main}>
      <ul className={styles.cells}>
        {buildCells()}
      </ul>
    </main>
  );
}

Box.propTypes = {
  indices: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Box;
