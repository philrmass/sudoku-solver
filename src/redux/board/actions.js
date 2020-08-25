export const SET_BOARD = 'SET_BOARD';
export const REMOVE_ROW_POSSIBLES = 'REMOVE_ROW_POSSIBLES';
export const REMOVE_COLUMN_POSSIBLES = 'REMOVE_COLUMN_POSSIBLES';
export const REMOVE_BOX_POSSIBLES = 'REMOVE_BOX_POSSIBLES';
export const REMOVE_EACH_POSSIBLES = 'REMOVE_EACH_POSSIBLES';
export const REMOVE_ALL_POSSIBLES = 'REMOVE_ALL_POSSIBLES';
export const SET_ROW_UNIQUES = 'SET_ROW_UNIQUES';
export const SET_COLUMN_UNIQUES = 'SET_COLUMN_UNIQUES';
export const SET_BOX_UNIQUES = 'SET_BOX_UNIQUES';
export const USE_ROW_INTERSECTIONS = 'USE_ROW_INTERSECTIONS';
export const SOLVE_CURRENT = 'SOLVE_CURRENT';
export const CLEAR_ACTIVES = 'CLEAR_ACTIVES';

export function setBoard(board) {
  return {
    type: SET_BOARD,
    board,
  };
}

export function removePossibles(possibles) {
  console.log('REMOVE-POSSIBLES', possibles);
  //???? add action type
}

export function removeRowPossibles() {
  return { type: REMOVE_ROW_POSSIBLES };
}

export function removeColumnPossibles() {
  return { type: REMOVE_COLUMN_POSSIBLES };
}

export function removeBoxPossibles() {
  return { type: REMOVE_BOX_POSSIBLES };
}

export function removeEachPossibles() {
  return { type: REMOVE_EACH_POSSIBLES };
}

export function removeAllPossibles() {
  return { type: REMOVE_ALL_POSSIBLES };
}

export function setRowUniques() {
  return { type: SET_ROW_UNIQUES };
}

export function setColumnUniques() {
  return { type: SET_COLUMN_UNIQUES };
}

export function setBoxUniques() {
  return { type: SET_BOX_UNIQUES };
}

export function useRowIntersections() {
  return { type: USE_ROW_INTERSECTIONS };
}

export function solveCurrent() {
  return { type: SOLVE_CURRENT };
}

export function clearActives() {
  return { type: CLEAR_ACTIVES};
}
