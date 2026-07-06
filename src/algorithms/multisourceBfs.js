// Returns danger level (1,2,3) for every cell based on distance from nearest monster
export function multisourceBfs(grid, monsterPositions) {
  const ROWS = grid.length;
  const COLS = grid[0].length;
  const danger = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  const queue = [];

  for (const m of monsterPositions) {
    queue.push({ row: m.row, col: m.col, dist: 0 });
    visited[m.row][m.col] = true;
  }

  while (queue.length > 0) {
    const { row, col, dist } = queue.shift();

    if (dist > 0 && dist <= 3) {
      danger[row][col] = dist;
    }

    if (dist >= 3) continue;

    const dirs = [
      { r: -1, c: 0 }, { r: 1, c: 0 },
      { r: 0, c: -1 }, { r: 0, c: 1 }
    ];

    for (const dir of dirs) {
      const nr = row + dir.r;
      const nc = col + dir.c;

      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
        if (!grid[nr][nc].isWall && !visited[nr][nc]) {
          visited[nr][nc] = true;
          queue.push({ row: nr, col: nc, dist: dist + 1 });
        }
      }
    }
  }

  return danger;
}
