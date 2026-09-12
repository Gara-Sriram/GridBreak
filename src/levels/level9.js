/**
 * Level 9 — Siege
 *
 * Six monsters form a near-encirclement. A box wall in the upper half
 * blocks most paths, but both the box walls and the single gate are
 * split around col 12 so the center column stays open.
 *
 * Player starts below the box at (13,12).
 *
 * Escape: (13,12) → up 13 steps → (0,12).
 *   Monster (1,1)  → (0,12) = 1+11 = 12 < 13? NO — player is slower going up!
 *
 * Let's use bottom escape instead:
 * Escape: (13,12) → down 6 steps → (19,12).
 *   Monster (18,5) → (19,12) = 1+7 = 8 > 6 ✓
 *   Monster (18,19)→ (19,12) = 1+7 = 8 > 6 ✓
 *   Monster (10,2) → (19,12) = 9+10 = 19 > 6 ✓
 *   Monster (10,22)→ (19,12) = 9+10 = 19 > 6 ✓
 *   Monster (1,1)  → (19,12) = 18+11 = 29 > 6 ✓
 *   Monster (1,23) → (19,12) = 18+11 = 29 > 6 ✓  All safe!
 *
 * The box wall above the player blocks going up — forcing you to find
 * the bottom exit. Monsters at (18,5) and (18,19) create a narrow
 * window: only col 10-18 on the bottom border is safe. Hint shows it.
 *
 * Lesson: Not all obvious exits work — read the danger overlay.
 */
export const level9 = {
  playerStart: { row: 13, col: 12 },
  monsters: [
    { row: 1,  col: 1  },
    { row: 1,  col: 23 },
    { row: 10, col: 2  },
    { row: 10, col: 22 },
    { row: 18, col: 5  },
    { row: 18, col: 19 },
  ],
  walls: [
    // Box wall around rows 7-11, cols 7-17 — split at col 12 for top/bottom openings
    // Top of box — gap at col 12
    { row: 7, colStart: 7, colEnd: 11 },
    { row: 7, colStart: 13, colEnd: 17 },
    // Bottom of box — gap at col 12
    { row: 11, colStart: 7, colEnd: 11 },
    { row: 11, colStart: 13, colEnd: 17 },
    // Left side of box (col 7, rows 8-10)
    { col: 7, rowStart: 8, rowEnd: 10 },
    // Right side of box (col 17, rows 8-10)
    { col: 17, rowStart: 8, rowEnd: 10 },
    // Additional upper wall to discourage upward escape (monsters dominate top)
    { row: 4, colStart: 3, colEnd: 11 },
    { row: 4, colStart: 13, colEnd: 21 },
  ],
};
