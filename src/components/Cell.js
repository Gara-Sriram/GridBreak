import React from 'react';

export default function Cell({ cell }) {
  let classes = 'cell';

  if (cell.isWall) {
    classes += ' wall';
  } else if (cell.isPlayer) {
    classes += ' player';
  } else if (cell.isMonster) {
    classes += ' monster';
  } else if (cell.isExit) {
    if (cell.isDangerous) classes += ' exit exit-blocked';
    else classes += ' exit';
  } else if (cell.isHint) {
    // Hint path overrides safe/dangerous coloring so the route is clearly visible
    classes += ' hint-path';
  } else if (cell.isSafe) {
    classes += ' safe';
  } else if (cell.isDangerous) {
    classes += ' dangerous';
  }

  return (
    <div
      className={classes}
      data-row={cell.row}
      data-col={cell.col}
    />
  );
}
