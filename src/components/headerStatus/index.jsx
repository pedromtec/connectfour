import React from "react";
import "./style.css";
export const HeaderStatus = props => {
  const { player, isWinner } = props;
  let [playerName, status] = player === 1 ? ['Player One', 'status one'] : ['Player two', 'status two']
  if (isWinner) {
    playerName += " is the Winner"
  }
  return <h1 className={status}>{playerName}</h1>;;
};
