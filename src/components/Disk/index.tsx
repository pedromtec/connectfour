import React, { FunctionComponent } from 'react';
import './Disk.css'

const Disk: FunctionComponent<Props> = ({ color, animationProps, handleClick }) => {
  return (
    <div className="cell" onClick={handleClick}>
      <div className='disk' style={{
        backgroundColor: color
      }} {...animationProps} />
    </div>
  );
}

interface Props {
  color: string
  animationProps?: any
  handleClick: () => void
}


export default React.memo(Disk)