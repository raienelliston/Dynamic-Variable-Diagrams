// src/App.js
import React from 'react';
import Diagram from './components/Diagram';
import Overlay from './components/Overlay';
import { ArcherContainer, ArcherElement } from 'react-archer';
import './App.css';

function App() {
  return (
    <div className="App">
      <ArcherContainer strokeColor="red" strokeWidth={1} className="custom-archer-container">
        <Overlay />
        <Diagram/>
      </ArcherContainer>
    </div>
  );
}

export default App;