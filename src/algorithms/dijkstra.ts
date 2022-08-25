export type Node = {
  row: number;
  col: number;
  isVisited: boolean;
  distance: number;
};

const dijkstra = (grid: Node[], startNode: {}, finishNode: {}) => {
  if (!startNode || !finishNode || startNode === finishNode) return false;
  
  // Every node's distance - except the start node - is infinity initially
  grid[startNode].distance = 0;
  const unvisitedNodes = grid.slice();
  while(!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    /** Handle Walls here
     * 
     * 
     * 
     * Handle Impossible here
     * 
     * 
     * 
     * Animate here
     * 
     * 
     * 
     * 
     * 
     * 
     * Handle the animation of dijkstraVisualize here>>>
     * grid[object] -> number?
     * 
     */

    if (closestNode) {
      closestNode.isVisited = true;
    };

    // Come back to this abomination later pls
    if (closestNode === finishNode) return "success";
    closestNode && updateNeighbors(closestNode, grid);
  };
};

// Sort grid in ascending order depending on their distance;
const sortNodesByDistance = (unvisitedNodes: Node[]) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

function updateNeighbors(node: Node, grid:Node[]) {
  const neighbors = getNeighbors(node, grid);
  for (const neighbor of neighbors) {
    neighbor.distance = node.distance + 1;
  };
};

function getNeighbors(node: Node, table: Node[]) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(table[row-1][col]);
  if (row < table.length-1) neighbors.push(table[row+1][col]);
  if (col > 0) neighbors.push(table[row][col-1]);
  if (col < table[0].length-1) neighbors.push(table[row][col+1]);
  return neighbors;
};