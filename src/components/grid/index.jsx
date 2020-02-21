import React, { useState } from "react";
import { Disk } from "../disk";
import "./style.css";
import { Board } from "../../utils/board";
import { HeaderStatus } from "../headerStatus";


export const Grid = props => {

  const [game, setGame] = useState({
    board: new Board(props.initialPlayer)
  });

  function dropPiece(col) {
    const { board } = game
    !board.gameOver && board.dropPiece(col)
    setGame({ ...game });
  }

  const { board } = game
  return (
    <div className="game">
      <HeaderStatus player={board.currentPlayer} isWinner={!!board.winner} />
      <div className="grid">
        {board.grid.map((row, indexRow) => (
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
    </div>
  );
};
