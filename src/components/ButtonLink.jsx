import { Link } from 'react-router-dom'

const ButtonLink = (props) => {
  return (
    <>
      <Link to={props.path} className={`outline-none shadow-md py-2 rounded-md text-slate-50 px-2 ${props.className}`}>
          {props.children}       
      </Link>
    </>
  )
}

export default ButtonLink
