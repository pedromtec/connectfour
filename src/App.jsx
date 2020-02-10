import React from "react";
import "./App.css";
import { Grid } from "./components/grid";

const App = () => {
  return (
    <div className="App">
      <Grid initialPlayer={1} />
    </div>
  );
};
export default App;
