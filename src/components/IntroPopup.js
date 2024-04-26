import React from 'react';

function IntroPopup({ onClose }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1000
    }}>
      <div style={{
        padding: '20px', backgroundColor: '#fff', borderRadius: '10px',
        width: '90%', maxWidth: '500px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>Bienvenue sur Mon Portfolio</h2>
        <p style={{ fontSize: '16px', marginBottom: '20px' }}>
          Ce site est actuellement en développement. Certaines fonctionnalités peuvent ne pas être disponibles.
        </p>
        <button onClick={onClose} style={{
          padding: '10px 20px', fontSize: '16px', color: '#fff',
          backgroundColor: '#007BFF', border: 'none', borderRadius: '5px',
          cursor: 'pointer', outline: 'none'
        }}>
          Compris
        </button>
      </div>
    </div>
  );
}

export default IntroPopup;
