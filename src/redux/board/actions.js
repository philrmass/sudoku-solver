export const SET_BOARD = 'SET_BOARD';
export const SET_REMOVABLES = 'SET_REMOVABLES';
export const REMOVE_POSSIBLES = 'REMOVE_POSSIBLES';
export const SOLVE_CURRENT = 'SOLVE_CURRENT';

export function setBoard(board) {
  return {
    type: SET_BOARD,
    board,
  };
}

export function setRemovables(name) {
  return {
    type: SET_REMOVABLES,
    name,
  };
}

export function removePossibles(values) {
  return {
    type: REMOVE_POSSIBLES,
    values,
  };
}

export function solveCurrent() {
  return { type: SOLVE_CURRENT };
}
