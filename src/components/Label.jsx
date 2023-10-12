const Label = ({children, name}) => {
  return (
    <>  
       <label className="flex flex-col mb-8">
            <span className="font-normal text-neutral-700">{name}</span>
            {children}
        </label>
    </>
  )
}

export default Label