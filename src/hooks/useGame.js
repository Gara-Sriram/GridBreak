import { useState, useEffect, useCallback } from 'react';
import { LEVELS, ROWS, COLS, createInitialGridForLevel } from '../levels/levelConfig';
import { buildGrid, computeMonsterDist } from '../utils/gameEngine';
import { isCellSafe } from '../algorithms/safeZoneBfs';

export function useGame() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore]               = useState(0);
  const [grid, setGrid]                 = useState([]);
  const [monsterDist, setMonsterDist]   = useState(null); // precomputed once per level
  const [showOverlay, setShowOverlay]   = useState(true);
  const [showHint, setShowHint]         = useState(false);
  const [playerPos, setPlayerPos]       = useState({ row: 0, col: 0 });
  const [stepCount, setStepCount]       = useState(0);
  const [gameStatus, setGameStatus]     = useState('playing');
  const [message, setMessage]           = useState('');
  const [hintMessage, setHintMessage]   = useState('');

  // ── Load a level ────────────────────────────────────────────────────────────
  const loadLevel = useCallback((lvl) => {
    const cfg = LEVELS[lvl - 1];
    if (!cfg) return;

    const rawGrid = createInitialGridForLevel(cfg);
    const md = computeMonsterDist(rawGrid, cfg.playerStart, cfg.monsters);
    const { grid: builtGrid } = buildGrid(rawGrid, cfg.playerStart, cfg.monsters, true, md, false, 0);

    setMonsterDist(md);
    setGrid(builtGrid);
    setPlayerPos(cfg.playerStart);
    setStepCount(0);
    setGameStatus('playing');
    setMessage('');
    setHintMessage('');
    setShowOverlay(true);
    setShowHint(false);
  }, []);

  // Load level 1 on mount
  useEffect(() => { loadLevel(1); }, [loadLevel]);

  const resetLevel   = useCallback(() => loadLevel(currentLevel), [currentLevel, loadLevel]);
  const handleNextLevel = useCallback(() => {
    const next = currentLevel + 1;
    setCurrentLevel(next);
    loadLevel(next);
  }, [currentLevel, loadLevel]);

  // ── Toggle safe-zone overlay ────────────────────────────────────────────────
  const toggleOverlay = useCallback(() => {
    const nextOverlay = !showOverlay;
    setShowOverlay(nextOverlay);
    const cfg = LEVELS[currentLevel - 1];
    if (!cfg) return;
    const { grid: newGrid, hintMessage: hm } = buildGrid(
      grid, playerPos, cfg.monsters, nextOverlay, monsterDist, showHint, stepCount
    );
    setGrid(newGrid);
    setHintMessage(hm);
  }, [showOverlay, currentLevel, grid, playerPos, monsterDist, showHint, stepCount]);

  // ── Toggle hint path ────────────────────────────────────────────────────────
  const toggleHint = useCallback(() => {
    const nextHint = !showHint;
    setShowHint(nextHint);
    const cfg = LEVELS[currentLevel - 1];
    if (!cfg) return;
    const { grid: newGrid, hintMessage: hm } = buildGrid(
      grid, playerPos, cfg.monsters, showOverlay, monsterDist, nextHint, stepCount
    );
    setGrid(newGrid);
    setHintMessage(hm);
  }, [showHint, currentLevel, grid, playerPos, showOverlay, monsterDist, stepCount]);

  // ── Move the player ─────────────────────────────────────────────────────────
  const movePlayer = useCallback((dRow, dCol) => {
    if (gameStatus !== 'playing') return;

    const newRow = playerPos.row + dRow;
    const newCol = playerPos.col + dCol;

    // Ignore out-of-bounds or wall moves
    if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS) return;
    if (grid[newRow][newCol].isWall) return;

    // Can't walk into a monster
    if (grid[newRow][newCol].isMonster) {
      setGameStatus('lost');
      setMessage('You walked into a monster!');
      return;
    }

    const nextStep = stepCount + 1;

    // CSES safety check: monster arrives at (newRow, newCol) in ≤ nextStep steps → Game Over
    if (!isCellSafe(monsterDist, newRow, newCol, nextStep)) {
      // Move the player visually, then show game over
      const nextGrid = grid.map(r => r.map(c => ({ ...c, isHint: false })));
      nextGrid[playerPos.row][playerPos.col].isPlayer = false;
      nextGrid[newRow][newCol].isPlayer = true;
      setGrid(nextGrid);
      setPlayerPos({ row: newRow, col: newCol });
      setStepCount(nextStep);
      setGameStatus('lost');
      setMessage('A monster can reach there before you — intercepted!');
      return;
    }

    // Move player in the grid
    const cfg = LEVELS[currentLevel - 1];
    const nextGrid = grid.map(r => r.map(c => ({ ...c })));
    nextGrid[playerPos.row][playerPos.col].isPlayer = false;
    nextGrid[newRow][newCol].isPlayer = true;

    const newPos = { row: newRow, col: newCol };

    // Win: reached a border exit
    if (nextGrid[newRow][newCol].isExit) {
      const isLastLevel = currentLevel >= LEVELS.length;
      const bonus = Math.max(0, 200 - nextStep * 5);
      setScore(prev => prev + bonus);
      setGrid(nextGrid);
      setPlayerPos(newPos);
      setStepCount(nextStep);
      setGameStatus(isLastLevel ? 'escaped' : 'won');
      setMessage(isLastLevel ? `You escaped! Score +${bonus}` : `Level cleared! Score +${bonus}`);
      setHintMessage('');
      return;
    }

    // Normal move: rebuild overlay and hint
    const { grid: finalGrid, hintMessage: hm } = buildGrid(
      nextGrid, newPos, cfg.monsters, showOverlay, monsterDist, showHint, nextStep
    );
    setGrid(finalGrid);
    setPlayerPos(newPos);
    setStepCount(nextStep);
    setHintMessage(hm);
  }, [gameStatus, playerPos, stepCount, grid, monsterDist, currentLevel, showOverlay, showHint]);

  return {
    currentLevel, score, stepCount, gameStatus, message, hintMessage,
    showOverlay, showHint, grid,
    toggleOverlay, toggleHint, resetLevel, handleNextLevel, movePlayer,
  };
}
