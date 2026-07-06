// Level 1 — Open Arena: no inner fence, maximum paths.
// ALL border cells glow gold. Player can escape in any direction.
// 1 monster far away in bottom-right corner. Just pick any direction and run.
// Lesson: borders = exits. Learn to move quickly toward them.
export const level1 = {
  playerStart: { row: 10, col: 12 },
  monsters: [{ row: 17, col: 22 }],
  walls: [],
  movesLimit: 20,
  defaultToggles: { bfs: true, danger: false, zones: false, hint: false }
};
