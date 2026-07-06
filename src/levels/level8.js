// Level 8 — 4 Paths, non-straight required.
// Gaps: top(col 9), bottom(col 15), left(row 9), right(row 9).
// Top and bottom gaps are now on OPPOSITE sides — top-left, bottom-right.
// Inner bar at row 9, cols 10-14 blocks all straight-up movement from center.
//
// Required paths (no straight lines):
//  ↙ LEFT 3 → UP 5    to reach top gap at (5,9)             = 12 steps to border
//  → RIGHT 3 → DOWN 4 to reach bottom gap at (14,15)        = 12 steps to border
//  ↙ LEFT 3 → UP 1    to reach left gap at (9,6) via col 9  = 13 steps to border
//  → RIGHT 6 → UP 1   to reach right gap at (9,18)          = 13 steps to border
//
// 4 corner monsters — all 10+ steps from bottom-right gap. Player wins.
export const level8 = {
  playerStart: { row: 10, col: 12 },
  monsters: [
    { row: 2, col: 2 },
    { row: 2, col: 22 },
    { row: 17, col: 2 },
    { row: 17, col: 22 }
  ],
  walls: [
    // Top fence (row 5) — gap at col 9 only
    { row: 5, colStart: 6, colEnd: 8 },
    { row: 5, colStart: 10, colEnd: 18 },
    // Bottom fence (row 14) — gap at col 15 only
    { row: 14, colStart: 6, colEnd: 14 },
    { row: 14, colStart: 16, colEnd: 18 },
    // Left fence (col 6, rows 6-13) — gap at row 9
    { col: 6, rowStart: 6, rowEnd: 8 },
    { col: 6, rowStart: 10, rowEnd: 13 },
    // Right fence (col 18, rows 6-13) — gap at row 9
    { col: 18, rowStart: 6, rowEnd: 8 },
    { col: 18, rowStart: 10, rowEnd: 13 },
    // Inner bar at row 9, cols 10-14 — forces player left or right before going up
    { row: 9, colStart: 10, colEnd: 14 }
  ],
  movesLimit: 20,
  defaultToggles: { bfs: false, danger: false, zones: false, hint: true }
};
