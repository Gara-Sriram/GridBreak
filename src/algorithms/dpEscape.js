import { bfs as singleBfs } from './bfs';

// Returns optimal sequence of moves for player to reach any border exit cell in minimum moves
export function dpEscape(grid, playerPos, monsterPositions, movesLeft) {
  const ROWS = grid.length;
  const COLS = grid[0].length;

  const queue = [{
    pPos: playerPos,
    mPositions: monsterPositions,
    t: 0,
    path: []
  }];

  const visited = new Set();
  const getVisitedKey = (p, t) => `${p.row},${p.col},${t}`;
  visited.add(getVisitedKey(playerPos, 0));

  while (queue.length > 0) {
    const { pPos, mPositions, t, path } = queue.shift();

    if (grid[pPos.row][pPos.col].isExit) {
      return path;
    }

    if (t >= movesLeft) continue;

    const dirs = [
      { r: -1, c: 0 }, { r: 1, c: 0 },
      { r: 0, c: -1 }, { r: 0, c: 1 }
    ];

    for (const dir of dirs) {
      const nr = pPos.row + dir.r;
      const nc = pPos.col + dir.c;

      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) continue;
      if (grid[nr][nc].isWall) continue;

      if (mPositions.some(m => m.row === nr && m.col === nc)) continue;

      const tempGrid = grid.map(r => r.map(c => ({ ...c, isPlayer: false, isMonster: false })));
      tempGrid[nr][nc].isPlayer = true;
      mPositions.forEach(m => {
        tempGrid[m.row][m.col].isMonster = true;
      });

      let nextMonsters = [];
      let caught = false;

      for (const m of mPositions) {
        const { path: mPath } = singleBfs(tempGrid, m, { row: nr, col: nc });
        let nextMPos = m;
        if (mPath && mPath.length > 0) {
          nextMPos = mPath[0];
        }
        if (nextMPos.row === nr && nextMPos.col === nc) {
          caught = true;
          break;
        }
        nextMonsters.push(nextMPos);
      }

      if (caught) continue;

      const vKey = getVisitedKey({ row: nr, col: nc }, t + 1);
      if (!visited.has(vKey)) {
        visited.add(vKey);
        queue.push({
          pPos: { row: nr, col: nc },
          mPositions: nextMonsters,
          t: t + 1,
          path: [...path, { row: nr, col: nc }]
        });
      }
    }
  }

  return null;
}
