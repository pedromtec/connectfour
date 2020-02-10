import React from "react";
import "./style.css";

export const Disk = props => {
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
