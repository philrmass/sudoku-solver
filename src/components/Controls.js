import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { removeAllRowPossibles } from '../redux/board/actions';
import styles from '../styles/Controls.module.css';

function Controls({
  board,
}) {
  console.log('B0', board[0].length);
  return (
    <main className={styles.main}>
      <section>
        <div className={styles.title}>
          Remove Possibles
        </div>
        <div>
          <button
            onClick={removeAllRowPossibles} 
          >
            Row
          </button>
          <button>
            Column
          </button>
          <button>
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
};

const mapState = (state) => ({
  board: state.board.current,
});

const mapDispatch = {
  removeAllRowPossibles,
};

export default connect(mapState, mapDispatch)(Controls);
