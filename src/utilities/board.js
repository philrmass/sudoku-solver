import { rowIndices, columnIndices, boxIndices } from '../data/indices';

export function removeRowPossibles(board) {
  return removePossibles(rowIndices, board);
}

export function removeColumnPossibles(board) {
  return removePossibles(columnIndices, board);
}

export function removeBoxPossibles(board) {
  return removePossibles(boxIndices, board);
}

export function removeAllPossibles(board) {
  const rowFiltered = removePossibles(rowIndices, board);
  const columnFiltered = removePossibles(columnIndices, rowFiltered);
  return removePossibles(boxIndices, columnFiltered);
}

export function removeBoardPossibles(board) {
  console.log('BOARD');
  return [...board];
}

export function removePossibles(sectionIndices, inBoard) {
  const indices = Array.from({ length: 9 }, (_, index) => index);
  const sections = indices.map((index) => {
    return getNoPossiblesSection(index, sectionIndices, inBoard);
  }).flat();

  const sorted = sections.sort((a, b) => a.index - b.index);
  const board = sorted.map((section) => section.values);

  return board;
}

function getNoPossiblesSection(index, sectionIndices, board) {
  const indices = sectionIndices[index];
  const cells = indices.map((index) => ({
    index,
    values: board[index],
  }));

  const dones = cells.reduce((dones, cell) => {
    if (cell.values.length === 1) {
      return [...dones, cell.values[0]];
    }
    return dones;
  }, []);

  //??? add actives
  return cells.map((cell) => ({
    ...cell,
    values: removeDones(cell.values, dones),
  }));
}

function removeDones(values, dones) {
  if (values.length > 1) {
    return values.filter((value) => !dones.includes(value));
  }
  return values;
}
