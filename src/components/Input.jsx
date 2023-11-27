const Input = (props) => {
  return (
    <>
      <input 
      {...props}
      type={props.type ? props.type : 'text'}  
      className={`outline-0 bg-transparent font-light text-neutral-700 ${props.className ? props.className : ''}`} 
      />
    </>
  )
}

export default Input
