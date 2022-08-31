import { dijkstra } from "../algorithms/dijkstra";
import { TypeNode } from "../types/TS-types";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import Node from "./node/node";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState<TypeNode[][]>([]);

  /**
   * Constructs the initial grid and passes it down to the Node component ~
   * in the return block to build each individual cell;
   */
  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  /**
   * Loops through a list of nodes;
   * Creates a copy of the existing grid;
   * Creates a new node - setting the isVisited property to true;
   * Replaces the new node with the old one in the new grid;
   * Updates the state - rendering the Node component
   * @param visitedNodesInOrder an array of nodes
   */
  function animateDijkstra(visitedNodesInOrder: TypeNode[]) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const newGrid = grid.slice();
        const newNode = { ...node, isVisited: true };
        newGrid[node.row][node.col] = newNode;
        setGrid(newGrid);
      }, 25 * i);
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
    visitedNodesInOrder && animateDijkstra(visitedNodesInOrder);
  }

  return (
    <Fragment>
      <button onClick={() => visualizeDijkstra()}>
        Visualize Dijkstra's Algorithm
      </button>
      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { isStart, isFinish, isVisited } = node;
              return (
                <Node
                  key={nodeIdx}
                  isStart={isStart}
                  isFinish={isFinish}
                  isVisited={isVisited}
                />
              );
            })}
          </div>
        ))}
      </div>
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
    previousNode: false,
  };
}

export default PathfindingVisualizer;
