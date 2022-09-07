import PathfindingVisualizer from "./pathfinding-visualizer/pathfinding-vizualizer";
import { GlobalStyle } from "./App-styles";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <PathfindingVisualizer />
    </Fragment>
  );
}

export default App;
