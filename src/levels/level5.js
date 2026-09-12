/**
 * Level 5 — Ring of Fire
 *
 * Four monsters form a loose ring around the player's start. Every direct
 * route to the border is contested. The player must identify the "seam"
 * between two monsters' Voronoi regions and slip through it.
 * Lesson: Multi-source BFS creates Voronoi-like regions. Move toward
 * the boundary between two monster zones.
 */
export const level5 = {
  playerStart: { row: 10, col: 12 },
  monsters: [
    { row: 3,  col: 4  },
    { row: 3,  col: 20 },
    { row: 17, col: 4  },
    { row: 17, col: 20 },
  ],
  walls: [],
};
