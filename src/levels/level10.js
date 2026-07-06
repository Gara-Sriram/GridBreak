// Level 10 — 2 Paths only. Both sides closed. Tightest maze.
// Gaps: top(col 9) only, bottom(col 15) only. Left and right CLOSED.
// Inner L-wall: horizontal bar row 9 cols 10-15, vertical wall col 11 rows 10-12.
//
// The L-wall makes it IMPOSSIBLE to go straight left or straight up from start:
//  - (10,11) is a wall (col 11 at row 10) — can't go left
//  - (9,12)  is a wall (row 9 at col 12) — can't go straight up
//
// ONLY viable escape — bottom gap (14,15) via RIGHT then DOWN:
//  → RIGHT 3 to (10,15) [col 11 wall doesn't block right of col 12] 
//  ↓ DOWN 4  to (14,15) [gap in bottom fence]
//  ↓ DOWN 5  to border
//  Total: 12 steps. Player wins by 3 vs closest monster (17,22) at 10 steps from gap.
//
// Top escape exists too but requires: RIGHT 3 → DOWN 3 → LEFT 6 → UP 8 = 20+ steps.
// That path exceeds movesLimit. Bottom is the intended route.
//
// 5 monsters surround from all angles. You have only ONE safe path.
export const level10 = {
  playerStart: { row: 10, col: 12 },
  monsters: [
    { row: 2, col: 2 },
    { row: 2, col: 22 },
    { row: 17, col: 2 },
    { row: 17, col: 22 },
    { row: 4, col: 18 }     // pressures from top-right, 15+ steps from (14,15)
  ],
  walls: [
    // Top fence (row 5) — gap at col 9 only
    { row: 5, colStart: 6, colEnd: 8 },
    { row: 5, colStart: 10, colEnd: 18 },
    // Bottom fence (row 14) — gap at col 15 only
    { row: 14, colStart: 6, colEnd: 14 },
    { row: 14, colStart: 16, colEnd: 18 },
    // Left fence (col 6, rows 6-13) — CLOSED
    { col: 6, rowStart: 6, rowEnd: 13 },
    // Right fence (col 18, rows 6-13) — CLOSED
    { col: 18, rowStart: 6, rowEnd: 13 },
    // Inner L-wall — horizontal bar seals direct upward path
    { row: 9, colStart: 10, colEnd: 15 },
    // Vertical wall blocks leftward move at start position
    { col: 11, rowStart: 10, rowEnd: 12 }
  ],
  movesLimit: 18,
  defaultToggles: { bfs: false, danger: false, zones: false, hint: true }
};
