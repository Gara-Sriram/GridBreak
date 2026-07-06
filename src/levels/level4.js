// Level 4 — 8 Paths: left fence also loses row 12 gap (both sides now single-gap).
// Left fence: gap at row 8 only. Right fence: gap at row 8 only.
// Top/bottom still have 3 gaps each. 2 monsters — one top-left, one bottom-right.
// To escape LEFT or RIGHT you must navigate to row 8 specifically — not any row.
// Lesson: side exits are now harder to find. Bottom exits are still easiest.
// Verified: player→(14,8)=8 steps or (14,12)=4 steps. Monsters 13+ steps away.
export const level4 = {
  playerStart: { row: 10, col: 12 },
  monsters: [
    { row: 2, col: 2 },
    { row: 17, col: 22 }
  ],
  walls: [
    // Top fence — gaps at cols 8, 12, 16
    { row: 5, colStart: 6, colEnd: 7 },
    { row: 5, colStart: 9, colEnd: 11 },
    { row: 5, colStart: 13, colEnd: 15 },
    { row: 5, colStart: 17, colEnd: 18 },
    // Bottom fence — gaps at cols 8, 12, 16
    { row: 14, colStart: 6, colEnd: 7 },
    { row: 14, colStart: 9, colEnd: 11 },
    { row: 14, colStart: 13, colEnd: 15 },
    { row: 14, colStart: 17, colEnd: 18 },
    // Left fence — gap at row 8 ONLY
    { row: 6, col: 6 }, { row: 7, col: 6 },
    { col: 6, rowStart: 9, rowEnd: 13 },
    // Right fence — gap at row 8 ONLY
    { row: 6, col: 18 }, { row: 7, col: 18 },
    { col: 18, rowStart: 9, rowEnd: 13 }
  ],
  movesLimit: 20,
  defaultToggles: { bfs: true, danger: false, zones: false, hint: false }
};
