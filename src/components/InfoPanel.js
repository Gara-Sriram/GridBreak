import React from 'react';

const LEVEL_INFO = {
  1: { title: 'BFS Pathfinding', desc: 'Monsters use BFS — they always find the shortest path to you. Toggle B to watch them think.' },
  2: { title: 'BFS Pathfinding', desc: 'Monsters use BFS — they always find the shortest path to you. Toggle B to watch them think.' },
  3: { title: 'Multi-Source BFS', desc: 'All monsters expand simultaneously. Red = 1 move away, Orange = 2 moves, Yellow = 3 moves.' },
  4: { title: 'Multi-Source BFS', desc: 'All monsters expand simultaneously. Red = 1 move away, Orange = 2 moves, Yellow = 3 moves.' },
  5: { title: 'Dead End Detection', desc: 'Uses graph reachability to check if the exit is still safely reachable from your position.' },
  6: { title: 'Dead End Detection', desc: 'Uses graph reachability to check if the exit is still safely reachable from your position.' },
  7: { title: 'Flood Fill Zone Control', desc: 'Shows which zones player vs monsters control. Green represents player-controlled areas.' },
  8: { title: 'Flood Fill Zone Control', desc: 'Shows which zones player vs monsters control. Green represents player-controlled areas.' },
  9: { title: 'Dynamic Programming Escape', desc: 'Optimal escape route planner using DP state space transitions. Follow the purple path!' },
  10: { title: 'Dynamic Programming Escape', desc: 'Optimal escape route planner using DP state space transitions. Follow the purple path!' }
};

export default function InfoPanel({ level }) {
  const info = LEVEL_INFO[level] || { title: 'Unknown', desc: '' };
  return (
    <div className="info-panel" style={{
      width: '600px', background: '#1e293b', border: '1px solid #334155', borderRadius: '12px',
      padding: '15px 20px', marginTop: '20px', boxSizing: 'border-box'
    }}>
      <h3 style={{ margin: '0 0 6px 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#00b894', textTransform: 'uppercase', fontFamily: 'JetBrains Mono' }}>
        📚 DSA Concept: {info.title}
      </h3>
      <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.4' }}>
        {info.desc}
      </p>
    </div>
  );
}
