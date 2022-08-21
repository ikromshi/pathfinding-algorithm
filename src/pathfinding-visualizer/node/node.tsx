import "./node.css";
import { CurrentNode } from "../pathfinding-vizualizer";

type Node = {
  node: CurrentNode;
};

const Node = () => {
  return <div className="node"></div>;
};

export default Node;
