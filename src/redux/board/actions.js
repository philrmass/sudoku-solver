export const SET_BOARD = 'SET_BOARD';
export const REMOVE_ROW_POSSIBLES = 'REMOVE_ROW_POSSIBLES';
export const REMOVE_COLUMN_POSSIBLES = 'REMOVE_COLUMN_POSSIBLES';
export const REMOVE_BOX_POSSIBLES = 'REMOVE_BOX_POSSIBLES';
export const REMOVE_EACH_POSSIBLES = 'REMOVE_EACH_POSSIBLES';
export const REMOVE_ALL_POSSIBLES = 'REMOVE_ALL_POSSIBLES';
export const CLEAR_ACTIVES = 'CLEAR_ACTIVES';

export function setBoard(board) {
  return {
    type: SET_BOARD,
    board,
  };
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

export function clearActives() {
  return { type: CLEAR_ACTIVES};
}
