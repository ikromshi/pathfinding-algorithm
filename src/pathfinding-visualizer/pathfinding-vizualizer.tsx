import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { Button } from "./pathfinding-visalizer.styles";
import { TypeNode } from "../types/TS-types";
import { useEffect, useState } from "react";
import Grid from "../components/grid/grid";
import { Fragment } from "react";

const START_NODE_ROW = 12;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 12;
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

  /**
   * This function:
   * Is responsible for turning nodes into walls (and vise versa) when the user clicks on them;
   * It receives the location of a node gets the "isWall" property toggled;;
   * Updates the state with a new grid and a "true" value for "mouseIsPressed";
   * @param row
   * @param col
   */
  function handleMouseDown(row: number, col: number) {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  }

  /**
   * This function:
   * Is responsible for turning nodes into walls (and vice versa) when user clicks and drags the mouse across the grid;
   * It takes the location of a node and gets the "isWall" property toggled;
   * Updates the state with a new grid
   * @param row
   * @param col
   * @returns
   */
  function handleMouseEnter(row: number, col: number) {
    if (!mouseIsPresses) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid); //!!! Maybe optimize this ????
  }

  /**
   * This function:
   * Updates the state with a "false" value for "mouseIsPressed";
   */
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
        }, 5 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`)!.className =
          "node node-visited"; // USE REACT REF HERE;
      }, 5 * i);
    }
  }

  /**
   * This function:
   * Is responsible for animating the shortest path once the dijkstra animation is complete;
   * It updates the class names of all the nodes in the shortest path, which will trigger node.css to change their color to a shade of yellow;
   * @param nodesInShortestPathOrder
   */
  function animateShortestPath(nodesInShortestPathOrder: TypeNode[]) {
    let animationSpeed = nodesInShortestPathOrder.length > 40 ? 30 : 75;
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`)!.className =
          "node node-shortest-path "; // USE REACT REF HERE;
      }, animationSpeed * i);
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
      <Button onClick={() => visualizeDijkstra()}>
        Visualize Dijkstra's Algorithm
      </Button>
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
  for (let row = 0; row < 24; row++) {
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
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
}

/**
 * This function:
 * Creates a new variable for the grid copy;
 * Accesses a specific node and toggles the "isWall" property;
 * Puts the node and the remaining nodes into the new grid variable;
 * Returns the new grid variable;
 * @param grid
 * @param row
 * @param col
 * @returns
 */
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
