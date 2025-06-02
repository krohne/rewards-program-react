import React from 'react';
import '../App.css'

// Header component that displays the Vite and React logos
export default function Header() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ margin: '0.5em 0 0.25em', fontSize: '2.2em', fontWeight: 700 }}>
        Rewards Program Demo
      </h1>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={process.env.NODE_ENV === 'test' ? '/vite.svg' : '/vite.svg'} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={process.env.NODE_ENV === 'test' ? '/src/assets/react.svg' : '/src/assets/react.svg'} className="logo react" alt="React logo" />
        </a>
      </div>
      <h2 style={{ margin: '0.5em 0 0.25em', fontSize: '1.3em', fontWeight: 500, color: '#535bf2' }}>
        Homework Assignment
      </h2>
    </div>
  )
}
