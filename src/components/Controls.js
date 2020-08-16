import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
  removeEachPossibles,
  removeAllPossibles,
  setRowUniques,
  setColumnUniques,
  setBoxUniques,
  clearActives,
} from '../redux/board/actions';
import styles from '../styles/Controls.module.css';

import {
  hasRowPossibles,
  hasColumnPossibles,
  hasBoxPossibles,
  hasAnyPossibles,
  hasRowUniques,
  hasColumnUniques,
  hasBoxUniques,
} from '../utilities/board';

function Controls({
  board,
  actives,
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
  removeEachPossibles,
  removeAllPossibles,
  setRowUniques,
  setColumnUniques,
  setBoxUniques,
  clearActives,
}) {
  const anyPossibles = hasAnyPossibles(board);

  useEffect(() => {
    if (actives) {
      const timeout = setTimeout(clearActives, 700);
      return () => clearTimeout(timeout);
    }
  }, [actives]);

  function buildPossibles() {
    return (
      <section className={styles.section}>
        <div className={styles.title}>
          Remove Possibles
        </div>
        <div className={styles.buttons}>
          <button
            disabled={!hasRowPossibles(board)}
            onClick={() => removeRowPossibles()}
          >
            Row
          </button>
          <button
            disabled={!hasColumnPossibles(board)}
            onClick={() => removeColumnPossibles()}
          >
            Column
          </button>
          <button
            disabled={!hasBoxPossibles(board)}
            onClick={() => removeBoxPossibles()}
          >
            Box
          </button>
          <button
            disabled={!anyPossibles}
            onClick={() => removeEachPossibles()}
          >
            Each
          </button>
          <button
            disabled={!hasAnyPossibles(board)}
            onClick={() => removeAllPossibles()}
          >
            All
          </button>
        </div>
      </section>
    );
  }

  function buildUniques() {
    return (
      <section className={styles.section}>
        <div className={styles.title}>
          Set Uniques
        </div>
        <div className={styles.buttons}>
          <button
            disabled={anyPossibles || !hasRowUniques(board)}
            onClick={() => setRowUniques()}
          >
            Row
          </button>
          <button
            disabled={anyPossibles || !hasColumnUniques(board)}
            onClick={() => setColumnUniques()}
          >
            Column
          </button>
          <button
            disabled={anyPossibles || !hasBoxUniques(board)}
            onClick={() => setBoxUniques()}
          >
            Box
          </button>
        </div>
      </section>
    );
  }

  return (
    <main className={styles.main}>
      {buildPossibles()}
      {buildUniques()}
    </main>
  );
}

Controls.propTypes = {
  board: PropTypes.array.isRequired,
  actives: PropTypes.array,
  removeRowPossibles: PropTypes.func.isRequired,
  removeColumnPossibles: PropTypes.func.isRequired,
  removeBoxPossibles: PropTypes.func.isRequired,
  removeEachPossibles: PropTypes.func.isRequired,
  removeAllPossibles: PropTypes.func.isRequired,
  setRowUniques: PropTypes.func.isRequired,
  setColumnUniques: PropTypes.func.isRequired,
  setBoxUniques: PropTypes.func.isRequired,
  clearActives: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  board: state.board.current,
  actives: state.board.actives,
});

const mapDispatch = {
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
  removeEachPossibles,
  removeAllPossibles,
  setRowUniques,
  setColumnUniques,
  setBoxUniques,
  clearActives,
};

export default connect(mapState, mapDispatch)(Controls);
