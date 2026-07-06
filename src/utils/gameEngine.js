import { bfs } from '../algorithms/bfs';
import { multisourceBfs } from '../algorithms/multisourceBfs';
import { floodFill } from '../algorithms/floodFill';
import { dpEscape } from '../algorithms/dpEscape';

export const updateGridDanger = (currentGrid, monsters, showDanger) => {
  const dangerLevels = multisourceBfs(currentGrid, monsters);
  return currentGrid.map((r, rIdx) => r.map((c, cIdx) => ({
    ...c,
    dangerLevel: showDanger ? dangerLevels[rIdx][cIdx] : 0
  })));
};

export const updateGridZones = (currentGrid, player, monsters, show) => {
  if (!show) {
    return currentGrid.map(r => r.map(c => ({ ...c, isPlayerZone: false, isMonsterZone: false })));
  }
  const { playerZone, monsterZone } = floodFill(currentGrid, player, monsters);
  return currentGrid.map((r, rIdx) => r.map((c, cIdx) => {
    const key = `${rIdx},${cIdx}`;
    return {
      ...c,
      isPlayerZone: playerZone.has(key),
      isMonsterZone: monsterZone.has(key)
    };
  }));
};

export const moveMonstersInstant = (nextGrid, monsterPositions, nextPlayerPos) => {
  const finalGrid = nextGrid.map(r => r.map(c => ({ ...c, isPath: false })));
  const nextMonsters = monsterPositions.map(mPos => {
    const { path } = bfs(finalGrid, mPos, nextPlayerPos);
    if (path && path.length > 0) {
      finalGrid[mPos.row][mPos.col].isMonster = false;
      finalGrid[path[0].row][path[0].col].isMonster = true;
      return path[0];
    }
    return mPos;
  });
  return { nextMonsters, finalGrid };
};

export const calculateDPPath = (grid, playerPos, monsters, movesLeft, showHint) => {
  const clearedGrid = grid.map(r => r.map(c => ({ ...c, isPath: false })));
  if (!showHint) return { grid: clearedGrid, message: '' };

  const path = dpEscape(clearedGrid, playerPos, monsters, movesLeft);
  if (path) {
    path.forEach(cell => {
      clearedGrid[cell.row][cell.col].isPath = true;
    });
    return { grid: clearedGrid, message: `Optimal path found: ${path.length} moves` };
  }
  return { grid: clearedGrid, message: 'No escape possible' };
};
