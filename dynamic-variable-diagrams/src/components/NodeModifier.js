// src/components/NodeModifier.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateNode } from '../store/actions';

const NodeModifier = () => {
  const nodes = useSelector((state) => state.diagram.nodes);
  const dispatch = useDispatch();
  const [selectedNode, setSelectedNode] = useState(null);
  const [newName, setNewName] = useState('');

  const handleSelectChange = (event) => {
    const nodeId = Number(event.target.value);
    const node = nodes.find((node) => node.id === nodeId);
    setSelectedNode(node);
    setNewName(node?.name || '');
  };

  const handleUpdateNode = () => {
    if (selectedNode && newName) {
      dispatch(updateNode({ ...selectedNode, name: newName }));
    }
  };

  return (
    <div>
      <select onChange={handleSelectChange}>
        <option value="">Select Node</option>
        {nodes.map((node) => (
          <option key={node.id} value={node.id}>
            {node.name}
          </option>
        ))}
      </select>
      {selectedNode && (
        <div>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleUpdateNode}>Update Node</button>
        </div>
      )}
    </div>
  );
};

export default NodeModifier;