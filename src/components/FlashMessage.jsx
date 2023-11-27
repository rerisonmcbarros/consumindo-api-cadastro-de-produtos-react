import React, { useEffect, useRef } from 'react'

const FlashMessage = (props) => {

  useEffect(() => {
    if (props.action) {
      setTimeout(() => {
        props.action(null);
      }, props.time);
    }
  }, [props.action]);

  return (
    <div className={`w-full mx-auto p-2 border rounded-md shadow-md my-4 ${props.className}`}>
      {props.children}
    </div>
  )
}

export default FlashMessage
