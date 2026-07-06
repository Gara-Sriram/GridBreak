import { useState, useEffect, useCallback } from 'react';
import { bfs } from '../algorithms/bfs';
import { canReachExit } from '../algorithms/reachability';
import { LEVELS, ROWS, COLS, createInitialGridForLevel } from '../levels/levelConfig';
import { updateGridDanger, updateGridZones, moveMonstersInstant, calculateDPPath } from '../utils/gameEngine';

export function useGame() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [grid, setGrid] = useState([]);
  const [toggles, setToggles] = useState({ bfs: true, danger: true, zones: false, hint: false });
  const [state, setState] = useState({
    playerPos: { row: 0, col: 0 }, monsters: [], movesLeft: 0, gameStatus: 'playing', message: '', isDeadEnd: false, hintMessage: ''
  });

  const loadLevel = useCallback((lvl) => {
    const cfg = LEVELS[lvl - 1];
    if (!cfg) return;
    setToggles(cfg.defaultToggles);
    const initGrid = createInitialGridForLevel(cfg);
    let finalGrid = updateGridDanger(initGrid, cfg.monsters, cfg.defaultToggles.danger);
    finalGrid = updateGridZones(finalGrid, cfg.playerStart, cfg.monsters, cfg.defaultToggles.zones);
    const { grid: pGrid, message: pMsg } = calculateDPPath(finalGrid, cfg.playerStart, cfg.monsters, cfg.movesLimit, cfg.defaultToggles.hint);
    setGrid(pGrid);
    setState({ playerPos: cfg.playerStart, monsters: cfg.monsters, movesLeft: cfg.movesLimit, gameStatus: 'playing', message: '', isDeadEnd: false, hintMessage: pMsg });
    setIsAnimating(false);
  }, []);

  useEffect(() => { loadLevel(1); }, [loadLevel]);

  const resetLevel = useCallback(() => loadLevel(currentLevel), [currentLevel, loadLevel]);
  const handleNextLevel = () => { setCurrentLevel(p => { loadLevel(p + 1); return p + 1; }); };

  const completeTurn = useCallback((nextMonsters, updatedGrid, nextMoves, nextStatus, nextMsg, nextPlayer, cfg) => {
    let status = nextStatus, msg = nextMsg;
    if (nextMonsters.some(m => m.row === nextPlayer.row && m.col === nextPlayer.col)) {
      status = 'lost'; msg = 'Caught by a monster! Game Over.';
    } else if (nextMoves === 0) {
      status = 'lost'; msg = 'Out of moves! Game Over.';
    }
    let finalGrid = updateGridDanger(updatedGrid, nextMonsters, toggles.danger);
    const deadEnd = !canReachExit(finalGrid, nextPlayer);
    finalGrid = updateGridZones(finalGrid, nextPlayer, nextMonsters, toggles.zones);
    const { grid: pGrid, message: pMsg } = calculateDPPath(finalGrid, nextPlayer, nextMonsters, nextMoves, toggles.hint);
    setGrid(pGrid);
    setState(prev => ({ ...prev, monsters: nextMonsters, movesLeft: nextMoves, gameStatus: status, message: msg, isDeadEnd: deadEnd, hintMessage: pMsg }));
  }, [toggles.danger, toggles.zones, toggles.hint]);

  const movePlayer = useCallback((dRow, dCol) => {
    if (isAnimating || state.gameStatus !== 'playing') return;
    const cfg = LEVELS[currentLevel - 1];
    const newRow = state.playerPos.row + dRow, newCol = state.playerPos.col + dCol;
    if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS || grid[newRow][newCol].isWall) return;

    let nextGrid = grid.map(r => r.map(c => ({ ...c })));
    nextGrid[state.playerPos.row][state.playerPos.col].isPlayer = false;
    nextGrid[newRow][newCol].isPlayer = true;
    const nextPlayer = { row: newRow, col: newCol };
    setState(prev => ({ ...prev, playerPos: nextPlayer }));

    let nextStatus = state.gameStatus, nextMsg = '';
    if (nextGrid[newRow][newCol].isExit) {
      const lvlScore = state.movesLeft * 10;
      setScore(prev => prev + lvlScore);
      nextStatus = currentLevel < 10 ? 'won' : 'escaped';
      nextMsg = currentLevel < 10 ? `Level ${currentLevel} Cleared! Score +${lvlScore}.` : `Congratulations! You Escaped! Final Score: ${score + lvlScore}`;
      setState(prev => ({ ...prev, gameStatus: nextStatus, message: nextMsg }));
      setGrid(nextGrid);
      return;
    }
    if (state.monsters.some(m => m.row === newRow && m.col === newCol)) {
      setState(prev => ({ ...prev, gameStatus: 'lost', message: 'Caught by a monster! Game Over.' }));
      setGrid(nextGrid);
      return;
    }

    const nextMoves = state.movesLeft - 1;
    const monsterCalcs = state.monsters.map(m => bfs(nextGrid, m, nextPlayer));

    if (toggles.bfs) {
      const merged = [];
      const maxL = Math.max(...monsterCalcs.map(c => c.frontiersByLevel.length), 0);
      for (let l = 0; l < maxL; l++) {
        const lf = [];
        monsterCalcs.forEach(c => { if (c.frontiersByLevel[l]) lf.push(...c.frontiersByLevel[l]); });
        merged.push(lf);
      }
      setIsAnimating(true);
      setGrid(nextGrid.map(r => r.map(c => ({ ...c, isBFSFrontier: false, isVisited: false, isPath: false }))));

      merged.forEach((frontier, idx) => {
        setTimeout(() => {
          setGrid(prev => {
            const nextA = prev.map(r => r.map(c => ({ ...c })));
            if (idx > 0) { merged[idx - 1].forEach(cell => { nextA[cell.row][cell.col].isBFSFrontier = false; nextA[cell.row][cell.col].isVisited = true; }); }
            frontier.forEach(cell => { nextA[cell.row][cell.col].isBFSFrontier = true; });
            return nextA;
          });
        }, idx * 80);
      });

      setTimeout(() => {
        const finalGrid = nextGrid.map(r => r.map(c => ({ ...c, isBFSFrontier: false, isVisited: false })));
        const nextMonsters = state.monsters.map((m, idx) => {
          const path = monsterCalcs[idx].path;
          if (path && path.length > 0) {
            finalGrid[m.row][m.col].isMonster = false;
            finalGrid[path[0].row][path[0].col].isMonster = true;
            return path[0];
          }
          return m;
        });
        setIsAnimating(false);
        completeTurn(nextMonsters, finalGrid, nextMoves, nextStatus, nextMsg, nextPlayer, cfg);
      }, merged.length * 80 + 200);
    } else {
      const { nextMonsters, finalGrid } = moveMonstersInstant(nextGrid, state.monsters, nextPlayer);
      completeTurn(nextMonsters, finalGrid, nextMoves, nextStatus, nextMsg, nextPlayer, cfg);
    }
  }, [state, grid, isAnimating, currentLevel, score, toggles, completeTurn]);

  const toggleBFS = useCallback(() => setToggles(p => ({ ...p, bfs: !p.bfs })), []);
  const toggleDanger = useCallback(() => setToggles(p => { setGrid(g => updateGridDanger(g, state.monsters, !p.danger)); return { ...p, danger: !p.danger }; }), [state.monsters]);
  const toggleZones = useCallback(() => setToggles(p => { setGrid(g => updateGridZones(g, state.playerPos, state.monsters, !p.zones)); return { ...p, zones: !p.zones }; }), [state.playerPos, state.monsters]);
  const toggleHint = useCallback(() => setToggles(p => {
    const nextShow = !p.hint;
    setGrid(g => {
      const { grid: pGrid, message: pMsg } = calculateDPPath(g, state.playerPos, state.monsters, state.movesLeft, nextShow);
      setState(prev => ({ ...prev, hintMessage: pMsg }));
      return pGrid;
    });
    return { ...p, hint: nextShow };
  }), [state.playerPos, state.monsters, state.movesLeft]);

  return {
    currentLevel, score, movesLeft: state.movesLeft, gameStatus: state.gameStatus, message: state.message,
    showBFS: toggles.bfs, showDangerZones: toggles.danger, showFloodFill: toggles.zones, showHint: toggles.hint,
    isDeadEnd: state.isDeadEnd, hintMessage: state.hintMessage, grid,
    toggleBFS, toggleDanger, toggleZones, toggleHint, resetLevel, handleNextLevel, movePlayer, isAnimating
  };
}
