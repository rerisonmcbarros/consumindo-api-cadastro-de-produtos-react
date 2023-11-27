import useAuthContext from "../hooks/useAuthContext"
import Logo from "./Logo"

const Navbar = () => {
  const {signOut, loading, token} = useAuthContext();
  const handleLogout = () => {
    signOut();
  }
  return (
    <nav className="w-screen h-16 flex items-center justify-between p-4 shadow-md">
      <Logo className="sm:ms-14 text-2xl"/>
      {token &&
        <a className="text-blue-600 px-2 text-lg me-8 cursor-pointer" onClick={() => handleLogout()}>Logout</a>
      }
    </nav>
  )
}

export default Navbar
