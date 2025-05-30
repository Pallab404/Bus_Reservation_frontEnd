import { FaUserCircle } from "react-icons/fa";

const Navbar2 = ({email}) => {
  return (
    <nav className="bg-blue-400 text-white fixed top-0 left-0 w-full z-50 shadow-md h-16 flex items-center px-6">
      {/* Left: Logo */}
      <div className="font-bold text-xl">DELTA</div>

      {/* Right: Profile section */}
      <div className="ml-auto flex items-center space-x-2">
        <FaUserCircle className="text-2xl" />
        <span className="text-sm">
          {email}
        </span>
      </div>
    </nav>
  );
}

export default Navbar2;