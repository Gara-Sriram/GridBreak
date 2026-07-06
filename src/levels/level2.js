// Level 2 — 10 Paths: inner fence with 10 gaps spread around all 4 sides.
// Gaps at: Top(col 8, 12, 16) Bottom(col 8, 12, 16) Left(row 8, 12) Right(row 8, 12)
// Player must pass through ONE gap to exit the fence, then reach the border.
// 1 monster in top-right corner (far, non-threatening). Many paths remain open.
// Lesson: the fence has many exits — choose the nearest one and go.
// Verified: player→nearest gap(14,12)=4 steps, monster→(14,12)=22+ steps.
export const level2 = {
  playerStart: { row: 10, col: 12 },
  monsters: [{ row: 2, col: 22 }],
  walls: [
    // Top fence (row 5) — gaps at cols 8, 12, 16
    { row: 5, colStart: 6, colEnd: 7 },
    { row: 5, colStart: 9, colEnd: 11 },
    { row: 5, colStart: 13, colEnd: 15 },
    { row: 5, colStart: 17, colEnd: 18 },
    // Bottom fence (row 14) — gaps at cols 8, 12, 16
    { row: 14, colStart: 6, colEnd: 7 },
    { row: 14, colStart: 9, colEnd: 11 },
    { row: 14, colStart: 13, colEnd: 15 },
    { row: 14, colStart: 17, colEnd: 18 },
    // Left fence (col 6, rows 6-13) — gaps at rows 8, 12
    { row: 6, col: 6 }, { row: 7, col: 6 },
    { col: 6, rowStart: 9, rowEnd: 11 },
    { row: 13, col: 6 },
    // Right fence (col 18, rows 6-13) — gaps at rows 8, 12
    { row: 6, col: 18 }, { row: 7, col: 18 },
    { col: 18, rowStart: 9, rowEnd: 11 },
    { row: 13, col: 18 }
  ],
  movesLimit: 20,
  defaultToggles: { bfs: true, danger: false, zones: false, hint: false }
};
