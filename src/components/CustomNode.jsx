import React from 'react';
import { Handle, Position } from 'reactflow';
import './CustomNode.css';

const CustomNode = ({ data }) => {
  const { label, nodeType, path, isHighlighted, value } = data;

  const getNodeClass = () => {
    let baseClass = 'custom-node';
    if (nodeType === 'object') baseClass += ' object-node';
    else if (nodeType === 'array') baseClass += ' array-node';
    else baseClass += ' primitive-node';
    
    if (isHighlighted) baseClass += ' highlighted';
    
    return baseClass;
  };

  const getNodeIcon = () => {
    if (nodeType === 'object') return '📦';
    if (nodeType === 'array') return '📋';
    return '🔹';
  };

  const handleNodeClick = () => {
    if (path) {
      navigator.clipboard.writeText(path);
      const tooltip = document.createElement('div');
      tooltip.className = 'copy-tooltip';
      tooltip.textContent = '✓ Path copied!';
      document.body.appendChild(tooltip);
      setTimeout(() => tooltip.remove(), 2000);
    }
  };

  return (
    <div className={getNodeClass()} onClick={handleNodeClick} title={`Path: ${path}\nValue: ${value}\n\nClick to copy path`}>
      <Handle type="target" position={Position.Top} className="custom-handle" />
      <div className="node-content">
        <div className="node-icon">{getNodeIcon()}</div>
        <div className="node-info">
          <div className="node-label">{label}</div>
          <div className="node-value">{value}</div>
          <div className="node-path">{path}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="custom-handle" />
    </div>
  );
};

export default CustomNode;
