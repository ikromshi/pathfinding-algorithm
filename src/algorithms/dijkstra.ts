import { TypeNode as Node, TypeNode } from "../types/TS-types";

export const dijkstra = (grid: Node[][], startNode: Node, finishNode: Node) => {
  const visitedNodesInOrder: Node[] = [];
  startNode.distance = 0; // The distance to the start node is zero;
  const unvisitedNodes: Node[] = getAllNodes(grid); // Getting an array of all nodes;
  console.log(unvisitedNodes);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode) {
      if (closestNode.isWall) continue; // Skip the loop if the closest node is a wall;
      if (closestNode.distance === Infinity) return visitedNodesInOrder; // If all the closest nodes are walls, stop the loop (animation);
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finishNode) return visitedNodesInOrder;
      updateUnvisitedNeighbors(closestNode, grid);
    }
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
 * Creates a var neighbors - nodes[] -  by calling updateUnvisitedNeighbors() ~ see below;
 * Changes each neighbor's distance to "current_node.distance + 1";
 * @param node closestNode identified by sortNodesByDistance();
 * @param grid rows[] -> nodes[]
 */
function updateUnvisitedNeighbors(node: Node, grid: Node[][]) {
  const unvisitedNeighbors: Node[] = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

/**
 * This function:
 * Gets the immediate surrounding neighbors of the current node and pushes it to the neighbors array;
 * @param node closestNode
 * @param grid rows[] -> nodes[]
 * @returns neighbors: nodes[]
 */
function getUnvisitedNeighbors(node: Node, grid: Node[][]) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

/**
 * This function:
 * Makes use of the "previousNode" property in node objects to trace the shortest path back to the start node;
 * It constructs an array of nodes in the shortest path going from the start node to the end node;
 * @param finishNode
 * @returns nodes in the shortest path;
 */
export function getNodesInShortestPathOrder(finishNode: TypeNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode.previousNode) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

/**
 * >>> The change structure for the nodes' distance:::
 * 1) updateUnvisitedNeighbors() => We take the original grid and pass it down to getUnvisitedNeighbors();
 * 2) getUnvisitedNeighbors() => We gets the first nodes in 4 directions and appends it to a new array;
 * 3) updateUnvisitedNeighbors() => Once the array of neighbor nodes is returned, we change each node's distance to "currNode.dist+1";
 * !! This change, which happens inside a completely different array, is reflected in the original 2D "grids" array;
 * !! This, in turn, is reflected inside the node objects of unvisitedNeighbors + visitedNeighbors arrays;
 */
