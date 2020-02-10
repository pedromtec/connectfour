import React, { useState } from "react";
import { Disk } from "../disk";
import "./style.css";
import { Board } from "../../utils/board";
import { HeaderStatus } from "../headerStatus";

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

let canMove = true;
export const Grid = () => {
  const [state, setState] = useState({ board: new Board(1, initialGrid) });

  const getMove = async () => {
    const move = Math.floor(Math.random() * 7);
    await sleep(300);
    return move;
  };

  const dropPiece = async col => {
    const can = await state.board.dropPiece(col, milliseconds => {
      setState({ ...state });
      return milliseconds ? sleep(milliseconds) : Promise.resolve();
    });
    setState({ ...state });
    return can;
  };

  const handleClick = async col => {
    if (!canMove) return;
    canMove = false;
    dropPiece(col).then(async droped => {
      if (droped) {
        const aiMove = await getMove();
        console.log(aiMove);
        await dropPiece(aiMove);
      }
      canMove = true;
    });
  };

  return (
    <div className="game">
      <HeaderStatus player={state.board.currentPlayer} />
      <div className="grid">
        {state.board.grid.map((row, indexRow) => (
          <div className="row" key={indexRow}>
            {row.map((disk, indexDisk) => (
              <Disk
                disk={disk}
                handleClick={() => handleClick(indexDisk)}
                key={indexDisk}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
