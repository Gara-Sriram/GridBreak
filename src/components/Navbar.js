import React from 'react';

const STATUS_COLOR = {
  won:     '#00b894',
  escaped: '#00b894',
  lost:    '#d63031',
  playing: '#ffeaa7',
};

export default function Navbar({
  level, score, stepCount, gameStatus,
  showOverlay, toggleOverlay,
  showHint, toggleHint,
  onRestart,
}) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', width: '620px',
      background: '#1e293b', border: '1px solid #334155', borderRadius: '12px',
      padding: '15px 20px', marginBottom: '20px',
      fontFamily: 'JetBrains Mono', gap: '12px', boxSizing: 'border-box',
    }}>

      {/* Level / Score / Steps / Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          LEVEL: <span style={{ color: '#00b894' }}>{level}</span>
          {' | '}
          SCORE: <span style={{ color: '#fdcb6e' }}>{score}</span>
        </div>
        <div style={{ display: 'flex', gap: 15 }}>
          <span>Steps: <strong style={{ color: '#a29bfe' }}>{stepCount}</strong></span>
          <span>Status: <strong style={{ color: STATUS_COLOR[gameStatus] }}>{gameStatus.toUpperCase()}</strong></span>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button className={`nav-btn ${showOverlay ? 'active' : ''}`} onClick={toggleOverlay} title="O">
          Safe Zone (O)
        </button>
        <button className={`nav-btn ${showHint ? 'hint-active' : ''}`} onClick={toggleHint} title="H">
          Hint Path (H)
        </button>
        <button className="nav-btn restart" onClick={onRestart}>
          Restart (R)
        </button>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 14, fontSize: '0.75rem', color: '#64748b', flexWrap: 'wrap' }}>
        <span><span style={{ color: '#00b894' }}>●</span> You</span>
        <span><span style={{ color: '#d63031' }}>■</span> Monster</span>
        <span><span style={{ color: '#fdcb6e' }}>◆</span> Exit</span>
        <span><span style={{ color: '#4ade80' }}>▪</span> Safe</span>
        <span><span style={{ color: '#f87171' }}>▪</span> Danger</span>
        <span><span style={{ color: '#a29bfe' }}>▪</span> Hint</span>
        <span style={{ marginLeft: 'auto' }}>WASD / Arrows to move</span>
      </div>
    </div>
  );
}
