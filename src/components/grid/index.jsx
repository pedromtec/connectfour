import React, { useState, useEffect } from "react";
import { Disk } from "../disk";
import "./style.css";
import { Board } from "../../utils/board";
import { HeaderStatus } from "../headerStatus";

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

export const Grid = props => {
  const [state, setState] = useState({
    board: new Board(props.initialPlayer)
  });

  const getMove = async () => {
    const move = Math.floor(Math.random() * 7);
    await sleep(600);
    return move;
  };

  useEffect(() => {
    if (state.board.currentPlayer === 2) {
      getMove().then(async move => {
        await dropPiece(move);
        state.board.canMove = true;
      });
    }
  }, []);

  async function dropPiece(col) {
    const can = await state.board.dropPiece(col, milliseconds => {
      setState({ ...state });
      return milliseconds ? sleep(milliseconds) : Promise.resolve();
    });
    console.log(state);
    setState({ ...state });
    return can;
  }

  async function handleClick(col) {
    if (!state.board.canMove) return;
    state.board.canMove = false;
    dropPiece(col).then(async droped => {
      if (droped) {
        const aiMove = await getMove();
        await dropPiece(aiMove);
      }
      state.board.canMove = true;
    });
  }

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
