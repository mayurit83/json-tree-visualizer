import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './components/CustomNode';
import { buildTreeFromJSON, searchNodeByPath } from './utils/jsonToTree';
import './App.css';

const nodeTypes = {
  custom: CustomNode,
};

const sampleJSON = {
  
  "user": {
    "id": 1,
    "name": "John Doe",
    "address": {
      "city": "New York",
      "country": "USA"
    },
    "items": [
      {
        "name": "item1"
      },
      {
        "name": "item2"
      }
    ]
  }
}


function App() {
  const [jsonInput, setJsonInput] = useState(JSON.stringify(sampleJSON, null, 2));
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const visualizeJSON = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonInput);
      setError('');
      const { nodes: newNodes, edges: newEdges } = buildTreeFromJSON(parsed);
      
      const edgesWithMarkers = newEdges.map(edge => ({
        ...edge,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 25,
          height: 25,
          color: '#6366f1',
        },
        style: { 
          strokeWidth: 3,
          stroke: '#6366f1',
        },
        animated: false,
      }));

      setNodes(newNodes);
      setEdges(edgesWithMarkers);
      setSearchMessage('');
      
      setTimeout(() => {
        if (reactFlowInstance) {
          reactFlowInstance.fitView({ padding: 0.2, duration: 800 });
        }
      }, 100);
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setNodes([]);
      setEdges([]);
    }
  }, [jsonInput, setNodes, setEdges, reactFlowInstance]);

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setSearchMessage('');
      const updatedNodes = nodes.map(node => ({
        ...node,
        data: { ...node.data, isHighlighted: false }
      }));
      setNodes(updatedNodes);
      return;
    }

    const foundNode = searchNodeByPath(nodes, searchQuery);
    
    if (foundNode) {
      const updatedNodes = nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          isHighlighted: node.id === foundNode.id
        }
      }));
      setNodes(updatedNodes);
      setSearchMessage('Match found!');
      
      if (reactFlowInstance) {
        reactFlowInstance.setCenter(
          foundNode.position.x + 100,
          foundNode.position.y + 50,
          { zoom: 1.5, duration: 800 }
        );
      }
    } else {
      setSearchMessage('No match found');
      const updatedNodes = nodes.map(node => ({
        ...node,
        data: { ...node.data, isHighlighted: false }
      }));
      setNodes(updatedNodes);
    }
  }, [searchQuery, nodes, setNodes, reactFlowInstance]);

  const handleClear = useCallback(() => {
    setJsonInput('');
    setNodes([]);
    setEdges([]);
    setError('');
    setSearchQuery('');
    setSearchMessage('');
  }, [setNodes, setEdges]);

  const handleReset = useCallback(() => {
    setJsonInput(JSON.stringify(sampleJSON, null, 2));
    setSearchQuery('');
    setSearchMessage('');
    visualizeJSON();
  }, [visualizeJSON]);

  const downloadAsImage = useCallback(() => {
    if (!reactFlowInstance) return;
    
    const canvas = document.querySelector('.react-flow__viewport');
    if (!canvas) return;

    import('html-to-image').then(({ toPng }) => {
      toPng(canvas)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'json-tree.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error('Failed to download image:', err);
        });
    });
  }, [reactFlowInstance]);

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <div className="header">
        <h1>JSON Tree Visualizer</h1>
        <button 
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle dark mode"
        >
          {darkMode ? '🌙Dark' : '🌙Dark'}
        </button>
      </div>

      <div className="main-content">
        <div className="input-panel">
          <div className="panel-header">
            <h2>JSON Input</h2>
            <div className="button-group">
              <button onClick={handleClear} className="btn btn-danger">
                Clear All
              </button>
            </div>
          </div>
          
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="json-input"
          />
          
          {error && <div className="error-message">{error}</div>}
          
          <button onClick={visualizeJSON} className="btn btn-primary btn-large">
             Generate Tree
          </button>

          <div className="search-section">
            <h3>Search by JSON Path</h3>
            <div className="search-container">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="e.g., $.user.address.city or items[0].name"
                className="search-input"
              />
              <button onClick={handleSearch} className="btn btn-primary">
                 Search
              </button>
            </div>
            {searchMessage && (
              <div className={`search-message ${searchMessage.includes('found!') ? 'success' : 'warning'}`}>
                {searchMessage}
              </div>
            )}
          </div>

          <div className="info-section">
            <h3>ℹ️ Quick Guide </h3>
            <ul>
              <li><strong>Objects</strong>: Blue/Purple nodes</li>
              <li><strong>Arrays</strong>: Green nodes</li>
              <li><strong>Primitives</strong>: Orange/Yellow nodes</li>
              
            </ul>
          </div>
        </div>

        <div className="visualization-panel">
          <div className="panel-header">
            <h2>Tree Visualization</h2>
            <button onClick={downloadAsImage} className="btn btn-secondary" title="Download as image">
               Download
            </button>
          </div>
          
          <div className="react-flow-wrapper">
            {nodes.length > 0 ? (
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="bottom-left"
              >
                <Background />
                <Controls />
              </ReactFlow>
            ) : (
              <div className="empty-state">
                <p> Enter JSON and click "Generate Tree" to visualize</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
