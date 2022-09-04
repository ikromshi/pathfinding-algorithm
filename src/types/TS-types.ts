export type TypeNode = {
  row: number;
  col: number;
  distance: number;
  isVisited: boolean;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
  previousNode: TypeNode | null;
};
