import { describe, expect, it } from "vitest";
import { Game, type Level, type Piece } from "./game";

describe("Game", () => {
  it("should create a single piece in the constructor", () => {
    const level: Level = {
      boardSideLength: 2,
      solution: [
        [1, 1],
        [1, 1],
      ].flat(),
    };
    const game = new Game(level);

    expect(game.pieces).toStrictEqual<Piece[]>([
      {
        height: 2,
        width: 2,
        shape: [
          [true, true],
          [true, true],
        ].flat(),
      },
    ]);
  });

  it("should create two rectangular pieces in the constructor", () => {
    const level: Level = {
      boardSideLength: 2,
      solution: [
        [1, 1],
        [2, 2],
      ].flat(),
    };
    const game = new Game(level);

    expect(game.pieces).toStrictEqual<Piece[]>([
      {
        height: 1,
        width: 2,
        shape: [true, true],
      },
      {
        height: 1,
        width: 2,
        shape: [true, true],
      },
    ]);
  });

  it("should create two non-rectangular pieces in the constructor", () => {
    const level: Level = {
      boardSideLength: 2,
      solution: [
        [1, 1],
        [1, 2],
      ].flat(),
    };
    const game = new Game(level);

    expect(game.pieces).toStrictEqual<Piece[]>([
      {
        height: 2,
        width: 2,
        shape: [
          [true, true],
          [true, false],
        ].flat(),
      },
      {
        height: 1,
        width: 1,
        shape: [true],
      },
    ]);
  });

  it("should create two pieces that are each made of diagonal cells in the constructor", () => {
    const level: Level = {
      boardSideLength: 2,
      solution: [
        [1, 2],
        [2, 1],
      ].flat(),
    };
    const game = new Game(level);

    expect(game.pieces).toStrictEqual<Piece[]>([
      {
        height: 2,
        width: 2,
        shape: [
          [true, false],
          [false, true],
        ].flat(),
      },
      {
        height: 2,
        width: 2,
        shape: [
          [false, true],
          [true, false],
        ].flat(),
      },
    ]);
  });

  it("should create a piece two that is located before piece one on the board in the constructor", () => {
    const level: Level = {
      boardSideLength: 3,
      solution: [
        [2, 1, 1],
        [2, 1, 1],
        [2, 1, 1],
      ].flat(),
    };
    const game = new Game(level);

    expect(game.pieces).toStrictEqual<Piece[]>([
      {
        height: 3,
        width: 2,
        shape: [
          [true, true],
          [true, true],
          [true, true],
        ].flat(),
      },
      {
        height: 3,
        width: 1,
        shape: [
          true, //
          true,
          true,
        ],
      },
    ]);
  });

  it("should create a piece that doesn't touch any of the edges of the board in the constructor", () => {
    const level: Level = {
      boardSideLength: 4,
      solution: [
        [1, 1, 1, 1],
        [1, 2, 2, 1],
        [1, 2, 1, 1],
        [1, 1, 1, 1],
      ].flat(),
    };
    const game = new Game(level);

    expect(game.pieces).toStrictEqual<Piece[]>([
      {
        height: 4,
        width: 4,
        shape: [
          [true, true, true, true],
          [true, false, false, true],
          [true, false, true, true],
          [true, true, true, true],
        ].flat(),
      },
      {
        height: 2,
        width: 2,
        shape: [
          [true, true],
          [true, false],
        ].flat(),
      },
    ]);
  });

  it("should create a piece on the left edge of the board in the constructor", () => {
    const level: Level = {
      boardSideLength: 4,
      solution: [
        [1, 2, 2, 2],
        [1, 2, 2, 2],
        [1, 2, 2, 2],
        [1, 2, 2, 2],
      ].flat(),
    };
    const game = new Game(level);

    expect(game.pieces).toStrictEqual<Piece[]>([
      {
        height: 4,
        width: 1,
        shape: [
          true, //
          true,
          true,
          true,
        ],
      },
      {
        height: 4,
        width: 3,
        shape: [
          [true, true, true],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ].flat(),
      },
    ]);
  });

  it("should create a piece on the right edge of the board in the constructor", () => {
    const level: Level = {
      boardSideLength: 4,
      solution: [
        [1, 1, 1, 2],
        [1, 1, 1, 2],
        [1, 1, 1, 2],
        [1, 1, 1, 2],
      ].flat(),
    };
    const game = new Game(level);

    expect(game.pieces).toStrictEqual<Piece[]>([
      {
        height: 4,
        width: 3,
        shape: [
          [true, true, true],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ].flat(),
      },
      {
        height: 4,
        width: 1,
        shape: [
          true, //
          true,
          true,
          true,
        ],
      },
    ]);
  });

  it("should create a piece on the top edge of the board in the constructor", () => {
    const level: Level = {
      boardSideLength: 4,
      solution: [
        [1, 1, 1, 1],
        [2, 2, 2, 2],
        [2, 2, 2, 2],
        [2, 2, 2, 2],
      ].flat(),
    };
    const game = new Game(level);

    expect(game.pieces).toStrictEqual<Piece[]>([
      {
        height: 1,
        width: 4,
        shape: [true, true, true, true],
      },
      {
        height: 3,
        width: 4,
        shape: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ].flat(),
      },
    ]);
  });

  it("should create a piece on the bottom edge of the board in the constructor", () => {
    const level: Level = {
      boardSideLength: 4,
      solution: [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [2, 2, 2, 2],
      ].flat(),
    };
    const game = new Game(level);

    expect(game.pieces).toStrictEqual<Piece[]>([
      {
        height: 3,
        width: 4,
        shape: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ].flat(),
      },
      {
        height: 1,
        width: 4,
        shape: [true, true, true, true],
      },
    ]);
  });

  it("should create a piece on the left and top edges of the board in the constructor", () => {
    const level: Level = {
      boardSideLength: 4,
      solution: [
        [1, 1, 1, 1],
        [1, 2, 2, 2],
        [1, 2, 2, 2],
        [1, 2, 2, 2],
      ].flat(),
    };
    const game = new Game(level);

    expect(game.pieces).toStrictEqual<Piece[]>([
      {
        height: 4,
        width: 4,
        shape: [
          [true, true, true, true],
          [true, false, false, false],
          [true, false, false, false],
          [true, false, false, false],
        ].flat(),
      },
      {
        height: 3,
        width: 3,
        shape: [
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ].flat(),
      },
    ]);
  });

  it("should create many small pieces that are differently shaped from a larger board in the constructor", () => {
    const level: Level = {
      boardSideLength: 6,
      solution: [
        [1, 2, 2, 3, 3, 4],
        [5, 5, 6, 6, 4, 4],
        [1, 5, 6, 6, 4, 4],
        [7, 8, 1, 6, 9, 3],
        [8, 7, 10, 6, 9, 11],
        [11, 8, 10, 10, 9, 11],
      ].flat(),
    };
    const game = new Game(level);

    expect(game.pieces).toStrictEqual<Piece[]>([
      {
        // 1
        height: 4,
        width: 3,
        shape: [
          [true, false, false],
          [false, false, false],
          [true, false, false],
          [false, false, true],
        ].flat(),
      },
      {
        // 2
        height: 1,
        width: 2,
        shape: [true, true],
      },
      {
        // 3
        height: 4,
        width: 3,
        shape: [
          [true, true, false],
          [false, false, false],
          [false, false, false],
          [false, false, true],
        ].flat(),
      },
      {
        // 4
        height: 3,
        width: 2,
        shape: [
          [false, true],
          [true, true],
          [true, true],
        ].flat(),
      },
      {
        // 5
        height: 2,
        width: 2,
        shape: [
          [true, true],
          [false, true],
        ].flat(),
      },
      {
        // 6
        height: 4,
        width: 2,
        shape: [
          [true, true],
          [true, true],
          [false, true],
          [false, true],
        ].flat(),
      },
      {
        // 7
        height: 2,
        width: 2,
        shape: [
          [true, false],
          [false, true],
        ].flat(),
      },
      {
        // 8
        height: 3,
        width: 2,
        shape: [
          [false, true],
          [true, false],
          [false, true],
        ].flat(),
      },
      {
        // 9
        height: 3,
        width: 1,
        shape: [
          true, //
          true,
          true,
        ],
      },
      {
        // 10
        height: 2,
        width: 2,
        shape: [
          [true, false],
          [true, true],
        ].flat(),
      },
      {
        // 11
        height: 2,
        width: 6,
        shape: [
          [false, false, false, false, false, true],
          [true, false, false, false, false, true],
        ].flat(),
      },
    ]);
  });
});
