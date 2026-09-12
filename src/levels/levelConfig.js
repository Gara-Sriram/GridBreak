import { level1 }  from './level1';
import { level2 }  from './level2';
import { level3 }  from './level3';
import { level4 }  from './level4';
import { level5 }  from './level5';
import { level6 }  from './level6';
import { level7 }  from './level7';
import { level8 }  from './level8';
import { level9 }  from './level9';
import { level10 } from './level10';

export const LEVELS = [
  level1, level2, level3, level4, level5,
  level6, level7, level8, level9, level10,
];

export const ROWS = 20;
export const COLS = 25;

export const createInitialGridForLevel = (levelConfig) => {
  const wallSet = new Set();

  for (const w of levelConfig.walls) {
    if (w.row !== undefined && w.col !== undefined) {
      wallSet.add(`${w.row},${w.col}`);
    } else if (w.row !== undefined && w.colStart !== undefined && w.colEnd !== undefined) {
      for (let c = w.colStart; c <= w.colEnd; c++) {
        wallSet.add(`${w.row},${c}`);
      }
    } else if (w.col !== undefined && w.rowStart !== undefined && w.rowEnd !== undefined) {
      for (let r = w.rowStart; r <= w.rowEnd; r++) {
        wallSet.add(`${r},${w.col}`);
      }
    }
  }

  const monsterSet = new Set(levelConfig.monsters.map(m => `${m.row},${m.col}`));

  const grid = [];
  for (let r = 0; r < ROWS; r++) {
    const row = [];
    for (let c = 0; c < COLS; c++) {
      const key = `${r},${c}`;
      const isWall    = wallSet.has(key);
      const isPlayer  = r === levelConfig.playerStart.row && c === levelConfig.playerStart.col;
      const isMonster = monsterSet.has(key);
      // Border cells that are not walls are exits
      const isExit    = !isWall && !isMonster && (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1);

      row.push({
        row: r, col: c,
        isWall, isPlayer, isMonster, isExit,
        isSafe: false, isDangerous: false,
      });
    }
    grid.push(row);
  }
  return grid;
};
