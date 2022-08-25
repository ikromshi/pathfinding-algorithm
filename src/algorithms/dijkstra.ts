import { TypeNode as Node, TypeNode} from "../types/TS-types";

export const dijkstra = (grid: Node[][], startNode: Node, finishNode: Node) => {
  const visitedNodesInOrder: Node[] = [];
  startNode.distance = 0;
  const unvisitedNodes: Node[] = getAllNodes(grid);
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
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finishNode) return visitedNodesInOrder;
      updateUnvisitedNeighbors(closestNode, grid);
    };
  };
};

function getAllNodes(grid: TypeNode[][]): TypeNode[] {
  const nodes = [];
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

function updateUnvisitedNeighbors(node: Node, grid:Node[][]) {
  const neighbors:any = []
  // getUnvisitedNeighbors(node, grid);
  for (const neighbor of neighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  };
};

/**
function getUnvisitedNeighbors(node: Node, grid: Node[]) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row-1][col]);
  if (row < grid.length-1) neighbors.push(grid[row+1][col]);
  if (col > 0) neighbors.push(grid[row][col-1]);
  if (col < grid[0].length-1) neighbors.push(grid[row][col+1]);
  return neighbors;
};
*/