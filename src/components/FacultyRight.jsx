import React from 'react';

function FacultyRight() {
  return (
    <div className="w-4/5 p-8 bg-gray-100 overflow-auto">
      <div className="grid grid-cols-4 gap-4 mb-4">
        {/* Stats Cards */}
        <div className="bg-gradient-to-r from-purple-400 to-pink-600 p-4 rounded-lg shadow-md">
          <h2 className="text-white text-6xl">983()fac</h2>
          <p className="text-white text-sm">Number of Faculties</p>
        </div>

        <div className="bg-gradient-to-r from-purple-400 to-pink-600 p-4 rounded-lg shadow-md">
          <h2 className="text-white text-6xl">652</h2>
          <p className="text-white text-sm">Number of Departments</p>
        </div>
      </div>

      {/* Remaining Screen - Cards, Full Width in Each Row */}
      <div className="flex flex-col gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h3 className="text-gray-800 text-xl mb-2">Card Title 1</h3>
          <p className="text-gray-600">Content for the card goes here.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h3 className="text-gray-800 text-xl mb-2">Card Title 2</h3>
          <p className="text-gray-600">Content for the card goes here.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h3 className="text-gray-800 text-xl mb-2">Card Title 3</h3>
          <p className="text-gray-600">Content for the card goes here.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h3 className="text-gray-800 text-xl mb-2">Card Title 4</h3>
          <p className="text-gray-600">Content for the card goes here.</p>
        </div>
      </div>
    </div>
  );
}

export default FacultyRight;
