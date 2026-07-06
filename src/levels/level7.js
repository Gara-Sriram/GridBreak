// Level 7 — 5 Paths, non-straight required.
// Outer fence (rows 5-14, cols 6-18) has gaps at: top(col 9, col 15), bottom(col 9, col 15),
// left(row 9). Right side is fully closed.
// Inner bar at row 9, cols 11-13 blocks straight-up movement from center.
//
// Required paths:
//  ↙ LEFT 3 → DOWN 4  to reach bottom-left gap at (14,9)   = 12 steps total
//  → RIGHT 3 → DOWN 4 to reach bottom-right gap at (14,15) = 12 steps total
//  ↙ LEFT 3 → UP 5    to reach top-left gap at (5,9)       = 12 steps total
//
// 3 monsters in corners — all 10+ steps from nearest gap. Player wins.
export const level7 = {
  playerStart: { row: 10, col: 12 },
  monsters: [
    { row: 2, col: 2 },
    { row: 2, col: 22 },
    { row: 17, col: 2 }
  ],
  walls: [
    // Top fence (row 5) — gaps at col 9 and col 15
    { row: 5, colStart: 6, colEnd: 8 },
    { row: 5, colStart: 10, colEnd: 14 },
    { row: 5, colStart: 16, colEnd: 18 },
    // Bottom fence (row 14) — gaps at col 9 and col 15
    { row: 14, colStart: 6, colEnd: 8 },
    { row: 14, colStart: 10, colEnd: 14 },
    { row: 14, colStart: 16, colEnd: 18 },
    // Left fence (col 6, rows 6-13) — gap at row 9
    { col: 6, rowStart: 6, rowEnd: 8 },
    { col: 6, rowStart: 10, rowEnd: 13 },
    // Right fence (col 18, rows 6-13) — CLOSED
    { col: 18, rowStart: 6, rowEnd: 13 },
    // Inner bar at row 9, cols 11-13 — blocks straight up from center
    { row: 9, colStart: 11, colEnd: 13 }
  ],
  movesLimit: 22,
  defaultToggles: { bfs: false, danger: false, zones: true, hint: false }
};
