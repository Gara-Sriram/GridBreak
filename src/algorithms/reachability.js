// Returns true if player can reach any exit cell without passing through monster danger zones
export function canReachExit(grid, playerPos) {
  const ROWS = grid.length;
  const COLS = grid[0].length;

  const queue = [playerPos];
  const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  visited[playerPos.row][playerPos.col] = true;

  while (queue.length > 0) {
    const { row, col } = queue.shift();

    if (grid[row][col].isExit) {
      return true;
    }

    const dirs = [
      { r: -1, c: 0 }, { r: 1, c: 0 },
      { r: 0, c: -1 }, { r: 0, c: 1 }
    ];

    for (const dir of dirs) {
      const nr = row + dir.r;
      const nc = col + dir.c;

      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
        const cell = grid[nr][nc];
        
        // Safe path: cell is not a wall, not visited, and either dangerLevel is 0 or it is an exit cell
        if (!cell.isWall && !visited[nr][nc] && (cell.dangerLevel === 0 || cell.isExit)) {
          visited[nr][nc] = true;
          queue.push({ row: nr, col: nc });
        }
      }
    }
  }

  return false;
}
