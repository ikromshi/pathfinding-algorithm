import { TypeNode } from "../../types/TS-types";
import { FC } from "react";
import Node from "../node/node";

type NodeProps = {
  grid: TypeNode[][];
  mouseIsPressed: boolean;
  handleMouseDown: (row: number, col: number) => void;
  handleMouseEnter: (row: number, col: number) => void;
  handleMouseUp: () => void;
};

const Grid: FC<NodeProps> = ({
  grid,
  mouseIsPressed,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
}) => {
  return (
    <div className="grid">
      {grid.map((row, rowIdx) => (
        <div key={rowIdx}>
          {row.map((node, nodeIdx) => {
            const { row, col, isWall, isStart, isFinish, isVisited } = node;
            return (
              <Node
                key={nodeIdx}
                row={row}
                col={col}
                isWall={isWall}
                isStart={isStart}
                isFinish={isFinish}
                isVisited={isVisited}
                mouseIsPressed={mouseIsPressed}
                handleMouseUp={handleMouseUp}
                handleMouseDown={handleMouseDown}
                handleMouseEnter={handleMouseEnter}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
