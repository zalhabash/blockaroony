import { describe, expect, it } from "vitest";
import { Game, type Level } from "./game";

describe("Game", () => {
  it("should create a single piece in the constructor", () => {
    const level: Level = {
      boardSideLength: 2,
      solution: [1, 1, 1, 1],
    };
    const game = new Game(level);

    expect(game.pieces).toStrictEqual([
      {
        height: 2,
        width: 2,
        shape: [true, true, true, true],
      },
    ]);
  });

  it("should create two rectangular pieces in the constructor", () => {
    const level: Level = {
      boardSideLength: 2,
      solution: [1, 1, 2, 2],
    };
    const game = new Game(level);

    expect(game.pieces).toStrictEqual([
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
      solution: [1, 1, 1, 2],
    };
    const game = new Game(level);

    expect(game.pieces).toStrictEqual([
      {
        height: 2,
        width: 2,
        shape: [true, true, true, false],
      },
      {
        height: 1,
        width: 1,
        shape: [true],
      },
    ]);
  });
});
