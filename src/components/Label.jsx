const Label = (props) => {
  return (
    <>  
      <label {...props} className={`flex flex-col ${props.className ? props.className : ''}`}>
        <span className="font-normal text-neutral-700">{props.name}</span>
        {props.children}
      </label>
    </>
  )
}

export default Label
