import { TypeNode } from "../../types/TS-types";
import { GridStyles } from "./grid-styles";
import Node from "../node/node";
import { FC } from "react";

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
    <GridStyles>
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
                mouseIsPressed={mouseIsPressed}
                handleMouseUp={handleMouseUp}
                handleMouseDown={handleMouseDown}
                handleMouseEnter={handleMouseEnter}
              />
            );
          })}
        </div>
      ))}
    </GridStyles>
  );
};

export default Grid;
