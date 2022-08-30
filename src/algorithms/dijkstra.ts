import { TypeNode as Node, TypeNode} from "../types/TS-types";

export const dijkstra = (grid: Node[][], startNode: Node, finishNode: Node) => {
  const visitedNodesInOrder: Node[] = [];
  startNode.distance = 0; // The distance to the start node is zero;
  const unvisitedNodes: Node[] = getAllNodes(grid); // Spits out an array of nodes
  while(!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    /** Handle Walls here
     * 
     * Handle Impossible here
     * 
     * Animate here
     * 
     * Handle the animation of dijkstraVisualize here>>>
     * grid[object] -> number?
     * 
     */
    // closestNode.isVisited = true;
    closestNode && visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    closestNode && updateNeighbors(closestNode, grid);
  };
};

function getAllNodes(grid: TypeNode[][]): TypeNode[] {
  const nodes: Node[] = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    };
  };
  return nodes;
};

function sortNodesByDistance(unvisitedNodes: Node[]) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

function updateNeighbors(node: Node, grid:Node[][]) {
  const neighbors: Node[] = getNeighbors(node, grid);
  for (const neighbor of neighbors) {
    neighbor.distance = node.distance + 1;
  };
};

function getNeighbors(node: Node, grid: Node[][]) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row-1][col]);
  if (row < grid.length-1) neighbors.push(grid[row+1][col]);
  if (col > 0) neighbors.push(grid[row][col-1]);
  if (col < grid[0].length-1) neighbors.push(grid[row][col+1]);
  return neighbors;
};
