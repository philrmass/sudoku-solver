import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
} from '../redux/board/actions';
import styles from '../styles/Controls.module.css';

function Controls({
  board,
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
}) {
  console.log(`b(${board[0].length})`);
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
          <button>
            All
          </button>
        </div>
      </section>
    </main>
  );
}

Controls.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  removeRowPossibles: PropTypes.func.isRequired,
  removeColumnPossibles: PropTypes.func.isRequired,
  removeBoxPossibles: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  board: state.board.current,
});

const mapDispatch = {
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
};

export default connect(mapState, mapDispatch)(Controls);
