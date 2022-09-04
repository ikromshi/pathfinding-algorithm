import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { TypeNode } from "../types/TS-types";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import Grid from "../components/grid/grid";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState<TypeNode[][]>([]);
  const [mouseIsPresses, setMouseIsPressed] = useState<boolean>(false);

  /**
   * Constructs the initial grid and passes it down to the Node component ~
   * in the return block to build each individual cell;
   */
  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  function handleMouseDown(row: number, col: number) {
    const node = grid[row][col];
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid); //!!! Optimize this !!!
    setMouseIsPressed(true);
  }

  function handleMouseEnter(row: number, col: number) {
    if (!mouseIsPresses) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  }

  function handleMouseUp() {
    setMouseIsPressed(false);
  }

  /**
   * Loops through a list of nodes;
   * Creates a copy of the existing grid;
   * Creates a new node - setting the isVisited property to true;
   * Replaces the new node with the old one in the new grid;
   * Gives the new node a
   * @param visitedNodesInOrder an array of nodes
   */
  function animateDijkstra(
    visitedNodesInOrder: TypeNode[],
    nodesInShortestPathOrder: TypeNode[]
  ) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`)!.className =
          "node node-visited";
      }, 10 * i);
    }
  }

  function animateShortestPath(nodesInShortestPathOrder: TypeNode[]) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`)!.className =
          "node node-shortest-path ";
      }, 35 * i);
    }
  }

  /**
   * Creates variables for the start and end nodes;
   * Calls the dijkstra function that spits out an array of visited nodes in order;
   * Calls the function above to animate the individual nodes;
   */
  function visualizeDijkstra() {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    visitedNodesInOrder &&
      animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  return (
    <Fragment>
      <button onClick={() => visualizeDijkstra()}>
        Visualize Dijkstra's Algorithm
      </button>
      <Grid
        grid={grid}
        handleMouseDown={handleMouseDown}
        handleMouseEnter={handleMouseEnter}
        handleMouseUp={handleMouseUp}
        mouseIsPressed={mouseIsPresses}
      />
    </Fragment>
  );
};

/**
 * Creates an array of rows with nodes inside - objects
 * @returns the grid with 20 rows and 50 columns
 */
function getInitialGrid(): TypeNode[][] {
  const grid: TypeNode[][] = [];
  for (let row = 0; row < 20; row++) {
    const currentRow: TypeNode[] = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
}

/**
 * Creates a node for the rows in the grid
 * @param col 0 - 40
 * @param row 0 - 19
 * @returns a node (object)
 */
function createNode(col: number, row: number): TypeNode {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col == FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
}

function getNewGridWithWallToggled(
  grid: TypeNode[][],
  row: number,
  col: number
): TypeNode[][] {
  const newGrid = grid.slice();
  const node = grid[row][col];
  const newNode = { ...node, isWall: !node.isWall };
  newGrid[row][col] = newNode;
  return newGrid;
}

export default PathfindingVisualizer;
