/**
 * Level 3 — The Funnel
 *
 * A horizontal wall with a single gap creates a funnel.
 * Two monsters wait near the gap. Player must find the safe side to cross
 * or escape from below the wall.
 * Lesson: Walls reshape the safe zone — go around, not through danger.
 */
export const level3 = {
  playerStart: { row: 14, col: 12 },
  monsters: [
    { row: 7,  col: 11 },
    { row: 7,  col: 13 },
  ],
  walls: [
    // Horizontal wall row 10, gap at col 12
    { row: 10, colStart: 1,  colEnd: 11 },
    { row: 10, colStart: 13, colEnd: 23 },
  ],
};
