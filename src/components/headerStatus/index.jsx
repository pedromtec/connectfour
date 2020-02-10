import React from "react";
import "./style.css";
export const HeaderStatus = props => {
  const { player } = props;
  let status;
  if (player === 1) {
    status = <h1 className="status one">Your turn</h1>;
  } else {
    status = <h1 className="status two">Robot is thinking...</h1>;
  }
  return status;
};
