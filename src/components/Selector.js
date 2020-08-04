import React from 'react';

import styles from '../styles/Selector.module.css';

function Selector() {
  return (
    <main className={styles.main}>
      <button>
        {'<--'}
      </button>
      BOARD NAME
      <button>
        {'-->'}
      </button>
    </main>
  );
}

export default Selector;
