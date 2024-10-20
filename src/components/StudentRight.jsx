import React, { useState } from 'react';

function StudentRight() {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    { id: 1, title: 'Card Title 1', content: 'Content for the card goes here.' },
    { id: 2, title: 'Card Title 2', content: 'Content for the card goes here.' },
    { id: 3, title: 'Card Title 3', content: 'Content for the card goes here.' },
    { id: 4, title: 'Card Title 4', content: 'Content for the card goes here.' },
  ];

  const handleEdit = (card) => {
    setSelectedCard(card);
    setIsEditPopupOpen(true);
  };

  const handleClose = () => {
    setIsEditPopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="w-4/5 p-8 bg-gray-100 overflow-auto h-full">
      <div className="grid grid-cols-4 gap-4 mb-4">
        {/* Stats Cards */}
        <div className="bg-gradient-to-r from-purple-400 to-pink-600 p-4 rounded-lg shadow-md">
          <h2 className="text-white text-6xl">983</h2>
          <p className="text-white text-sm">Number of Faculties</p>
        </div>

        <div className="bg-gradient-to-r from-purple-400 to-pink-600 p-4 rounded-lg shadow-md">
          <h2 className="text-white text-6xl">652</h2>
          <p className="text-white text-sm">Number of Departments</p>
        </div>
      </div>

      {/* Remaining Screen - Cards, Full Width in Each Row */}
      <div className="flex flex-col gap-4">
        {cards.map((card) => (
          <div key={card.id} className="bg-white p-6 rounded-lg shadow-md w-full">
            <h3 className="text-gray-800 text-xl mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.content}</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleEdit(card)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Popup */}
      {isEditPopupOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-gray-800 text-xl mb-2">Edit Card</h3>
            <div className="mb-4">
              <label className="block text-gray-700">Title:</label>
              <input
                type="text"
                value={selectedCard?.title}
                className="w-full p-2 border border-gray-300 rounded"
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Content:</label>
              <textarea
                value={selectedCard?.content}
                className="w-full p-2 border border-gray-300 rounded"
                readOnly
              ></textarea>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={handleClose} className="bg-gray-500 text-white px-4 py-2 rounded">
                Close
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentRight;
