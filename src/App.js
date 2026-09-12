import React, { useEffect } from 'react';
import Grid from './components/Grid';
import Navbar from './components/Navbar';
import InfoPanel from './components/InfoPanel';
import { useGame } from './hooks/useGame';

// ── Small helper components ─────────────────────────────────────────────────

function Modal({ children }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(15,23,42,0.88)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, animation: 'fadeIn 0.3s ease',
    }}>
      {children}
    </div>
  );
}

function ModalCard({ color, children }) {
  return (
    <div style={{
      background: '#1e293b', border: `2px solid ${color}`, padding: '32px 44px',
      borderRadius: '18px', textAlign: 'center', width: '380px',
      boxShadow: `0 0 40px ${color}55`,
    }}>
      {children}
    </div>
  );
}

function HintBanner({ hintMessage }) {
  const isError = hintMessage.includes('No safe');
  return (
    <div style={{
      background: isError ? 'rgba(214,48,49,0.12)' : 'rgba(162,155,254,0.12)',
      color:  isError ? '#f87171' : '#a29bfe',
      border: `1px solid ${isError ? '#f87171' : '#a29bfe'}`,
      padding: '9px 20px', borderRadius: '8px', marginBottom: '12px',
      width: '620px', textAlign: 'center', fontFamily: 'JetBrains Mono',
      fontSize: '0.85rem', fontWeight: '600', boxSizing: 'border-box',
      animation: isError ? 'flash 1.5s infinite' : 'none',
    }}>
      {isError ? '⚠️ ' : '💡 '}{hintMessage}
    </div>
  );
}

// ── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const {
    currentLevel, score, stepCount, gameStatus, message, hintMessage,
    showOverlay, showHint, grid,
    toggleOverlay, toggleHint, resetLevel, handleNextLevel, movePlayer,
  } = useGame();

  // Keyboard controls
  useEffect(() => {
    const onKey = (e) => {
      const key = e.key.toLowerCase();

      // When game is over, only R works
      if (gameStatus !== 'playing') {
        if (key === 'r') resetLevel();
        return;
      }

      const moves = { arrowup: [-1,0], w: [-1,0], arrowdown: [1,0], s: [1,0],
                      arrowleft: [0,-1], a: [0,-1], arrowright: [0,1], d: [0,1] };
      if (moves[key]) {
        e.preventDefault();
        movePlayer(...moves[key]);
      } else if (key === 'o') toggleOverlay();
      else if (key === 'h') toggleHint();
      else if (key === 'r') resetLevel();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gameStatus, movePlayer, toggleOverlay, toggleHint, resetLevel]);

  return (
    <div className="game-container">

      {/* Game over / win overlays */}
      {gameStatus === 'won' && (
        <Modal>
          <ModalCard color="#00b894">
            <h2 style={{ color: '#00b894', margin: '0 0 8px', fontSize: '2rem', fontWeight: 800 }}>ESCAPED! 🎉</h2>
            <p style={{ color: '#f8fafc', margin: '0 0 4px' }}>{message}</p>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0 0 22px' }}>
              Steps: <strong style={{ color: '#a29bfe' }}>{stepCount}</strong>
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="nav-btn restart" onClick={resetLevel}>Retry</button>
              <button className="nav-btn active"  onClick={handleNextLevel}>Next Level →</button>
            </div>
          </ModalCard>
        </Modal>
      )}

      {gameStatus === 'escaped' && (
        <Modal>
          <ModalCard color="#fdcb6e">
            <h1 style={{ color: '#fdcb6e', margin: '0 0 10px', fontSize: '2.8rem', fontWeight: 800 }}>VICTORY! 🏆</h1>
            <p style={{ color: '#f8fafc', margin: '0 0 8px' }}>You escaped the grid!</p>
            <p style={{ color: '#94a3b8', margin: '0 0 26px' }}>
              Final Score: <strong style={{ color: '#fdcb6e' }}>{score}</strong>
            </p>
            <button className="nav-btn active" onClick={resetLevel} style={{ width: '100%', padding: 12 }}>
              Play Again
            </button>
          </ModalCard>
        </Modal>
      )}

      {gameStatus === 'lost' && (
        <Modal>
          <ModalCard color="#d63031">
            <h2 style={{ color: '#d63031', margin: '0 0 8px', fontSize: '2rem', fontWeight: 800 }}>INTERCEPTED 💀</h2>
            <p style={{ color: '#94a3b8', margin: '0 0 22px' }}>{message}</p>
            <button className="nav-btn restart" onClick={resetLevel} style={{ width: '100%', padding: 12 }}>
              Try Again (R)
            </button>
          </ModalCard>
        </Modal>
      )}

      <Navbar
        level={currentLevel} score={score} stepCount={stepCount} gameStatus={gameStatus}
        showOverlay={showOverlay} toggleOverlay={toggleOverlay}
        showHint={showHint}    toggleHint={toggleHint}
        onRestart={resetLevel}
      />

      {hintMessage && gameStatus === 'playing' && <HintBanner hintMessage={hintMessage} />}

      <Grid grid={grid} />
      <InfoPanel level={currentLevel} />
    </div>
  );
}
