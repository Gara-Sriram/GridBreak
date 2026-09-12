/**
 * Level 1 — Tutorial: One Monster, Open Field
 *
 * A single monster placed at the bottom-right of the grid.
 * Player starts in the center. Most border cells are safe.
 * Lesson: Understand that border = exit. Move toward the top-left.
 * The safe zone (green) covers most of the grid — pick any path to the top.
 */
export const level1 = {
  playerStart: { row: 10, col: 12 },
  monsters: [
    { row: 17, col: 22 },
  ],
  walls: [],
};
