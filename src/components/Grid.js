import React from 'react';
import Cell from './Cell';

export default function Grid({ grid }) {
  return (
    <div className="grid-wrapper">
      <div className="grid-container">
        {grid.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <Cell key={`${rIdx}-${cIdx}`} cell={cell} />
          ))
        )}
      </div>
    </div>
  );
}
