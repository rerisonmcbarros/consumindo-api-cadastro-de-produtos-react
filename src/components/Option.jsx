import React from 'react'

const Option = (props) => {
  return (
    <option {...props} value={props.value} className={`bg-slate-50 text-gray-700 ${props.className}`}>{props.children}</option>
  )
}

export default Option
