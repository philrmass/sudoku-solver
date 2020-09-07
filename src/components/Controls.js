import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  setRemovables,
  removePossibles,
  solveCurrent,
} from '../redux/board/actions';
import {
  selectPuzzle,
  solveAllPuzzles,
} from '../redux/puzzles/actions';
import styles from '../styles/Controls.module.css';

import {
  getPossiblesCount,
  isSolved,
} from '../utilities/board';

function Controls({
  board,
  moves,
  removables,
  removablesName,
  index,
  setRemovables,
  removePossibles,
  solveCurrent,
  selectPuzzle,
  solveAllPuzzles,
}) {
  function buildBadge(name) {
    if (name !== removablesName) {
      return null;
    }

    return (
      <div className={styles.badge}>
        {getPossiblesCount(removables)}
      </div>
    );
  }

  function buildPossibles() {
    return (
      <section className={styles.section}>
        <div className={styles.title}>
          Remove Possibles
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            disabled={!moves.rowPossibles}
            onMouseOver={() => setRemovables('rowPossibles')}
            onMouseLeave={() => setRemovables('')}
            onClick={() => removePossibles(moves.rowPossibles)}
          >
            {buildBadge('rowPossibles')}
            Row
          </button>
          <button
            className={styles.button}
            disabled={!moves.columnPossibles}
            onMouseOver={() => setRemovables('columnPossibles')}
            onMouseLeave={() => setRemovables('')}
            onClick={() => removePossibles(moves.columnPossibles)}
          >
            {buildBadge('columnPossibles')}
            Column
          </button>
          <button
            className={styles.button}
            disabled={!moves.boxPossibles}
            onMouseOver={() => setRemovables('boxPossibles')}
            onMouseLeave={() => setRemovables('')}
            onClick={() => removePossibles(moves.boxPossibles)}
          >
            {buildBadge('boxPossibles')}
            Box
          </button>
          <button
            className={styles.button}
            disabled={!moves.allPossibles}
            onMouseOver={() => setRemovables('allPossibles')}
            onMouseLeave={() => setRemovables('')}
            onClick={() => removePossibles(moves.allPossibles)}
          >
            {buildBadge('allPossibles')}
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
            className={styles.button}
            disabled={moves.allPossibles || !moves.rowUniques}
            onMouseOver={() => setRemovables('rowUniques')}
            onMouseLeave={() => setRemovables('')}
            onClick={() => removePossibles(moves.rowUniques)}
          >
            {buildBadge('rowUniques')}
            Row
          </button>
          <button
            className={styles.button}
            disabled={moves.allPossibles || !moves.columnUniques}
            onMouseOver={() => setRemovables('columnUniques')}
            onMouseLeave={() => setRemovables('')}
            onClick={() => removePossibles(moves.columnUniques)}
          >
            {buildBadge('columnUniques')}
            Column
          </button>
          <button
            className={styles.button}
            disabled={moves.allPossibles || !moves.boxUniques}
            onMouseOver={() => setRemovables('boxUniques')}
            onMouseLeave={() => setRemovables('')}
            onClick={() => removePossibles(moves.boxUniques)}
          >
            {buildBadge('boxUniques')}
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
            className={styles.button}
            disabled={moves.allPossibles || !moves.rowBoxIntersections}
            onMouseOver={() => setRemovables('rowBoxIntersections')}
            onMouseLeave={() => setRemovables('')}
            onClick={() => removePossibles(moves.rowBoxIntersections)}
          >
            {buildBadge('rowBoxIntersections')}
            Row-Box
          </button>
          <button
            className={styles.button}
            disabled={moves.allPossibles || !moves.columnBoxIntersections}
            onMouseOver={() => setRemovables('columnBoxIntersections')}
            onMouseLeave={() => setRemovables('')}
            onClick={() => removePossibles(moves.columnBoxIntersections)}
          >
            {buildBadge('columnBoxIntersections')}
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
          Puzzles
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            disabled={isSolved(board)}
            onClick={() => solveCurrent()}
          >
            Solve 
          </button>
          <button
            className={styles.button}
            onClick={() => selectPuzzle(index)}
          >
            Reset
          </button>
          <button
            className={styles.button}
            onClick={() => solveAllPuzzles()}
          >
            Solve All
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
  moves: PropTypes.objectOf(PropTypes.array).isRequired,
  removables: PropTypes.array,
  removablesName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  setRemovables: PropTypes.func.isRequired,
  removePossibles: PropTypes.func.isRequired,
  solveCurrent: PropTypes.func.isRequired,
  selectPuzzle: PropTypes.func.isRequired,
  solveAllPuzzles: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  board: state.board.current,
  moves: state.board.moves,
  removables: state.board.removables,
  removablesName: state.board.removablesName,
  index: state.puzzles.index,
});

const mapDispatch = {
  setRemovables,
  removePossibles,
  solveCurrent,
  selectPuzzle,
  solveAllPuzzles,
};

export default connect(mapState, mapDispatch)(Controls);
