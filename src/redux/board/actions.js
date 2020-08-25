export const SET_BOARD = 'SET_BOARD';
export const SET_REMOVABLES = 'SET_REMOVABLES';
export const REMOVE_POSSIBLES = 'REMOVE_POSSIBLES';
export const SOLVE_CURRENT = 'SOLVE_CURRENT';
export const CLEAR_ACTIVES = 'CLEAR_ACTIVES';

export function setBoard(board) {
  return {
    type: SET_BOARD,
    board,
  };
}

export function setRemovables(values) {
  return {
    type: SET_REMOVABLES,
    values,
  };
}

export function removePossibles(values) {
  if (!values) {
    return {};
  }
  return {
    type: REMOVE_POSSIBLES,
    values,
  };
}

export function solveCurrent() {
  return { type: SOLVE_CURRENT };
}

export function clearActives() {
  return { type: CLEAR_ACTIVES};
}
