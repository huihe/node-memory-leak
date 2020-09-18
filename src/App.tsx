import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Memory } from './memory';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Turnstile Memory Leak Issue
        </p>
      </header>
      <Memory/>
    </div>
  );
}

export default App;
