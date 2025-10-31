export const buildTreeFromJSON = (jsonData) => {
  const nodes = [];
  const edges = [];
  let nodeId = 0;

  const getNodeType = (value) => {
    if (value === null) return 'primitive';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object') return 'object';
    return 'primitive';
  };

  const getSubtreeWidth = (obj) => {
    const type = getNodeType(obj);
    if (type === 'primitive') return 1;
    if (type === 'object') {
      return Object.values(obj).reduce((sum, val) => sum + getSubtreeWidth(val), 0) || 1;
    }
    if (type === 'array') {
      return obj.reduce((sum, val) => sum + getSubtreeWidth(val), 0) || 1;
    }
    return 1;
  };

  const createNode = (key, value, path, parentId = null, x = 0, y = 0) => {
    const id = `node-${nodeId++}`;
    const type = getNodeType(value);
    
    let label = '';
    let nodeValue = value;
    
    if (type === 'object') {
      const keys = Object.keys(value);
      label = key || 'ROOT';
      nodeValue = `{ ${keys.length} ${keys.length === 1 ? 'property' : 'properties'} }`;
    } else if (type === 'array') {
      label = key || 'ARRAY';
      nodeValue = `[ ${value.length} ${value.length === 1 ? 'item' : 'items'} ]`;
    } else {
      label = key || 'value';
      nodeValue = JSON.stringify(value);
    }

    nodes.push({
      id,
      type: 'custom',
      data: { 
        label, 
        nodeType: type, 
        value: nodeValue,
        path,
        key,
        fullValue: value
      },
      position: { x, y },
    });

    if (parentId) {
      edges.push({
        id: `edge-${parentId}-${id}`,
        source: parentId,
        target: id,
        type: 'smoothstep',
      });
    }

    return { id, type };
  };

  const traverse = (obj, key, path, parentId = null, level = 0, offsetX = 0) => {
    const horizontalSpacing = 350;
    const verticalSpacing = 200;
    
    const subtreeWidth = getSubtreeWidth(obj);
    const nodeX = offsetX + (subtreeWidth * horizontalSpacing) / 2;
    const nodeY = level * verticalSpacing;

    const { id, type } = createNode(key, obj, path, parentId, nodeX, nodeY);

    if (type === 'object') {
      let currentOffsetX = offsetX;
      for (const [k, v] of Object.entries(obj)) {
        const newPath = path ? `${path}.${k}` : k;
        const childWidth = getSubtreeWidth(v);
        traverse(v, k, newPath, id, level + 1, currentOffsetX);
        currentOffsetX += childWidth * horizontalSpacing;
      }
    } else if (type === 'array') {
      let currentOffsetX = offsetX;
      obj.forEach((item, idx) => {
        const newPath = `${path}[${idx}]`;
        const childWidth = getSubtreeWidth(item);
        traverse(item, `[${idx}]`, newPath, id, level + 1, currentOffsetX);
        currentOffsetX += childWidth * horizontalSpacing;
      });
    }
  };

  traverse(jsonData, null, '$', null, 0, 0);

  return { nodes, edges };
};

export const searchNodeByPath = (nodes, searchPath) => {
  if (!searchPath || searchPath.trim() === '') return null;
  
  const normalizedSearch = searchPath.trim().toLowerCase();
  
  return nodes.find(node => {
    const nodePath = node.data.path?.toLowerCase();
    return nodePath === normalizedSearch || nodePath?.includes(normalizedSearch);
  });
};
