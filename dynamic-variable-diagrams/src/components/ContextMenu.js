import React from 'react';
import styled from 'styled-components';

const Menu = styled.div`
  position: absolute;
  background: whitesmoke;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;

const ContextMenu = ({ items, position, onClose }) => {
  return (
    <Menu style={{ top: position.y, left: position.x }}>
      {items.map((item, index) => (
        <MenuItem key={index} onClick={() => {
          item.onClick();
          onClose();
        }}>
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default ContextMenu;