// Returns which cells belong to player zone vs monster zone
export function floodFill(grid, playerPos, monsterPositions) {
  const ROWS = grid.length;
  const COLS = grid[0].length;
  const playerDist = Array.from({ length: ROWS }, () => Array(COLS).fill(Infinity));
  const monsterDist = Array.from({ length: ROWS }, () => Array(COLS).fill(Infinity));

  const runBfs = (sources, dists) => {
    const q = [];
    sources.forEach(s => {
      q.push({ r: s.row, c: s.col });
      dists[s.row][s.col] = 0;
    });
    while (q.length > 0) {
      const { r, c } = q.shift();
      const dirs = [{r:-1,c:0},{r:1,c:0},{r:0,c:-1},{r:0,c:1}];
      for (const d of dirs) {
        const nr = r + d.r, nc = c + d.c;
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !grid[nr][nc].isWall) {
          if (dists[nr][nc] === Infinity) {
            dists[nr][nc] = dists[r][c] + 1;
            q.push({ r: nr, c: nc });
          }
        }
      }
    }
  };

  runBfs([playerPos], playerDist);
  runBfs(monsterPositions, monsterDist);

  const playerZone = new Set();
  const monsterZone = new Set();

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c].isWall) continue;
      const pd = playerDist[r][c];
      const md = monsterDist[r][c];
      if (pd < Infinity || md < Infinity) {
        const key = `${r},${c}`;
        if (pd < md) playerZone.add(key);
        else monsterZone.add(key);
      }
    }
  }

  return { playerZone, monsterZone };
}
