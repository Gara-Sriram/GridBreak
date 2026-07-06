// Level 6 — 6 Paths: top fence has cols 8 and 12, bottom has cols 8 and 12, sides have row 8 only.
// Total of 6 paths. 3 monsters patrol outside the fence.
// Flood fill zones are enabled by default to help players spot the safest of the 6 paths.
export const level6 = {
  playerStart: { row: 10, col: 12 },
  monsters: [
    { row: 2, col: 6 },
    { row: 2, col: 18 },
    { row: 17, col: 12 }
  ],
  walls: [
    // Top fence — gaps at cols 8, 12 (col 16 CLOSED)
    { row: 5, colStart: 6, colEnd: 7 },
    { row: 5, colStart: 9, colEnd: 11 },
    { row: 5, colStart: 13, colEnd: 18 },
    // Bottom fence — gaps at cols 8, 12 (col 16 CLOSED)
    { row: 14, colStart: 6, colEnd: 7 },
    { row: 14, colStart: 9, colEnd: 11 },
    { row: 14, colStart: 13, colEnd: 18 },
    // Left fence — gap at row 8 only
    { row: 6, col: 6 }, { row: 7, col: 6 },
    { col: 6, rowStart: 9, rowEnd: 13 },
    // Right fence — gap at row 8 only
    { row: 6, col: 18 }, { row: 7, col: 18 },
    { col: 18, rowStart: 9, rowEnd: 13 }
  ],
  movesLimit: 22,
  defaultToggles: { bfs: false, danger: false, zones: true, hint: false }
};
