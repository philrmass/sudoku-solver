export const REMOVE_ROW_POSSIBLES = 'REMOVE_ROW_POSSIBLES';

export function removeAllRowPossibles() {
  console.log('RARP');
  return { type: REMOVE_ROW_POSSIBLES };
}
