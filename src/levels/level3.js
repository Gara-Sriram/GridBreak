// Level 3 — 9 Paths: right fence loses one gap (row 12 gap closed).
// Right fence now has only gap at row 8. All others same as level 2.
// 2 monsters in top corners. They approach through the top gaps if player hesitates.
// Player still has 9 choices — find the nearest unguarded gap and move.
// Verified: player→(14,12)=4 steps, nearest monster→(14,12)=22+ steps.
export const level3 = {
  playerStart: { row: 10, col: 12 },
  monsters: [
    { row: 2, col: 22 },
    { row: 2, col: 2 }
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
    // Left fence — gaps at rows 8, 12
    { row: 6, col: 6 }, { row: 7, col: 6 },
    { col: 6, rowStart: 9, rowEnd: 11 },
    { row: 13, col: 6 },
    // Right fence — gap at row 8 ONLY (row 12 closed)
    { row: 6, col: 18 }, { row: 7, col: 18 },
    { col: 18, rowStart: 9, rowEnd: 13 }
  ],
  movesLimit: 20,
  defaultToggles: { bfs: true, danger: false, zones: false, hint: false }
};
