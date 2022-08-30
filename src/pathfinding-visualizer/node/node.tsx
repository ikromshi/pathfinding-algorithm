import "./node.css";

type NodeEnds = {
  isStart: boolean;
  isFinish: boolean;
  isVisited: boolean;
};

const Node = ({ isStart, isFinish, isVisited }: NodeEnds) => {
  const extraClassname = isStart
    ? "node-start"
    : isFinish
    ? "node-finish"
    : isVisited
    ? "node-visited"
    : "";

  return <div className={`node ${extraClassname}`}></div>;
};

export default Node;
