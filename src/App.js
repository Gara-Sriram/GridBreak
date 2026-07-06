import React, { useEffect } from 'react';
import Grid from './components/Grid';
import Navbar from './components/Navbar';
import InfoPanel from './components/InfoPanel';
import { useGame } from './hooks/useGame';

export default function App() {
  const {
    currentLevel, score, movesLeft, gameStatus, message,
    showBFS, showDangerZones, showFloodFill, showHint,
    isDeadEnd, hintMessage, grid, isAnimating,
    toggleBFS, toggleDanger, toggleZones, toggleHint,
    resetLevel, handleNextLevel, movePlayer
  } = useGame();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isAnimating) return;
      let dRow = 0, dCol = 0;
      switch (e.key.toLowerCase()) {
        case 'arrowup': case 'w': dRow = -1; e.preventDefault(); break;
        case 'arrowdown': case 's': dRow = 1; e.preventDefault(); break;
        case 'arrowleft': case 'a': dCol = -1; e.preventDefault(); break;
        case 'arrowright': dCol = 1; e.preventDefault(); break;
        case 'd':
          if (e.shiftKey) toggleDanger();
          else { dCol = 1; e.preventDefault(); }
          break;
        case 'b': toggleBFS(); return;
        case 'f': toggleZones(); return;
        case 'h': toggleHint(); return;
        case 'r': resetLevel(); return;
        default: return;
      }
      if (gameStatus === 'playing' && (dRow !== 0 || dCol !== 0)) {
        movePlayer(dRow, dCol);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer, resetLevel, gameStatus, isAnimating, toggleBFS, toggleDanger, toggleZones, toggleHint]);

  return (
    <div className="game-container">
      {gameStatus !== 'playing' && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          zIndex: 100, animation: 'fadeIn 0.3s ease', borderRadius: '12px'
        }}>
          {gameStatus === 'won' && (
            <div style={{
              background: '#1e293b', border: '2px solid #00b894', padding: '30px 40px', borderRadius: '16px',
              textAlign: 'center', boxShadow: '0 0 20px rgba(0, 184, 148, 0.3)', width: '350px'
            }}>
              <h2 style={{ color: '#00b894', margin: '0 0 10px 0', fontSize: '2rem', fontWeight: '800' }}>LEVEL CLEARED!</h2>
              <p style={{ color: '#f8fafc', fontSize: '1.1rem', margin: '0 0 20px 0' }}>Score gained: <span style={{ color: '#fdcb6e', fontWeight: 'bold' }}>{movesLeft * 10}</span></p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="nav-btn restart" onClick={resetLevel}>Retry</button>
                <button className="nav-btn active" onClick={handleNextLevel}>Next Level</button>
              </div>
            </div>
          )}
          {gameStatus === 'lost' && (
            <div style={{
              background: '#1e293b', border: '2px solid #d63031', padding: '30px 40px', borderRadius: '16px',
              textAlign: 'center', boxShadow: '0 0 20px rgba(214, 48, 49, 0.3)', width: '350px'
            }}>
              <h2 style={{ color: '#d63031', margin: '0 0 10px 0', fontSize: '2rem', fontWeight: '800' }}>GAME OVER</h2>
              <p style={{ color: '#94a3b8', fontSize: '1rem', margin: '0 0 20px 0' }}>{message}</p>
              <button className="nav-btn restart" onClick={resetLevel} style={{ width: '100%', padding: '10px' }}>Try Again (R)</button>
            </div>
          )}
          {gameStatus === 'escaped' && (
            <div style={{
              background: '#1e293b', border: '2px solid #fdcb6e', padding: '35px 45px', borderRadius: '16px',
              textAlign: 'center', boxShadow: '0 0 25px rgba(253, 203, 110, 0.4)', width: '400px'
            }}>
              <h1 style={{ color: '#fdcb6e', margin: '0 0 10px 0', fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.05em' }}>VICTORY!</h1>
              <p style={{ color: '#f8fafc', fontSize: '1.2rem', margin: '0 0 10px 0' }}>You escaped the grid maze!</p>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: '0 0 25px 0' }}>Final Score: <span style={{ color: '#fdcb6e', fontWeight: 'bold' }}>{score}</span></p>
              <button className="nav-btn active" onClick={resetLevel} style={{ width: '100%', padding: '10px' }}>Play Again</button>
            </div>
          )}
        </div>
      )}

      <Navbar
        level={currentLevel} score={score} movesLeft={movesLeft} gameStatus={gameStatus}
        showBFS={showBFS} toggleBFS={toggleBFS} showDanger={showDangerZones} toggleDanger={toggleDanger}
        showZones={showFloodFill} toggleZones={toggleZones} showHint={showHint} toggleHint={toggleHint}
        onRestart={resetLevel}
      />

      {isDeadEnd && gameStatus === 'playing' && (
        <div style={{
          backgroundColor: 'rgba(214, 48, 49, 0.25)', color: '#d63031', border: '2px dashed #d63031', padding: '10px 20px',
          borderRadius: '6px', marginBottom: '15px', width: '600px', textAlign: 'center', fontWeight: 'bold',
          animation: 'flash 1.5s infinite', fontFamily: 'JetBrains Mono', fontSize: '0.9rem', boxSizing: 'border-box'
        }}>
          ⚠️ Warning: No safe path to exit! (Trapped)
        </div>
      )}

      {hintMessage && gameStatus === 'playing' && (
        <div style={{
          backgroundColor: 'rgba(162, 155, 254, 0.15)', color: '#a29bfe', border: '1px solid #a29bfe', padding: '10px 20px',
          borderRadius: '6px', marginBottom: '15px', width: '600px', textAlign: 'center', fontWeight: 'bold',
          fontFamily: 'JetBrains Mono', fontSize: '0.9rem', boxSizing: 'border-box'
        }}>
          💡 DP Hint: {hintMessage}
        </div>
      )}

      <Grid grid={grid} />
      <InfoPanel level={currentLevel} />
    </div>
  );
}
