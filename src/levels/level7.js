/**
 * Level 7 — The Pincer
 *
 * Three monsters: two guarding the top corners, one blocking the bottom
 * center. The bottom is cut off, left/right flanks are monster-dominated.
 * Only the center gap in the wall leads to safety.
 *
 * Escape: (10,12) → up through gap at (7,12) → (0,12) in 10 steps.
 * Monster (2,3)   → (0,12) = 2 + 9 = 11 steps  > 10 ✓
 * Monster (2,21)  → (0,12) = 2 + 9 = 11 steps  > 10 ✓
 * Monster (18,12) → (0,12) = 18 + 0 = 18 steps > 10 ✓
 *
 * The wall blocks the flanks, funnelling both player and monster through
 * col 12. Monster (2,3) dominates the left flank above row 7.
 *
 * Lesson: Walls concentrate monster reach — find the one safe corridor.
 */
export const level7 = {
  playerStart: { row: 10, col: 12 },
  monsters: [
    { row: 2,  col: 3  },
    { row: 2,  col: 21 },
    { row: 18, col: 12 },
  ],
  walls: [
    // Horizontal wall at row 7 — gap at col 12
    { row: 7, colStart: 4,  colEnd: 11 },
    { row: 7, colStart: 13, colEnd: 20 },
  ],
};
