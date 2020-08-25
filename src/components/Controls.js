import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  setRemovables,
  removePossibles,
  solveCurrent,
  clearActives,
} from '../redux/board/actions';
import {
  selectPuzzle,
  solveAllPuzzles,
} from '../redux/puzzles/actions';
import styles from '../styles/Controls.module.css';

import {
  isSolved,
} from '../utilities/board';

function Controls({
  board,
  actives,
  rowPossibles,
  columnPossibles,
  boxPossibles,
  allPossibles,
  rowUniques,
  columnUniques,
  boxUniques,
  index,
  setRemovables,
  removePossibles,
  solveCurrent,
  clearActives,
  selectPuzzle,
  solveAllPuzzles,
}) {
  console.log('\nRP', rowPossibles && rowPossibles.reduce((cnt, cell) => cnt + cell.length, 0));
  console.log('CP', columnPossibles && columnPossibles.reduce((cnt, cell) => cnt + cell.length, 0));
  console.log('BP', boxPossibles && boxPossibles.reduce((cnt, cell) => cnt + cell.length, 0));
  console.log('AP', allPossibles && allPossibles.reduce((cnt, cell) => cnt + cell.length, 0));
  console.log('RU', rowUniques && rowUniques.reduce((cnt, cell) => cnt + cell.length, 0));
  console.log('CU', columnUniques && columnUniques.reduce((cnt, cell) => cnt + cell.length, 0));
  console.log('BU', boxUniques && boxUniques.reduce((cnt, cell) => cnt + cell.length, 0));

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
            onMouseEnter={() => setRemovables(rowPossibles)}
            onMouseLeave={() => setRemovables(null)}
            onClick={() => removePossibles(rowPossibles)}
          >
            Row
          </button>
          <button
            disabled={!columnPossibles}
            onMouseEnter={() => setRemovables(columnPossibles)}
            onMouseLeave={() => setRemovables(null)}
            onClick={() => removePossibles(columnPossibles)}
          >
            Column
          </button>
          <button
            disabled={!boxPossibles}
            onMouseEnter={() => setRemovables(boxPossibles)}
            onMouseLeave={() => setRemovables(null)}
            onClick={() => removePossibles(boxPossibles)}
          >
            Box
          </button>
          <button
            disabled={!allPossibles}
            onMouseEnter={() => setRemovables(allPossibles)}
            onMouseLeave={() => setRemovables(null)}
            onClick={() => removePossibles(allPossibles)}
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
            disabled={!rowUniques}
            onMouseEnter={() => setRemovables(rowUniques)}
            onMouseLeave={() => setRemovables(null)}
            onClick={() => removePossibles(rowUniques)}
          >
            Row
          </button>
          <button
            disabled={!columnUniques}
            onMouseEnter={() => setRemovables(columnUniques)}
            onMouseLeave={() => setRemovables(null)}
            onClick={() => removePossibles(columnUniques)}
          >
            Column
          </button>
          <button
            disabled={!boxUniques}
            onMouseEnter={() => setRemovables(boxUniques)}
            onMouseLeave={() => setRemovables(null)}
            onClick={() => removePossibles(boxUniques)}
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
          >
            Row-Box
          </button>
          <button
            disabled={true}
          >
            Column-Box
          </button>
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
  rowPossibles: PropTypes.array,
  columnPossibles: PropTypes.array,
  boxPossibles: PropTypes.array,
  allPossibles: PropTypes.array,
  rowUniques: PropTypes.array,
  columnUniques: PropTypes.array,
  boxUniques: PropTypes.array,
  index: PropTypes.number.isRequired,
  setRemovables: PropTypes.func.isRequired,
  removePossibles: PropTypes.func.isRequired,
  solveCurrent: PropTypes.func.isRequired,
  clearActives: PropTypes.func.isRequired,
  selectPuzzle: PropTypes.func.isRequired,
  solveAllPuzzles: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  board: state.board.current,
  actives: state.board.actives,
  rowPossibles: state.board.rowPossibles,
  columnPossibles: state.board.columnPossibles,
  boxPossibles: state.board.boxPossibles,
  allPossibles: state.board.allPossibles,
  rowUniques: state.board.rowUniques,
  columnUniques: state.board.columnUniques,
  boxUniques: state.board.boxUniques,
  index: state.puzzles.index,
});

const mapDispatch = {
  setRemovables,
  removePossibles,
  solveCurrent,
  clearActives,
  selectPuzzle,
  solveAllPuzzles,
};

export default connect(mapState, mapDispatch)(Controls);
