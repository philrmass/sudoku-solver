import {
  rowIndices,
  columnIndices,
  boxIndices,
  rowBoxIntersections,
  columnBoxIntersections,
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

  const noColumnBoxIntersections = removeColumnBoxIntersections(board);
  const columnBoxIntersections = getBoardDiff(board, noColumnBoxIntersections);

  return {
    rowPossibles,
    columnPossibles,
    boxPossibles,
    allPossibles,
    rowUniques,
    columnUniques,
    boxUniques,
    rowBoxIntersections,
    columnBoxIntersections,
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

function hasRowBoxIntersections(board) {
  const removes = getSectionBoxRemoves(rowBoxIntersections, board);
  return removes.length > 0;
}

function hasColumnBoxIntersections(board) {
  const removes = getSectionBoxRemoves(columnBoxIntersections, board);
  return removes.length > 0;
}

function removeRowBoxIntersections(board) {
  return removeSectionBoxIntersections(rowBoxIntersections, board);
}

function removeColumnBoxIntersections(board) {
  return removeSectionBoxIntersections(columnBoxIntersections, board);
}

function removeSectionBoxIntersections(intersections, inBoard) {
  const removes = getSectionBoxRemoves(intersections, inBoard);

  return removes.reduce((board, remove) => {
    const before = board.slice(0, remove.index);
    const after = board.slice(remove.index + 1);
    const cell = board[remove.index];
    const removed = cell.filter((value) => value !== remove.value);

    return [...before, removed, ...after];
  }, inBoard);
}

function getSectionBoxRemoves(intersections, inBoard) {
  const indices = getIndices(27);
  return indices.reduce((removes, index) => {
    const data = intersections[index];
    const section = getCells(data[0], inBoard);
    const box = getCells(data[1], inBoard);
    const intersection = getCells(data[2], inBoard);

    const sValues = getValues(section);
    const bValues = getValues(box);
    const iValues = getValues(intersection);

    const exclusives = iValues.filter((value) => {
      const inSection = sValues.includes(value);
      const inBox = bValues.includes(value);
      return (inSection !== inBox);
    });

    const sectionRemoves = getRemoves(section, exclusives);
    const boxRemoves = getRemoves(box, exclusives);

    return [...removes, ...sectionRemoves, ...boxRemoves];
  }, []);
}

function getValues(cells) {
  return cells.reduce((values, cell) => {
    if (cell.values.length > 1) {
      const uniques = cell.values.filter((value) => !values.includes(value));
      return [...values, ...uniques];
    }
    return values;
  }, []);
}

function getRemoves(cells, exclusives) {
  return exclusives.map((exclusive) => {
    return cells.reduce((removes, cell) => {
      if (cell.values.includes(exclusive)) {
        const remove = {
          index: cell.index,
          value: exclusive,
        };
        return [...removes, remove];
      }
      return removes;
    }, []);
  }).flat();
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

export function getPossiblesCount(board) {
  if (board) {
    return board.reduce((cnt, cell) => cnt + cell.length, 0);
  }

  return 0;
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
    } else if (hasRowBoxIntersections(removed)) {
      removed = removeRowBoxIntersections(removed);
      hasChanged = true;
    } else if (hasColumnBoxIntersections(removed)) {
      removed = removeColumnBoxIntersections(removed);
      hasChanged = true;
    }
  }

  return removed;
}

export function getSolveSteps(inBoard) {
  let board = inBoard;
  let hasChanged = true;
  let steps = [];

  while (hasChanged) {
    hasChanged = false;
    let removedPossibles = true;

    while (removedPossibles) {
      removedPossibles = false;
      const start = getPossiblesCount(board);

      const row = removeRowPossibles(board);
      const rowCount = getPossiblesCount(row);
      const rowDiff = start - rowCount;

      const column = removeColumnPossibles(board);
      const columnCount = getPossiblesCount(column);
      const columnDiff = start - columnCount;

      const box = removeBoxPossibles(board);
      const boxCount = getPossiblesCount(box);
      const boxDiff = start - boxCount;

      const max = Math.max(rowDiff, columnDiff, boxDiff);

      if (max > 0) {
        removedPossibles = true;
        hasChanged = true;

        if (max === rowDiff) {
          board = row;
          steps = [...steps, getSolveStep('p', 'r', rowCount, rowDiff)];
        } else if (max === columnDiff) {
          board = column;
          steps = [...steps, getSolveStep('p', 'c', columnCount, columnDiff)];
        } else {
          board = box;
          steps = [...steps, getSolveStep('p', 'b', boxCount, boxDiff)];
        }
      }
    }

    const start = getPossiblesCount(board);

    const row = setRowUniques(board);
    const rowCount = getPossiblesCount(row);
    const rowDiff = start - rowCount;

    const column = setColumnUniques(board);
    const columnCount = getPossiblesCount(column);
    const columnDiff = start - columnCount;

    const box = setBoxUniques(board);
    const boxCount = getPossiblesCount(box);
    const boxDiff = start - boxCount;

    const max = Math.max(rowDiff, columnDiff, boxDiff);

    if (max > 0) {
      hasChanged = true;

      if (max === rowDiff) {
        board = row;
        steps = [...steps, getSolveStep('u', 'r', rowCount, rowDiff)];
      } else if (max === columnDiff) {
        board = column;
        steps = [...steps, getSolveStep('u', 'c', columnCount, columnDiff)];
      } else {
        board = box;
        steps = [...steps, getSolveStep('u', 'b', boxCount, boxDiff)];
      }
    } else {
      const start = getPossiblesCount(board);

      const rowBox = removeRowBoxIntersections(board);
      const rowBoxCount = getPossiblesCount(rowBox);
      const rowBoxDiff = start - rowBoxCount;

      const columnBox = removeColumnBoxIntersections(board);
      const columnBoxCount = getPossiblesCount(columnBox);
      const columnBoxDiff = start - columnBoxCount;

      const max = Math.max(rowBoxDiff, columnBoxDiff);

      if (max > 0) {
        hasChanged = true;

        if (max === rowBoxDiff) {
          board = rowBox;
          steps = [...steps, getSolveStep('i', 'r', rowBoxCount, rowBoxDiff)];
        } else if (max === columnBoxDiff) {
          board = columnBox;
          steps = [...steps, getSolveStep('i', 'c', columnBoxCount, columnBoxDiff)];
        }
      }
    }
  }

  return steps;
}

function getSolveStep(typeLetter, sectionLetter, total, removed) {
  const types = {
    p: 'possibles',
    u: 'uniques',
    i: 'intersections',
  };
  const sections = {
    r: 'row',
    c: 'col',
    b: 'box',
  };
  const type = types[typeLetter];
  const section = sections[sectionLetter];
  const remaining = total - 81;

  return {
    type,
    section,
    removed,
    remaining,
  };
}

export function displaySolveData(steps) {
  return steps.reduce((out, step) => {
    const remaning = `${step.remaining}`.padStart(3);
    const removed = `${step.removed}`.padStart(3);
    const type = `${step.type}`.padStart(3);
    const name = `${step.step}`.padStart(13);
    return out + `${remaning} ${removed} ${type} ${name}\n`;
  }, '');
}

export function getBoardScore(steps) {
  if (steps.length === 0) {
    return 0;
  }

  const lastStep = steps[steps.length - 1];
  const isSolved = lastStep.remaining === 0;
  const nonPossible = steps.findIndex((step) => step.type != 'possibles');
  const isAllPossible = nonPossible < 0;
  console.log('NP', isSolved, isAllPossible ? 'POS' : nonPossible, steps.length);
  return steps.length;
}
