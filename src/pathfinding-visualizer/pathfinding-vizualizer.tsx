import { useEffect, useState } from "react";
import { Fragment } from "react";
import Node from "./node/node";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export type CurrentNode = {
  col: number;
  row: number;
  isStart: boolean;
  isFinish: boolean;
};

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState<CurrentNode[][]>([]);

  /**
   * Construct the initial grid and pass it down to the Node component ~
   * in the return block to build each individual cell;
   */
  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  function visualizeDijkstra() {}

  return (
    <Fragment>
      <button onClick={() => visualizeDijkstra()}>
        Visualize Dijkstra's Algorithm
      </button>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { isStart, isFinish } = node;
                return (
                  <Node key={nodeIdx} isStart={isStart} isFinish={isFinish} />
                );
              })}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

function getInitialGrid() {
  const grid: CurrentNode[][] = [];
  for (let row = 0; row < 20; row++) {
    const currentRow: CurrentNode[] = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
}

function createNode(col: number, row: number) {
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
