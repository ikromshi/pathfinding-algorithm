import { useEffect, useState } from "react";
import Node from "./node/node";

const PathfindingVisualizer = () => {
  const [nodes, setNodes] = useState<[][][][]>([]);

  useEffect(() => {
    const nodes = [];
    for (let row=0; row<20; row++) {
      const currentRow = [];
      for (let col=0; col<50; col++) {
        currentRow.push([]);
      };
      nodes.push(currentRow);
      setNodes(nodes);
    };
  }, []);

  return (
    <div className="grid">
      {nodes.map((row, rowIdx) => {
        return <div key={rowIdx}>
          {row.map((node, nodeIdx) => <Node key={nodeIdx}/>)}
        </div>
      })}
    </div>
  );
};

export default PathfindingVisualizer;