export function parsePuzzles(str) {
  const lines = str.split('\n').map(toDigits);

  const init = {
    puzzles: [],
    name: '',
    rows: [],
  };

  const data = lines.reduce((data, line) => {
    if (typeof line === 'string') {
      return {
        ...data,
        name: line,
        rows: [],
      };
    }

    const rows = [...data.rows, line];
    if (rows.length === 9) {
      const puzzle = {
        name: data.name,
        cells: rows.flat(),
      };
      return {
        puzzles: [...data.puzzles, puzzle],
        name: '',
        rows: [],
      };
    }

    return {
      ...data,
      rows,
    };
  }, init);

  return data.puzzles;
}

function toDigits(line) {
  if (line.length !== 9) {
    return line;
  }

  const chars = line.split('');
  const digits = chars.map((char) => parseInt(char));
  const areInts = digits.every((digit) => Number.isInteger(digit));

  if (!areInts) {
    return line;
  }

  return digits;
}

export function getPuzzleBoard(index, puzzles) {
  const puzzle = puzzles[index];
  return puzzle.cells.map((value) => value === 0 ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [value]);
}
