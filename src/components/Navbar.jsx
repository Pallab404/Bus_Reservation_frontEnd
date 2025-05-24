import React from 'react'

const Navbar = () => {
  return (
    <nav className="w-ful shadow-md px-6 py-4 flex justify-between items-center bg-blue-400">
      {/* Logo on the left */}
      <div className="text-2xl font-bold text-white">DELTA</div>

      {/* Buttons on the right */}
      <div className="space-x-4">
        <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition font-semibold">
          Sign Up
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition font-semibold">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar