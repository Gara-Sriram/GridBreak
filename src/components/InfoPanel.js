import React from 'react';

const LEVEL_INFO = {
  1:  { title: 'Multi-Source BFS', desc: 'One monster stands guard. Run multi-source BFS from all monsters simultaneously to find which border cells you can reach first. Green = safe, Red = intercepted.' },
  2:  { title: 'Voronoi Regions', desc: 'Two monsters split the grid into "Voronoi regions" based on BFS distance. Cross through the seam between their zones.' },
  3:  { title: 'BFS with Walls', desc: 'Walls reshape BFS distance — a cell near a monster may be safe because the wall forces a long detour. Trust the overlay.' },
  4:  { title: 'Corridor Danger', desc: 'Corridors concentrate BFS reach. A monster at the end of a corridor "owns" the whole path. Find the wall gap the monsters can\'t cover first.' },
  5:  { title: 'Four-Corner Voronoi', desc: 'Four monsters create four zones. The player\'s safe corridor is the Voronoi seam between adjacent monsters. Move toward zone boundaries.' },
  6:  { title: 'Maze BFS', desc: 'In a zigzag maze, Euclidean distance misleads. BFS distance through walls can make a "close" monster actually far. Read the green cells carefully.' },
  7:  { title: 'Pincer Geometry', desc: 'Three monsters form a pincer. Only one narrow safe angle remains. Identify which edge of the grid the pincer does NOT cover.' },
  8:  { title: 'Diagonal Gauntlet', desc: 'Five staggered monsters create a diagonal danger band. The safe corridor zigzags — follow it exactly.' },
  9:  { title: 'Near-Encirclement', desc: 'Six monsters almost surround you. The inner box wall forces detours that may take you into monster-dominated zones. Plan the route before moving.' },
  10: { title: 'Full Encirclement — Final', desc: 'Eight monsters, a cross barrier, almost no safe cells. This is a direct instance of the CSES Monsters problem. Find the single valid escape path.' },
};

export default function InfoPanel({ level }) {
  const info = LEVEL_INFO[level] || { title: 'Unknown', desc: '' };
  return (
    <div className="info-panel" style={{
      width: '620px', background: '#1e293b', border: '1px solid #334155', borderRadius: '12px',
      padding: '15px 20px', marginTop: '20px', boxSizing: 'border-box',
    }}>
      <h3 style={{
        margin: '0 0 6px 0', fontSize: '0.95rem', fontWeight: 'bold',
        color: '#00b894', textTransform: 'uppercase', fontFamily: 'JetBrains Mono',
      }}>
        📚 DSA Concept: {info.title}
      </h3>
      <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.5' }}>
        {info.desc}
      </p>
    </div>
  );
}
