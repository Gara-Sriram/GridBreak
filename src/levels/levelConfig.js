import { level1 } from './level1';
import { level2 } from './level2';
import { level3 } from './level3';
import { level4 } from './level4';
import { level5 } from './level5';
import { level6 } from './level6';
import { level7 } from './level7';
import { level8 } from './level8';
import { level9 } from './level9';
import { level10 } from './level10';

export const LEVELS = [
  level1, level2, level3, level4, level5,
  level6, level7, level8, level9, level10
];

export const ROWS = 20;
export const COLS = 25;

export const createInitialGridForLevel = (levelConfig) => {
  const grid = [];
  const wallPositions = [];

  levelConfig.walls.forEach(w => {
    if (w.row !== undefined && w.col !== undefined) {
      wallPositions.push({ row: w.row, col: w.col });
    } else if (w.row !== undefined && w.colStart !== undefined && w.colEnd !== undefined) {
      for (let c = w.colStart; c <= w.colEnd; c++) {
        wallPositions.push({ row: w.row, col: c });
      }
    } else if (w.col !== undefined && w.rowStart !== undefined && w.rowEnd !== undefined) {
      for (let r = w.rowStart; r <= w.rowEnd; r++) {
        wallPositions.push({ row: r, col: w.col });
      }
    }
  });

  for (let r = 0; r < ROWS; r++) {
    const currentRow = [];
    for (let c = 0; c < COLS; c++) {
      const isPlayer = r === levelConfig.playerStart.row && c === levelConfig.playerStart.col;
      const isWall = wallPositions.some(p => p.row === r && p.col === c);
      
      // Escape condition: border cells that are not walls
      const isExit = !isWall && (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1);
      const isMonster = levelConfig.monsters.some(p => p.row === r && p.col === c);

      currentRow.push({
        row: r, col: c, isWall, isPlayer, isMonster, isExit,
        dangerLevel: 0, isVisited: false, isBFSFrontier: false, isPath: false,
        isPlayerZone: false, isMonsterZone: false, previousNode: null, distance: Infinity
      });
    }
    grid.push(currentRow);
  }
  return grid;
};
