// Returns path from monsterPos to playerPos using BFS shortest path
export function bfs(grid, monsterPos, playerPos) {
  const ROWS = grid.length;
  const COLS = grid[0].length;
  const queue = [monsterPos];
  const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  const parent = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

  visited[monsterPos.row][monsterPos.col] = true;
  const frontiersByLevel = [];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentFrontier = [];

    for (let i = 0; i < levelSize; i++) {
      const curr = queue.shift();

      if (curr.row === playerPos.row && curr.col === playerPos.col) {
        const path = [];
        let currNode = curr;
        while (currNode !== null && (currNode.row !== monsterPos.row || currNode.col !== monsterPos.col)) {
          path.push({ row: currNode.row, col: currNode.col });
          currNode = parent[currNode.row][currNode.col];
        }
        path.reverse();
        return { path, frontiersByLevel };
      }

      const dirs = [
        { r: -1, c: 0 }, { r: 1, c: 0 },
        { r: 0, c: -1 }, { r: 0, c: 1 }
      ];

      for (const dir of dirs) {
        const nr = curr.row + dir.r;
        const nc = curr.col + dir.c;

        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
          if (!grid[nr][nc].isWall && !visited[nr][nc]) {
            visited[nr][nc] = true;
            parent[nr][nc] = curr;
            const nextNode = { row: nr, col: nc };
            queue.push(nextNode);
            currentFrontier.push(nextNode);
          }
        }
      }
    }
    if (currentFrontier.length > 0) {
      frontiersByLevel.push(currentFrontier);
    }
  }

  return { path: [], frontiersByLevel };
}
