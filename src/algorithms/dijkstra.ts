export type Node = {
  row: number;
  col: number;
  isVisited: boolean;
  distance: number;
};

// const node: Node = {
//   row, col, isVisited, distance
// };

const dijkstra = (nodes: Node[], startNode: number, finishNode: number) => {
  if (!startNode || !finishNode || startNode === finishNode) return false;
  
  nodes[startNode].distance = 0;
  const unvisitedNodes = nodes.slice();
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
     */
    if (closestNode) {
      closestNode.isVisited = true;
    };

    // BUG!!!! Is node a number of Obj????
    if (closestNode === finishNode) return "success";
    /**
     * Update neighbors here
     */
  };
};

// Sort nodes in ascending order depending on their distance;
const sortNodesByDistance = (unvisitedNodes: Node[]) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};