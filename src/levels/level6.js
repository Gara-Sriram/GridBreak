/**
 * Level 6 — The Gate
 *
 * A horizontal wall seals the upper half with a single gap at col 12.
 * Two monsters guard the top corners — but the player at center reaches
 * the gap and exits BEFORE the corner monsters can intercept.
 *
 * Escape: (10,12) → up 10 steps → (0,12).
 * Monster (1,1)  → (0,12) = 1 + 11 = 12 steps  > 10 ✓
 * Monster (1,23) → (0,12) = 1 + 11 = 12 steps  > 10 ✓
 *
 * Lesson: Multi-source BFS shows that monsters dominate the flanks but
 * the center corridor stays green all the way to the top.
 */
export const level6 = {
  playerStart: { row: 10, col: 12 },
  monsters: [
    { row: 1, col: 1  },
    { row: 1, col: 23 },
  ],
  walls: [
    // Horizontal wall at row 5 — gap at col 12 (cols 5-11 and 13-19 are walled)
    { row: 5, colStart: 5,  colEnd: 11 },
    { row: 5, colStart: 13, colEnd: 19 },
  ],
};
