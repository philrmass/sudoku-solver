import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
  removeAllPossibles,
  removeBoardPossibles,
} from '../redux/board/actions';
import styles from '../styles/Controls.module.css';

function Controls({
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
  removeAllPossibles,
  removeBoardPossibles,
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
            onClick={() => removeAllPossibles()}
          >
            All
          </button>
          <button
            onClick={() => removeBoardPossibles()}
          >
            Repeat All
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
  removeAllPossibles: PropTypes.func.isRequired,
  removeBoardPossibles: PropTypes.func.isRequired,
};

const mapDispatch = {
  removeRowPossibles,
  removeColumnPossibles,
  removeBoxPossibles,
  removeAllPossibles,
  removeBoardPossibles,
};

export default connect(null, mapDispatch)(Controls);
