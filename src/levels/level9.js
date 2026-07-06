// Level 9 — 3 Paths, maze navigation required.
// Gaps: top(col 9), bottom(col 15), left(row 9). Right is CLOSED.
// Inner L-wall: horizontal bar at row 9 (cols 10-14) + vertical wall col 13 (rows 10-12).
//
// The vertical wall at col 13 blocks rightward movement at rows 10-12.
// Player CANNOT go right from center until reaching row 13 or above row 9.
//
// Required path to bottom gap (14,15):
//  DOWN 3 to row 13 → RIGHT 3 to col 15 → DOWN 1 to gap = 7 steps + 5 = 12 total
//  (player must go down PAST the col-13 wall before turning right)
//
// Required path to top gap (5,9):
//  LEFT 3 to col 9 → UP 5 to gap = 8 steps + 4 = 12 total
//
// 4 corner monsters — all 10+ steps from either gap. Player wins by 2-3 steps.
export const level9 = {
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
    // Right fence (col 18, rows 6-13) — CLOSED
    { col: 18, rowStart: 6, rowEnd: 13 },
    // Inner L-wall — horizontal bar blocks straight up
    { row: 9, colStart: 10, colEnd: 14 },
    // Vertical section blocks rightward movement at rows 10-12
    { col: 13, rowStart: 10, rowEnd: 12 }
  ],
  movesLimit: 18,
  defaultToggles: { bfs: false, danger: false, zones: false, hint: true }
};
