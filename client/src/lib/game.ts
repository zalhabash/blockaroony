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
    this.boardSideLength = level.boardSideLength;
    this.pieces = [];

    const pieceCount = Math.max(...level.solution);

    for (let pieceNumber = 1; pieceNumber <= pieceCount; pieceNumber++) {
      const untrimmedPiece: boolean[] = [];
      for (const cell of level.solution) {
        if (cell === pieceNumber) {
          untrimmedPiece.push(true);
        } else {
          untrimmedPiece.push(false);
        }
      }

      let firstColumn = 0;
      let lastColumn = level.boardSideLength;
      let firstRow = 0;
      let lastRow = level.boardSideLength;

      findFirstColumn: for (let column = 0; column < this.boardSideLength; column++) {
        for (let row = 0; row < this.boardSideLength; row++) {
          if (untrimmedPiece[row * this.boardSideLength + column] === true) {
            firstColumn = column;
            break findFirstColumn;
          }
        }
      }

      findLastColumn: for (let column = this.boardSideLength - 1; column >= 0; column--) {
        for (let row = 0; row < this.boardSideLength; row++) {
          if (untrimmedPiece[row * this.boardSideLength + column] === true) {
            lastColumn = column;
            break findLastColumn;
          }
        }
      }

      findFirstRow: for (let row = 0; row < this.boardSideLength; row++) {
        for (let column = 0; column < this.boardSideLength; column++) {
          if (untrimmedPiece[row * this.boardSideLength + column] === true) {
            firstRow = row;
            break findFirstRow;
          }
        }
      }

      findLastRow: for (let row = this.boardSideLength - 1; row >= 0; row--) {
        for (let column = 0; column < this.boardSideLength; column++) {
          if (untrimmedPiece[row * this.boardSideLength + column] === true) {
            lastRow = row;
            break findLastRow;
          }
        }
      }

      const trimmedPiece: boolean[] = [];
      for (let cell = 0; cell < untrimmedPiece.length; cell++) {
        if (
          cell % this.boardSideLength >= firstColumn &&
          cell % this.boardSideLength <= lastColumn &&
          Math.floor(cell / this.boardSideLength) >= firstRow &&
          Math.floor(cell / this.boardSideLength) <= lastRow
        ) {
          trimmedPiece.push(untrimmedPiece[cell]);
        }
      }

      this.pieces.push({
        height: lastRow - firstRow + 1,
        width: lastColumn - firstColumn + 1,
        shape: trimmedPiece,
      });
    }
  }
}
