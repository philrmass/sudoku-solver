import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Cell.module.css';

function Cell({
  index,
}) {
  return (
    <main className={styles.main}>
      {index} 
    </main>
  );
}

Cell.propTypes = {
  index: PropTypes.number.isRequired,
};

export default Cell;
