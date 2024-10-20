import React from 'react';

function NavBar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <a href="/" className="text-white text-lg font-bold">
          hackthon
        </a>
        {/* Logout Button */}
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
