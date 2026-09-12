/**
 * Level 10 — Final Escape (CSES Monsters)
 *
 * Eight monsters, four horizontal walls with gaps at col 12, and a tight
 * safe corridor straight up the center. This is a direct instance of the
 * CSES Monsters problem.
 *
 * All monster distances to (0,12) are verified > 10 (player's path length):
 *   (2,3)  → (0,12) = 2+9 = 11  > 10 ✓
 *   (2,21) → (0,12) = 2+9 = 11  > 10 ✓
 *   (6,1)  → (0,12) = 6+11 = 17 > 10 ✓
 *   (6,23) → (0,12) = 6+11 = 17 > 10 ✓
 *   (14,1) → (0,12) = 14+11= 25 > 10 ✓
 *   (14,23)→ (0,12) = 14+11= 25 > 10 ✓
 *   (17,3) → (0,12) = 17+9 = 26 > 10 ✓
 *   (17,21)→ (0,12) = 17+9 = 26 > 10 ✓
 *
 * Four walls (rows 4, 7, 13, 16) each split at col 12 force the player
 * to thread through all four gaps. Straying left or right enters a
 * monster-dominated danger zone.
 *
 * Lesson: This is the full CSES algorithm. Enable the hint (H) to see
 * the unique optimal path — then try to find it yourself without it!
 */
export const level10 = {
  playerStart: { row: 10, col: 12 },
  monsters: [
    { row: 2,  col: 3  },
    { row: 2,  col: 21 },
    { row: 6,  col: 1  },
    { row: 6,  col: 23 },
    { row: 14, col: 1  },
    { row: 14, col: 23 },
    { row: 17, col: 3  },
    { row: 17, col: 21 },
  ],
  walls: [
    // Wall row 4 — gap at col 12
    { row: 4,  colStart: 3,  colEnd: 11 },
    { row: 4,  colStart: 13, colEnd: 21 },
    // Wall row 7 — gap at col 12
    { row: 7,  colStart: 3,  colEnd: 11 },
    { row: 7,  colStart: 13, colEnd: 21 },
    // Wall row 13 — gap at col 12
    { row: 13, colStart: 3,  colEnd: 11 },
    { row: 13, colStart: 13, colEnd: 21 },
    // Wall row 16 — gap at col 12
    { row: 16, colStart: 3,  colEnd: 11 },
    { row: 16, colStart: 13, colEnd: 21 },
  ],
};
