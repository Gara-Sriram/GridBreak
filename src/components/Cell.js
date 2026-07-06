import React from 'react';

export default function Cell({ cell }) {
  let classes = 'cell';
  if (cell.isWall) classes += ' wall';
  else if (cell.isPlayer) classes += ' player';
  else if (cell.isMonster) classes += ' monster';
  else if (cell.isExit) classes += ' exit';
  else if (cell.isBFSFrontier) classes += ' frontier';
  else if (cell.isVisited) classes += ' visited';
  else if (cell.isPath) classes += ' path';
  else if (cell.dangerLevel === 1) classes += ' danger-1';
  else if (cell.dangerLevel === 2) classes += ' danger-2';
  else if (cell.dangerLevel === 3) classes += ' danger-3';
  else if (cell.isPlayerZone) classes += ' zone-player';
  else if (cell.isMonsterZone) classes += ' zone-monster';

  return (
    <div 
      className={classes} 
      data-row={cell.row} 
      data-col={cell.col}
    />
  );
}
