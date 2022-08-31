import { TypeNode as Node, TypeNode } from "../types/TS-types";

export const dijkstra = (grid: Node[][], startNode: Node, finishNode: Node) => {
  const visitedNodesInOrder: Node[] = [];
  startNode.distance = 0; // The distance to the start node is zero;
  const unvisitedNodes: Node[] = getAllNodes(grid); // Spits out an array of nodes
  while (!!unvisitedNodes.length) {
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
  }
};

/**
 * This function:
 * Constructs an array of nodes taken from the original grid;
 * @param grid rows[] -> nodes[]
 * @returns an array of nodes
 */
function getAllNodes(grid: TypeNode[][]): TypeNode[] {
  const nodes: Node[] = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

/**
 * This function:
 * Sorts nodes in an array in an ascending order depending on their cost (distance);
 * @param unvisitedNodes nodes[]
 */
function sortNodesByDistance(unvisitedNodes: Node[]) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

/**
 * !! >> Look at the bottom of the page to get better insight into the change structure:
 * This function:
 * Creates a var neighbors - nodes[] -  by calling updateNeighbors() ~ see below;
 * Changes each neighbor's distance to "current_node.distance + 1";
 * @param node closestNode identified by sortNodesByDistance();
 * @param grid rows[] -> nodes[]
 */
function updateNeighbors(node: Node, grid: Node[][]) {
  const neighbors: Node[] = getNeighbors(node, grid);
  for (const neighbor of neighbors) {
    neighbor.distance = node.distance + 1;
  }
}

/**
 * This function:
 * Gets the immediate surrounding neighbors of the current node and pushes it to the neighbors array;
 * @param node closestNode
 * @param grid rows[] -> nodes[]
 * @returns neighbors: nodes[]
 */
function getNeighbors(node: Node, grid: Node[][]) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
}

/**
 * >>> The change structure for the nodes' distance:::
 * 1) updateNeighbors() => We take the original grid and pass it down to getNeighbors();
 * 2) getNeighbors() => We gets the first nodes in 4 directions and appends it to a new array;
 * 3) updateNeighbors() => Once the array of neighbor nodes is returned, we change each node's distance to "currNode.dist+1";
 * !! This change, which happens inside a completely different array, is reflected in the original 2D "grids" array;
 * !! This, in turn, is reflected inside the node objects of unvisitedNeighbors + visitedNeighbors arrays;
 */
