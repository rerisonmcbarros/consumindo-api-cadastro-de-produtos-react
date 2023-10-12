import { Link } from 'react-router-dom'

const Logo = (props) => {
  return (
    <Link to="/" className={props.className}>
      <span className="bg-blue-600 text-slate-50 rounded-md font-bold p-1">Cad</span>
      <span className="text-blue-600 font-light">Products</span>
    </Link>
  )
}

export default Logo