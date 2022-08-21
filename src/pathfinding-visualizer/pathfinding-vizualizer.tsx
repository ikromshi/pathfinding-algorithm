import { useEffect, useState } from "react";
import Node from "./node/node";

export type CurrentNode = {
  col: number;
  row: number;
  isStart: boolean;
  isFinish: boolean;
};

const PathfindingVisualizer = () => {
  const [nodes, setNodes] = useState<CurrentNode[][]>([]);

  useEffect(() => {
    const nodes = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        const currentNode: CurrentNode = {
          col,
          row,
          isStart: row === 10 && col === 5,
          isFinish: row === 10 && col === 45,
        };

        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
      setNodes(nodes);
    }
  }, []);

  return (
    <div className="grid">
      {nodes.map((row, rowIdx) => {
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
  );
};

export default PathfindingVisualizer;
