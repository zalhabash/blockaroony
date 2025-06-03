export type Level = {
  boardSideLength: number;
  solution: number[];
};

export type Piece = {
  height: number;
  width: number;
  shape: boolean[];
};

export class Game {
  boardSideLength: number;
  pieces: Piece[];

  constructor(level: Level) {
    if (level.boardSideLength <= 0) {
      throw Error("Board side length should be a positive number");
    }
    if (level.solution.length === 0) {
      throw Error("Level solution should not be empty");
    }

    this.boardSideLength = level.boardSideLength;
    this.pieces = [];

    const pieceCount = Math.max(...level.solution);

    for (let pieceNumber = 1; pieceNumber <= pieceCount; pieceNumber++) {
      const untrimmedShape = level.solution.map((cell) => cell === pieceNumber);

      let firstColumn = level.boardSideLength;
      let lastColumn = 0;
      let firstRow = level.boardSideLength;
      let lastRow = 0;

      for (let row = 0; row < this.boardSideLength; row++) {
        for (let column = 0; column < this.boardSideLength; column++) {
          if (untrimmedShape[row * this.boardSideLength + column]) {
            if (column < firstColumn) {
              firstColumn = column;
            }
            if (row < firstRow) {
              firstRow = row;
            }
            if (column > lastColumn) {
              lastColumn = column;
            }
            if (row > lastRow) {
              lastRow = row;
            }
          }
        }
      }

      const trimmedShape: boolean[] = [];

      for (let row = firstRow; row <= lastRow; row++) {
        for (let column = firstColumn; column <= lastColumn; column++) {
          trimmedShape.push(untrimmedShape[row * this.boardSideLength + column]);
        }
      }

      this.pieces.push({
        height: lastRow - firstRow + 1,
        width: lastColumn - firstColumn + 1,
        shape: trimmedShape,
      });
    }
  }
}
