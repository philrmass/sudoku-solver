import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  removePossibles,
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
  removeEachPossibles,
  removeAllPossibles,
  setRowUniques,
  setColumnUniques,
  setBoxUniques,
  useRowIntersections,
  solveCurrent,
  clearActives,
} from '../redux/board/actions';
import {
  selectPuzzle,
  solveAllPuzzles,
} from '../redux/puzzles/actions';
import styles from '../styles/Controls.module.css';

import {
  hasRowPossibles,
  hasColumnPossibles,
  hasBoxPossibles,
  hasAnyPossibles,
  hasRowUniques,
  hasColumnUniques,
  hasBoxUniques,
  isSolved,
} from '../utilities/board';

function Controls({
  board,
  actives,
  removables,
  rowPossibles,
  index,
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
  removeEachPossibles,
  removeAllPossibles,
  setRowUniques,
  setColumnUniques,
  setBoxUniques,
  useRowIntersections,
  solveCurrent,
  clearActives,
  selectPuzzle,
  solveAllPuzzles,
}) {
  const anyPossibles = hasAnyPossibles(board);
  console.log('RP', rowPossibles);

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
            disabled={!rowPossibles}
            onClick={() => removePossibles(rowPossibles)}
          >
            Row
          </button>
          <button
            disabled={true}
            onClick={() => removeColumnPossibles()}
          >
            Column
          </button>
          <button
            disabled={true}
            onClick={() => removeBoxPossibles()}
          >
            Box
          </button>
          <button
            disabled={true}
            onClick={() => removeEachPossibles()}
          >
            Each
          </button>
          <button
            disabled={true}
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
            disabled={true}
            onClick={() => setRowUniques()}
          >
            Row
          </button>
          <button
            disabled={true}
            onClick={() => setColumnUniques()}
          >
            Column
          </button>
          <button
            disabled={true}
            onClick={() => setBoxUniques()}
          >
            Box
          </button>
        </div>
      </section>
    );
  }

  function buildIntersections() {
    return (
      <section className={styles.section}>
        <div className={styles.title}>
          Use Intersections
        </div>
        <div className={styles.buttons}>
          <button
            disabled={true}
            onClick={() => useRowIntersections()}
          >
            Row-Box
          </button>
          {/*
          <button
            disabled={true}
            onClick={() => setColumnUniques()}
          >
            Column-Box
          </button>
          */}
        </div>
      </section>
    );
  }

  function buildSolves() {
    return (
      <section className={styles.section}>
        <div className={styles.title}>
          Solve
        </div>
        <div className={styles.buttons}>
          <button
            disabled={isSolved(board)}
            onClick={() => solveCurrent()}
          >
            Current
          </button>
          <button onClick={() => solveAllPuzzles()}>
            All
          </button>
          <button onClick={() => selectPuzzle(index)}>
            Reset
          </button>
        </div>
      </section>
    );
  }

  return (
    <main className={styles.main}>
      {buildPossibles()}
      {buildUniques()}
      {buildIntersections()}
      {buildSolves()}
    </main>
  );
}

Controls.propTypes = {
  board: PropTypes.array.isRequired,
  actives: PropTypes.array,
  index: PropTypes.number.isRequired,
  removeRowPossibles: PropTypes.func.isRequired,
  removeColumnPossibles: PropTypes.func.isRequired,
  removeBoxPossibles: PropTypes.func.isRequired,
  removeEachPossibles: PropTypes.func.isRequired,
  removeAllPossibles: PropTypes.func.isRequired,
  setRowUniques: PropTypes.func.isRequired,
  setColumnUniques: PropTypes.func.isRequired,
  setBoxUniques: PropTypes.func.isRequired,
  useRowIntersections: PropTypes.func.isRequired,
  solveCurrent: PropTypes.func.isRequired,
  clearActives: PropTypes.func.isRequired,
  selectPuzzle: PropTypes.func.isRequired,
  solveAllPuzzles: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  board: state.board.current,
  actives: state.board.actives,
  removables: state.board.actives,
  rowPossibles: state.board.rowPossibles,
  index: state.puzzles.index,
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
  useRowIntersections,
  solveCurrent,
  clearActives,
  selectPuzzle,
  solveAllPuzzles,
};

export default connect(mapState, mapDispatch)(Controls);
