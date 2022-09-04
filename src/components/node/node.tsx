import "./node.css";

type NodeEnds = {
  handleMouseEnter: (row: number, col: number) => void;
  handleMouseDown: (row: number, col: number) => void;
  handleMouseUp: () => void;
  mouseIsPressed: boolean;
  // isVisited: boolean;
  isFinish: boolean;
  isStart: boolean;
  isWall: boolean;
  row: number;
  col: number;
};

const Node = ({
  isWall,
  isStart,
  isFinish,
  // isVisited,
  row,
  col,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
}: NodeEnds) => {
  const extraClassname = isStart
    ? "node-start"
    : isFinish
    ? "node-finish"
    : // : isVisited
    // ? "node-visited"
    isWall
    ? "node-wall"
    : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassname}`}
      onMouseUp={() => handleMouseUp()}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
    ></div>
  );
};

export default Node;
