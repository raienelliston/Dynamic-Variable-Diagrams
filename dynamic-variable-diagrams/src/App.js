// src/App.js
import React from 'react';
import Diagram from './components/Diagram';
import ContainerModifier from './components/ContainerModifier';
import Overlay from './components/Overlay';
import './App.css';

function App() {
  return (
    <div className="App">
        <Overlay />
        <Diagram />
        <ContainerModifier />
    </div>
  );
}

export default App;