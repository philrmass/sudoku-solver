import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
  removeEachPossibles,
  removeAllPossibles,
} from '../redux/board/actions';
import styles from '../styles/Controls.module.css';

function Controls({
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
  removeEachPossibles,
  removeAllPossibles,
}) {
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
  removeRowPossibles: PropTypes.func.isRequired,
  removeColumnPossibles: PropTypes.func.isRequired,
  removeBoxPossibles: PropTypes.func.isRequired,
  removeEachPossibles: PropTypes.func.isRequired,
  removeAllPossibles: PropTypes.func.isRequired,
};

const mapDispatch = {
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
  removeEachPossibles,
  removeAllPossibles,
};

export default connect(null, mapDispatch)(Controls);
