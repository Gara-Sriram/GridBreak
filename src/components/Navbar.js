import React from 'react';

export default function Navbar({
  level, score, movesLeft, gameStatus,
  showBFS, toggleBFS,
  showDanger, toggleDanger,
  showZones, toggleZones,
  showHint, toggleHint,
  onRestart
}) {
  const getStatusColor = () => {
    if (gameStatus === 'won') return '#00b894';
    if (gameStatus === 'lost') return '#d63031';
    return '#ffeaa7';
  };

  return (
    <div className="navbar" style={{
      display: 'flex', flexDirection: 'column', width: '600px',
      background: '#1e293b', border: '1px solid #334155', borderRadius: '12px',
      padding: '15px 20px', marginBottom: '20px', fontFamily: 'JetBrains Mono', gap: '12px', boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          LEVEL: <span style={{ color: '#00b894' }}>{level}</span> | SCORE: <span style={{ color: '#fdcb6e' }}>{score}</span>
        </div>
        <div style={{ fontSize: '1rem', display: 'flex', gap: '15px' }}>
          <div>Moves: <span style={{ color: '#ff7675', fontWeight: 'bold' }}>{movesLeft}</span></div>
          <div>Status: <span style={{ color: getStatusColor(), fontWeight: 'bold' }}>{gameStatus.toUpperCase()}</span></div>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
        <button className={`nav-btn ${showBFS ? 'active' : ''}`} onClick={toggleBFS}>BFS (B)</button>
        <button className={`nav-btn ${showDanger ? 'active' : ''}`} onClick={toggleDanger}>Danger (D)</button>
        <button className={`nav-btn ${showZones ? 'active' : ''}`} onClick={toggleZones}>Zones (F)</button>
        <button className={`nav-btn ${showHint ? 'active' : ''}`} onClick={toggleHint}>Hint (H)</button>
        <button className="nav-btn restart" onClick={onRestart} style={{ background: '#d63031', border: 'none', color: 'white' }}>Restart (R)</button>
      </div>
    </div>
  );
}
