/**
 * Level 4 — The Corridor
 *
 * Two vertical walls create a central corridor. Two monsters are placed
 * at the north end of the corridor, forcing the player to escape south or
 * find gaps in the side walls.
 * Lesson: Corridors amplify danger — the monster's BFS reach covers the
 * entire corridor faster than you can traverse it.
 */
export const level4 = {
  playerStart: { row: 14, col: 12 },
  monsters: [
    { row: 2, col: 9 },
    { row: 2, col: 15 },
  ],
  walls: [
    // Left corridor wall (col 9), gap at row 10
    { col: 9, rowStart: 4, rowEnd: 9 },
    { col: 9, rowStart: 11, rowEnd: 17 },
    // Right corridor wall (col 15), gap at row 10
    { col: 15, rowStart: 4, rowEnd: 9 },
    { col: 15, rowStart: 11, rowEnd: 17 },
  ],
};
