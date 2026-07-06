# 🟡 GridBreak

A browser-based **grid escape puzzle game** where you must navigate a maze, outsmart monsters, and reach the border before they catch you. Paths shrink level by level — by the final stage, only two corridors remain.

---

## 🎮 How to Play

- **Arrow keys** (or WASD) to move your player on the grid
- **Goal:** Reach any glowing gold border cell to escape
- **Danger:** Monsters chase you each turn — if they land on you, it's over
- **Challenge:** Internal fence walls limit your routes. As levels increase, fewer and fewer paths lead to freedom
- **Move limit:** Each level has a maximum number of moves — plan wisely!

---

## 📐 Level Design

Each level uses a **rectangular inner fence** with a shrinking number of escape gaps:

| Level | Escape Paths | Monsters | Difficulty |
|-------|-------------|----------|------------|
| 1     | ∞ (open)    | 1        | Tutorial   |
| 2     | 10          | 1        | Easy       |
| 3     | 9           | 2        | Easy       |
| 4     | 8           | 2        | Medium     |
| 5     | 7           | 3        | Medium     |
| 6     | 6           | 3        | Medium     |
| 7     | 5           | 3        | Hard       |
| 8     | 4           | 4        | Hard       |
| 9     | 3           | 4        | Very Hard  |
| 10    | 2           | 5        | Extreme    |

Higher levels also introduce **inner maze walls** (L-shaped and cross barriers) that make straight-line escapes impossible — you must discover the correct zigzag route.

---

## 🧠 Algorithms

The game is built on classical graph algorithms visualized in real time:

| Toggle | Algorithm | What it Shows |
|--------|-----------|---------------|
| **BFS** | Breadth-First Search | Monster search wavefronts expanding toward you |
| **Danger Zones** | Multi-source BFS | Grid cells colored by how close monsters are |
| **Flood Fill** | Territory Analysis | Which cells the player vs monsters "own" |
| **DP Hint** | Dynamic Programming Escape | Optimal path from player to the nearest safe exit |

Use the toggle buttons in the info panel to switch overlays on/off at any time.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- npm

### Install & Run

```bash
git clone https://github.com/Gara-Sriram/GridBreak.git
cd GridBreak
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂️ Project Structure

```
src/
├── algorithms/
│   ├── bfs.js              # Breadth-first search (monster wavefronts)
│   ├── dpEscape.js         # DP-based optimal escape path
│   ├── floodFill.js        # Territory flood fill
│   ├── multisourceBfs.js   # Danger zone calculation
│   └── reachability.js     # Can player reach exit check
├── components/
│   ├── Cell.js             # Individual grid cell renderer
│   ├── Grid.js             # Main game grid
│   ├── InfoPanel.js        # Algorithm toggles + move counter
│   └── Navbar.js           # Level selector + controls
├── hooks/
│   └── useGame.js          # Core game state + logic
├── levels/
│   ├── levelConfig.js      # Grid/wall/exit generation
│   ├── level1.js           # Open arena
│   ├── level2.js           # 10 paths
│   └── ...level10.js       # 2 paths, extreme difficulty
└── utils/
    └── gameEngine.js       # Turn processing, win/loss detection
```

---

## 🛠️ Tech Stack

- **React** — UI and component state
- **Vanilla CSS** — custom dark-mode grid styling
- **JavaScript (ES6+)** — all game logic and algorithms

---

## 📸 Screenshots

> *Level 1 — Open arena, learn the basics*

> *Level 10 — Two paths remain, monsters closing in*

---

## 🤝 Contributing

Pull requests are welcome! If you find a level that's impossible or a bug in the pathfinding, please open an issue.

---

## 📄 License

MIT License — feel free to use, modify, and share.
