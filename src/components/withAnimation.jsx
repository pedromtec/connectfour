import React from 'react'
import './Disk.css'

const withAnimation = (Component) => {
  return (props) => {
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

