import {
  rowIndices,
  columnIndices,
  boxIndices,
} from '../data/indices';

export function getAllMoves(board) {
  if (!board) {
    return {};
  }

  const noRowPossibles = removeRowPossibles(board);
  const rowPossibles = getBoardDiff(board, noRowPossibles);

  const noColumnPossibles = removeColumnPossibles(board);
  const columnPossibles = getBoardDiff(board, noColumnPossibles);

  const noBoxPossibles = removeBoxPossibles(board);
  const boxPossibles = getBoardDiff(board, noBoxPossibles);

  const noPossibles = removeAllPossibles(board); 
  const allPossibles = getBoardDiff(board, noPossibles);

  const noRowUniques = setRowUniques(board);
  const rowUniques = getBoardDiff(board, noRowUniques);

  const noColumnUniques = setColumnUniques(board);
  const columnUniques = getBoardDiff(board, noColumnUniques);

  const noBoxUniques = setBoxUniques(board);
  const boxUniques = getBoardDiff(board, noBoxUniques);

  const noRowBoxIntersections = removeRowBoxIntersections(board);
  const rowBoxIntersections = getBoardDiff(board, noRowBoxIntersections);

  return {
    rowPossibles,
    columnPossibles,
    boxPossibles,
    allPossibles,
    rowUniques,
    columnUniques,
    boxUniques,
    rowBoxIntersections,
  };
}

function getBoardDiff(lastBoard, board) {
  const removables = board.map((cell, index) => {
    const lastCell = lastBoard[index];
    if (lastCell.length > cell.length) {
      return lastCell.filter((value) => !cell.includes(value));
    }
    return [];
  });

  if (removables.some((cell) => cell.length > 0)) {
    return removables;
  }
  return null;
}

export function removePossibles(board, possibles) {
  return board.map((cell, index) => {
    return cell.filter((value) => !possibles[index].includes(value));
  });
}

function hasRowPossibles(board) {
  return hasPossibles(rowIndices, board);
}

function hasColumnPossibles(board) {
  return hasPossibles(columnIndices, board);
}

function hasBoxPossibles(board) {
  return hasPossibles(boxIndices, board);
}

function hasAnyPossibles(board) {
  return hasRowPossibles(board) ||
    hasColumnPossibles(board) ||
    hasBoxPossibles(board);
}

function hasPossibles(sectionIndices, board) {
  const indices = getIndices(9);
  return indices.some((index) => {
    return hasSectionPossibles(sectionIndices[index], board);
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

function removeRowPossibles(board) {
  return removeSectionPossibles(rowIndices, board);
}

function removeColumnPossibles(board) {
  return removeSectionPossibles(columnIndices, board);
}

function removeBoxPossibles(board) {
  return removeSectionPossibles(boxIndices, board);
}

function removeAllPossibles(board) {
  let removed = board;
  while (hasAnyPossibles(removed)) {
    const noRows = removeRowPossibles(removed);
    const noColumns = removeColumnPossibles(noRows);
    removed = removeBoxPossibles(noColumns);
  }
  return removed;
}

function removeSectionPossibles(sectionIndices, inBoard) {
  const indices = getIndices(9);
  const sections = indices.map((index) => {
    return getNoPossiblesSection(sectionIndices[index], inBoard);
  }).flat();

  sections.sort((a, b) => a.index - b.index);
  return sections.map((section) => section.values);
}

function getNoPossiblesSection(indices, board) {
  const cells = getCells(indices, board);
  const dones = getDones(cells);

  return cells.map((cell) => ({
    ...cell,
    values: removeDones(cell.values, dones),
  }));
}

function getIndices(count) {
  return Array.from({ length: count }, (_, index) => index);
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

function hasRowUniques(board) {
  return hasUniques(rowIndices, board);
}

function hasColumnUniques(board) {
  return hasUniques(columnIndices, board);
}

function hasBoxUniques(board) {
  return hasUniques(boxIndices, board);
}

function hasUniques(sectionIndices, board) {
  const indices = getIndices(9);
  return indices.some((index) => {
    return hasSectionUniques(sectionIndices[index], board);
  });
}

function hasSectionUniques(indices, board) {
  const cells = getCells(indices, board);
  const counts = getValueCounts(cells);
  return counts.some((count) => count === 1);
}

function setRowUniques(board) {
  return setUniques(rowIndices, board);
}

function setColumnUniques(board) {
  return setUniques(columnIndices, board);
}

function setBoxUniques(board) {
  return setUniques(boxIndices, board);
}

function setUniques(sectionIndices, board) {
  const indices = getIndices(9);
  const sections = indices.map((index) => {
    return getSetUniquesSection(sectionIndices[index], board);
  }).flat();

  sections.sort((a, b) => a.index - b.index);
  return sections.map((section) => section.values);
}

function getSetUniquesSection(indices, board) {
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

function removeRowBoxIntersections(board) {
  const indices = getIndices(9);
  indices.map((rowIndex) => {
    const rowCells = getCells(rowIndices[rowIndex], board);
    console.log(rowCells);
    indices.map((boxIndex) => {
      console.log(`ROW ${rowIndex}, BOX ${boxIndex}`);
      const boxCells = getCells(boxIndices[boxIndex], board);
      //??? has intersection?
      //??? print row else, intersection, box else
    });
  });

  return board;
}

export function isValidBoard(board) {
  const indices = getIndices(9);
  return indices.every((index) => {
    return isValidSection(rowIndices[index], board) &&
    isValidSection(columnIndices[index], board) &&
    isValidSection(boxIndices[index], board);
  });
}

function isValidSection(indices, board) {
  const cells = getCells(indices, board);
  const dones = getDones(cells);
  dones.sort((a, b) => a - b);
  return dones.every((done, index) => {
    return done !== dones[index - 1];
  });
}

export function isSolved(board) {
  return board.every((cell) => cell.length === 1);
}

export function solve(board) {
  let removed = board;
  let hasChanged = true;

  while (hasChanged) {
    hasChanged = false;

    if (hasAnyPossibles(removed)) {
      removed = removeAllPossibles(removed);
      hasChanged = true;
    } 
    if (hasRowUniques(removed)) {
      removed = setRowUniques(removed);
      hasChanged = true;
    } else if (hasColumnUniques(removed)) {
      removed = setColumnUniques(removed);
      hasChanged = true;
    } else if (hasBoxUniques(removed)) {
      removed = setBoxUniques(removed);
      hasChanged = true;
    }
  }

  return removed;
}

export function getPossiblesCount(board) {
  if (board) {
    return board.reduce((cnt, cell) => cnt + cell.length, 0);
  }

  return 0;
}

export function getAveragePossibles(board) {
  const total = board.reduce((average, cell) => {
    return average + cell.length;
  }, 0);
  const average = total / board.length;

  return Math.round(100 * average) / 100;
}
