import React, { useEffect, useState } from 'react';

function NavBar() {

 const logout = () => {
    localStorage.clear();
    window.location.reload();
  }
 const [isLoggedin, setIsLoggedIn]= useState(false);
useEffect(() => {
  if(localStorage.getItem('_token')){
    setIsLoggedIn(true);
  }
},[]);

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <a href="/" className="text-white text-lg font-bold">
          hackthon
        </a>
        {/* Logout Button */}
        {isLoggedin?<button
          type="button"
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Logout
        </button>:<></>}
      </div>
    </nav>
  );
}

export default NavBar;
