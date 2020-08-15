import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
  removeEachPossibles,
  removeAllPossibles,
  setAllUniques,
  clearActives,
} from '../redux/board/actions';
import styles from '../styles/Controls.module.css';

import {
  hasRowPossibles,
  hasColumnPossibles,
  hasBoxPossibles,
  hasAnyPossibles,
} from '../utilities/board';

function Controls({
  board,
  actives,
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
  removeEachPossibles,
  removeAllPossibles,
  setAllUniques,
  clearActives,
}) {
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
            disabled={!hasAnyPossibles(board)}
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
            disabled={!true}
            onClick={() => setAllUniques()}
          >
            All
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
  setAllUniques: PropTypes.func.isRequired,
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
  setAllUniques,
  clearActives,
};

export default connect(mapState, mapDispatch)(Controls);
