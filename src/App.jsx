import React, { useState } from "react";
import "./App.css";

const initialGrid = [];
const ROWS = 6;
const COLUMNS = 7;

for (let i = 0; i < ROWS; i++) {
  const row = [];
  for (let j = 0; j < COLUMNS; j++) {
    row.push(0);
  }
  initialGrid.push(row);
}

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const Disk = props => {
  const { disk, handleClick } = props;
  let style = "disk ";
  if (disk === 1) {
    style += "playerOne";
  } else if (disk === 2) {
    style += "playerTwo";
  } else {
    style += "empty";
  }
  return <div onClick={handleClick} className={style}></div>;
};

const Title = () => {
  return <h1 className="title">ConnectFour</h1>;
};

let lastPlayer = 2;

const Grid = () => {
  const [grid, setGrid] = useState([...initialGrid]);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const dropPiece = async col => {
    if (currentPlayer === lastPlayer) return;
    lastPlayer = currentPlayer;
    let row = 0;
    while (row < ROWS && grid[row][col] === 0) {
      grid[row][col] = currentPlayer;
      setGrid([...grid]);
      await sleep(100);
      grid[row][col] = 0;
      setGrid([...grid]);
      row++;
    }
    row--;
    if (row < 0) return;
    grid[row][col] = currentPlayer;
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  return (
    <div className="Grid">
      {grid.map((row, indexRow) => (
        <div className="row" key={indexRow}>
          {row.map((disk, indexDisk) => (
            <Disk
              disk={disk}
              handleClick={() => dropPiece(indexDisk)}
              key={indexDisk}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Title />
      <Grid />
    </div>
  );
};
export default App;
