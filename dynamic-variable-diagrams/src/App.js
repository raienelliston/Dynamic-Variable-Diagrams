// src/App.js
import React from 'react';
import Diagram from './components/Diagram';
import NodeModifier from './components/NodeModifier';
import './App.css';

function App() {
  return (
    <div className="App">
        <Diagram />
        <NodeModifier />
    </div>
  );
}

export default App;