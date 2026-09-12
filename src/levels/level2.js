/**
 * Level 2 — Two Guardians
 *
 * Two monsters guard opposite corners. The player must pick the escape
 * corridor that neither monster dominates. Safe zone narrows toward the
 * center bottom.
 * Lesson: Identify which border segments each monster controls.
 */
export const level2 = {
  playerStart: { row: 10, col: 12 },
  monsters: [
    { row: 1, col: 1 },
    { row: 1, col: 23 },
  ],
  walls: [],
};
