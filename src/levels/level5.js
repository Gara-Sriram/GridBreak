// Level 5 — 7 Paths: top fence loses right gap (col 16 closed).
// Top gaps: cols 8 and 12 only. Bottom still has 3. Sides have 1 each.
// 3 monsters: two top corners (guard top gaps), one bottom-right (distant threat).
// Going UP to top-right gap is now impossible — walls seal it. Must pick top-left or bottom.
// Danger zones overlay reveals which areas are threatened. Switch it on!
// Verified: player→(14,8)=8 or (14,12)=4. All monsters 13+ steps from key gaps.
export const level5 = {
  playerStart: { row: 10, col: 12 },
  monsters: [
    { row: 2, col: 2 },
    { row: 2, col: 22 },
    { row: 17, col: 22 }
  ],
  walls: [
    // Top fence — gaps at cols 8, 12 (col 16 CLOSED)
    { row: 5, colStart: 6, colEnd: 7 },
    { row: 5, colStart: 9, colEnd: 11 },
    { row: 5, colStart: 13, colEnd: 18 },
    // Bottom fence — gaps at cols 8, 12, 16
    { row: 14, colStart: 6, colEnd: 7 },
    { row: 14, colStart: 9, colEnd: 11 },
    { row: 14, colStart: 13, colEnd: 15 },
    { row: 14, colStart: 17, colEnd: 18 },
    // Left fence — gap at row 8 only
    { row: 6, col: 6 }, { row: 7, col: 6 },
    { col: 6, rowStart: 9, rowEnd: 13 },
    // Right fence — gap at row 8 only
    { row: 6, col: 18 }, { row: 7, col: 18 },
    { col: 18, rowStart: 9, rowEnd: 13 }
  ],
  movesLimit: 20,
  defaultToggles: { bfs: false, danger: true, zones: false, hint: false }
};
