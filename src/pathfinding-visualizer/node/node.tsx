import "./node.css";
import { CurrentNode } from "../pathfinding-vizualizer";

type NodeEnds = {
  isStart: boolean;
  isFinish: boolean;
};

const Node = ({ isStart, isFinish }: NodeEnds) => {
  const extraClassname = isStart ? "node-start" : isFinish ? "node-finish" : "";

  return <div className={`node ${extraClassname}`}></div>;
};

export default Node;
