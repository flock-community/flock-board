import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Projects } from './feature/projects/Projects';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Welcome to the flock board!
      </header>
      <Projects />
    </div>
  );
}

export default App;
