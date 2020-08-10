import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
  removeEachPossibles,
  removeAllPossibles,
  clearActives,
} from '../redux/board/actions';
import styles from '../styles/Controls.module.css';

function Controls({
  actives,
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
  removeEachPossibles,
  removeAllPossibles,
  clearActives,
}) {
  useEffect(() => {
    if (actives) {
      const timeout = setTimeout(clearActives, 700);
      return () => clearTimeout(timeout);
    }
  }, [actives]);

  return (
    <main className={styles.main}>
      <section>
        <div className={styles.title}>
          Remove Possibles
        </div>
        <div>
          <button
            onClick={() => removeRowPossibles()}
          >
            Row
          </button>
          <button
            onClick={() => removeColumnPossibles()}
          >
            Column
          </button>
          <button
            onClick={() => removeBoxPossibles()}
          >
            Box
          </button>
          <button
            onClick={() => removeEachPossibles()}
          >
            Each
          </button>
          <button
            onClick={() => removeAllPossibles()}
          >
            All
          </button>
        </div>
      </section>
    </main>
  );
}

Controls.propTypes = {
  actives: PropTypes.array,
  removeRowPossibles: PropTypes.func.isRequired,
  removeColumnPossibles: PropTypes.func.isRequired,
  removeBoxPossibles: PropTypes.func.isRequired,
  removeEachPossibles: PropTypes.func.isRequired,
  removeAllPossibles: PropTypes.func.isRequired,
  clearActives: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  actives: state.board.actives,
});

const mapDispatch = {
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
  removeEachPossibles,
  removeAllPossibles,
  clearActives,
};

export default connect(mapState, mapDispatch)(Controls);
