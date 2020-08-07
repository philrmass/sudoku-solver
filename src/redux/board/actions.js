export const REMOVE_ROW_POSSIBLES = 'REMOVE_ROW_POSSIBLES';
export const REMOVE_COLUMN_POSSIBLES = 'REMOVE_COLUMN_POSSIBLES';
export const REMOVE_BOX_POSSIBLES = 'REMOVE_BOX_POSSIBLES';

export function removeRowPossibles() {
  return { type: REMOVE_ROW_POSSIBLES };
}

export function removeColumnPossibles() {
  return { type: REMOVE_COLUMN_POSSIBLES };
}

export function removeBoxPossibles() {
  return { type: REMOVE_BOX_POSSIBLES };
}
