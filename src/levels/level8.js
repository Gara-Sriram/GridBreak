/**
 * Level 8 — Double Gate
 *
 * Two horizontal walls create a double airlock. Four monsters guard all
 * four corners. The only safe route threads through BOTH center gaps.
 *
 * Escape: (10,12) → up → (6,12) [gap 1] → up → (0,12) in 10 steps.
 *   OR    (10,12) → down → (14,12) [gap 2] → down → (19,12) in 9 steps.
 *
 * Monsters at (2,3), (2,21), (17,3), (17,21):
 *   All corners → (0,12): min = 2+9 = 11 > 10 ✓
 *   All corners → (19,12): min = 2+9 = 11 > 9 ✓
 *
 * Lesson: Two gaps — two valid escape directions. BFS hint shows the
 * shorter (downward) route since (19,12) needs only 9 steps.
 */
export const level8 = {
  playerStart: { row: 10, col: 12 },
  monsters: [
    { row: 2,  col: 3  },
    { row: 2,  col: 21 },
    { row: 17, col: 3  },
    { row: 17, col: 21 },
  ],
  walls: [
    // Upper wall at row 6 — gap at col 12
    { row: 6, colStart: 4,  colEnd: 11 },
    { row: 6, colStart: 13, colEnd: 20 },
    // Lower wall at row 14 — gap at col 12
    { row: 14, colStart: 4,  colEnd: 11 },
    { row: 14, colStart: 13, colEnd: 20 },
  ],
};
