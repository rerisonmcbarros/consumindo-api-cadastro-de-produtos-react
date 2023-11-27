const FormErrorMessage = (props) => {
  return (
    <div {...props} className={`text-red-600 text-sm ${props.className}`}>
      {props.children}
    </div>
  )
}

export default FormErrorMessage
