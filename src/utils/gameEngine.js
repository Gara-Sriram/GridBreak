import { computeSafeZone, findSafePath } from '../algorithms/safeZoneBfs';

// Rebuild the grid with isSafe / isDangerous / isHint flags.
// Call this after every player move or toggle change.
export function buildGrid(grid, playerPos, monsters, showOverlay, monsterDist, showHint, stepCount) {
  const { playerDist } = computeSafeZone(grid, playerPos, monsters);

  // Step 1: stamp safe/dangerous overlay
  const withOverlay = grid.map((row, r) =>
    row.map((cell, c) => {
      let isSafe = false, isDangerous = false;

      if (showOverlay && !cell.isWall && !cell.isPlayer && !cell.isMonster) {
        const pd = playerDist[r][c];
        const md = monsterDist[r][c];
        if (pd !== -1) {
          isSafe      = md === -1 || pd < md; // no monster, or player faster
          isDangerous = !isSafe;
        }
      }

      return { ...cell, isSafe, isDangerous, isHint: false };
    })
  );

  // Step 2: stamp hint path on top
  if (!showHint) return { grid: withOverlay, hintMessage: '' };

  const path = findSafePath(withOverlay, monsterDist, playerPos, stepCount);
  if (!path) return { grid: withOverlay, hintMessage: 'No safe escape path exists!' };

  const withHint = withOverlay.map(row => row.map(cell => ({ ...cell })));
  for (const { row, col } of path) withHint[row][col].isHint = true;

  return {
    grid: withHint,
    hintMessage: `Optimal path: ${path.length} move${path.length === 1 ? '' : 's'} to escape`,
  };
}

// Compute monsterDist once at level load (monsters never move, so this never changes).
// We only need the monster half of computeSafeZone.
export function computeMonsterDist(grid, playerStart, monsters) {
  return computeSafeZone(grid, playerStart, monsters).monsterDist;
}
