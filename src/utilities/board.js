import { rowIndices, columnIndices, boxIndices } from '../data/indices';

export function hasRowPossibles(board) {
  return hasPossibles(rowIndices, board);
}

export function hasColumnPossibles(board) {
  return hasPossibles(columnIndices, board);
}

export function hasBoxPossibles(board) {
  return hasPossibles(boxIndices, board);
}

export function hasAnyPossibles(board) {
  return hasRowPossibles(board) ||
    hasColumnPossibles(board) ||
    hasBoxPossibles(board);
}

function hasPossibles(sectionIndices, board) {
  const indices = Array.from({ length: 9 }, (_, index) => index);
  return indices.some((index) => {
    const indices = sectionIndices[index];
    return hasSectionPossibles(indices, board);
  });
}

function hasSectionPossibles(indices, board) {
  const cells = getCells(indices, board);
  const dones = getDones(cells);
  return cells.some((cell) => hasCellPossibles(cell, dones));
}

function hasCellPossibles(cell, dones) {
  if (cell.values.length > 1) {
    return cell.values.some((value) => dones.includes(value));
  }
  return false;
}

export function removeRowPossibles(board) {
  return removePossibles(rowIndices, board);
}

export function removeColumnPossibles(board) {
  return removePossibles(columnIndices, board);
}

export function removeBoxPossibles(board) {
  return removePossibles(boxIndices, board);
}

export function removeEachPossibles(board) {
  const rowFiltered = removePossibles(rowIndices, board);
  const columnFiltered = removePossibles(columnIndices, rowFiltered);
  return removePossibles(boxIndices, columnFiltered);
}

export function removeAllPossibles(board) {
  let removed = board;
  while (hasAnyPossibles(removed)) {
    const noRows = removeRowPossibles(removed);
    const noColumns = removeColumnPossibles(noRows);
    removed = removeBoxPossibles(noColumns);
  }
  return removed;
}

export function removePossibles(sectionIndices, inBoard) {
  const indices = Array.from({ length: 9 }, (_, index) => index);
  const sections = indices.map((index) => {
    return getNoPossiblesSection(index, sectionIndices, inBoard);
  }).flat();

  const sorted = sections.sort((a, b) => a.index - b.index);
  return sorted.map((section) => section.values);
}

function getNoPossiblesSection(index, sectionIndices, board) {
  const indices = sectionIndices[index];
  const cells = getCells(indices, board);
  const dones = getDones(cells);

  return cells.map((cell) => ({
    ...cell,
    values: removeDones(cell.values, dones),
  }));
}

function getCells(indices, board) {
  return indices.map((index) => ({
    index,
    values: board[index],
  }));
}

function getDones(cells) {
  return cells.reduce((dones, cell) => {
    if (cell.values.length === 1) {
      return [...dones, cell.values[0]];
    }
    return dones;
  }, []);
}

function removeDones(values, dones) {
  if (values.length > 1) {
    return values.filter((value) => !dones.includes(value));
  }
  return values;
}

export function setAllUniques(board) {
  const noRows = setRowUniques(board);
  //const noColumns = removeColumnPossibles(noRows);
  //return removeBoxPossibles(noColumns);
  return noRows;
}

export function setRowUniques(board) {
  console.log('ROWS');
  return setUniques(rowIndices, board);
}

export function setUniques(sectionIndices, inBoard) {
  const indices = Array.from({ length: 9 }, (_, index) => index);
  const sections = indices.map((index) => {
    return getSetUniquesSection(index, sectionIndices, inBoard);
  }).flat();

  const sorted = sections.sort((a, b) => a.index - b.index);
  return sorted.map((section) => section.values);
}

function getSetUniquesSection(index, sectionIndices, board) {
  console.log(` ${index}`);
  const indices = sectionIndices[index];
  const cells = getCells(indices, board);
  const counts = getValueCounts(cells);
  return setCellUniques(counts, cells);
}

function getValueCounts(cells) {
  const values = Array.from({ length: 9 }, (_, index) => index + 1);
  return values.map((value) => {
    return cells.reduce((count, cell) => {
      if (cell.values.length > 1) {
        if (cell.values.includes(value)) {
          return count + 1;
        }
      }
      return count;
    }, 0);
  });
}

function setCellUniques(counts, cells) {
  const uniques = counts.reduce((uniques, count, index) => {
    if (count === 1) {
      return [...uniques, index + 1];
    }
    return uniques;
  }, []);

  return cells.map((cell) => {
    for (const unique of uniques) {
      if (cell.values.includes(unique)) {
        return {
          ...cell,
          values: [unique],
        };
      }
    }
    return cell;
  });
}

export function hasCellUniques(counts) {
  return counts.some((count) => count === 1);
}

export function getActives(lastBoard, board) {
  return board.map((cell, index) => {
    const lastCell = lastBoard[index];
    if (lastCell.length > cell.length) {
      if (cell.length === 1) {
        return cell;
      }
      return lastCell.filter((value) => !cell.includes(value));
    }
    return [];
  });
}
