import React from 'react'
import './Disk.css'

const withAnimation = (Component: React.FC) => {
  return (props: any) => {
    return (
      <>
        {props.value !== 0 ?
          <div className="diskAnimation">
            <Component {...props} />
          </div> :
          <Component {...props} />
        }
      </>
    )
  }
}

export default withAnimation

