// src/components/ContainerModifier.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateContainer } from '../store/actions';

const ContainerModifier = () => {
  const containers = useSelector((state) => state.diagram.containers);
  const dispatch = useDispatch();
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [newName, setNewName] = useState('');

  const handleSelectChange = (event) => {
    const containerId = Number(event.target.value);
    const container = containers.find((container) => container.id === containerId);
    setSelectedContainer(container);
    setNewName(container?.name || '');
  };

  const handleUpdateContainer = () => {
    if (selectedContainer && newName) {
      dispatch(updateContainer({ ...selectedContainer, name: newName }));
    }
  };

  return (
    <div>
      <select onChange={handleSelectChange}>
        <option value="">Select Container</option>
        {containers.map((container) => (
          <option key={container.id} value={container.id}>
            {container.name}
          </option>
        ))}
      </select>
      {selectedContainer && (
        <div>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleUpdateContainer}>Update Container</button>
        </div>
      )}
    </div>
  );
};

export default ContainerModifier;