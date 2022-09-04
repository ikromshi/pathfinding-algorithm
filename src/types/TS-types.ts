export type TypeNode = {
  row: number;
  col: number;
  distance: number;
  isWall: boolean;
  isStart: boolean;
  isFinish: boolean;
  isVisited: boolean;
  previousNode: TypeNode | null;
};
