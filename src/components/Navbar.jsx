import Logo from "./Logo"

const Navbar = () => {
  return (
    <nav className="w-screen flex items-center justify-center sm:justify-normal p-4 shadow-md">
      <Logo className="sm:ms-14 text-2xl"/>
    </nav>
  )
}

export default Navbar