// CSES "Monsters" Multi-Source BFS
//
// Core idea:
//   monsterDist[r][c] = fewest steps any monster needs to reach cell (r,c)
//   playerDist[r][c]  = fewest steps the player needs to reach cell (r,c)
//
// A cell is SAFE if the player gets there STRICTLY before any monster.
// Unreachable cells use -1 (instead of Infinity).

const DIRS = [
  { r: -1, c: 0 }, // up
  { r:  1, c: 0 }, // down
  { r:  0, c: -1 }, // left
  { r:  0, c:  1 }, // right
];

// Standard BFS from one or more source cells.
// Returns a distance grid: dist[r][c] = steps from nearest source, or -1.
function bfs(grid, sources) {
  const ROWS = grid.length;
  const COLS = grid[0].length;
  const dist = Array.from({ length: ROWS }, () => Array(COLS).fill(-1));
  const queue = [];

  for (const src of sources) {
    dist[src.row][src.col] = 0;
    queue.push(src);
  }

  let head = 0;
  while (head < queue.length) {
    const { row, col } = queue[head++];
    for (const { r, c } of DIRS) {
      const nr = row + r, nc = col + c;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS
          && !grid[nr][nc].isWall && dist[nr][nc] === -1) {
        dist[nr][nc] = dist[row][col] + 1;
        queue.push({ row: nr, col: nc });
      }
    }
  }

  return dist;
}

// Compute monsterDist and playerDist for the current level.
export function computeSafeZone(grid, playerStart, monsters) {
  return {
    monsterDist: bfs(grid, monsters),
    playerDist:  bfs(grid, [playerStart]),
  };
}

// Is it safe for the player to step into (row, col) as their Nth move?
// Safe = player arrives strictly before any monster can.
export function isCellSafe(monsterDist, row, col, stepNumber) {
  const md = monsterDist[row][col];
  return md === -1 || stepNumber < md; // md === -1 means no monster can ever arrive
}

// Find the shortest safe escape path (BFS) from the player's current position.
// Returns an array of {row, col} moves (not including playerPos itself), or null.
export function findSafePath(grid, monsterDist, playerPos, currentStep) {
  const ROWS = grid.length;
  const COLS = grid[0].length;

  const dist   = Array.from({ length: ROWS }, () => Array(COLS).fill(-1));
  const parent = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  const queue  = [playerPos];
  dist[playerPos.row][playerPos.col] = 0;

  let head = 0;
  let exitCell = null;

  outer:
  while (head < queue.length) {
    const { row, col } = queue[head++];
    for (const { r, c } of DIRS) {
      const nr = row + r, nc = col + c;
      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) continue;
      if (grid[nr][nc].isWall || dist[nr][nc] !== -1) continue;

      // The player would arrive at (nr,nc) on step: currentStep + dist[row][col] + 1
      const arrivalStep = currentStep + dist[row][col] + 1;
      const md = monsterDist[nr][nc];
      if (md !== -1 && arrivalStep >= md) continue; // monster wins — skip

      dist[nr][nc] = dist[row][col] + 1;
      parent[nr][nc] = { row, col };

      if (grid[nr][nc].isExit) { exitCell = { row: nr, col: nc }; break outer; }
      queue.push({ row: nr, col: nc });
    }
  }

  if (!exitCell) return null;

  // Reconstruct path from exit back to start, then reverse
  const path = [];
  let curr = exitCell;
  while (parent[curr.row][curr.col] !== null) {
    path.push(curr);
    curr = parent[curr.row][curr.col];
  }
  return path.reverse(); // [first move, ..., exit cell]
}
