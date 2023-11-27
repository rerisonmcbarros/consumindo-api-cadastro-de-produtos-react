const Form = (props) => {
  return (
    <form {...props} className={`p-4 lg:p-10 mx-auto border rounded-md shadow-md ${props.className}`}>
        {props.children}
    </form>
  )
}

export default Form
