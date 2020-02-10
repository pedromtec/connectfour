import React from "react";
import "./App.css";
import { Grid } from "./components/grid";

const App = () => {
  return (
    <div className="App">
      <Grid initialPlayer={2} />
    </div>
  );
};
export default App;
