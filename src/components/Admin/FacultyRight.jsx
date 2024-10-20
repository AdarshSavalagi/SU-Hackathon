import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';  // Assuming you are using react-toastify for notifications

function FacultyRight({ facultyList, departmentCount }) {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ username: '', password: '', department: '' });

  const cards = facultyList ?? [];

  const handleEdit = (card) => {
    setSelectedCard(card);
    setIsEditPopupOpen(true);
  };

  const handleClose = () => {
    setIsEditPopupOpen(false);
    setSelectedCard(null);
  };

  const addFaculty = () => {
    setSelectedCard({ username: '', password: '', department: '' });  // Clear form for new faculty
    setIsEditPopupOpen(true);
  };

  const saveFaculty = async () => {
    setIsEditPopupOpen(false);
    try {
      const response = await axios.post('BACKEND_URL/api/v1/teacher/add', selectedCard, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('_token')}`
        }
      });
      console.log(response.data);
      toast.success('Faculty added successfully');
      // Optionally, update facultyList state here if necessary to reflect changes without reloading
    } catch (error) {
      toast.error('Failed to add faculty: ' + error.message);
    }
    setSelectedCard(null);  // Clear after saving
  };

  return (
    <div className="w-4/5 p-8 bg-gray-100 overflow-auto">
      <div className="grid grid-cols-4 gap-4 mb-4">
        {/* Stats Cards */}
        <div className="bg-gradient-to-r from-purple-400 to-pink-600 p-4 rounded-lg shadow-md">
          <h2 className="text-white text-6xl">{facultyList.length}</h2>
          <p className="text-white text-sm">Number of Faculties</p>
        </div>

        <div className="bg-gradient-to-r from-purple-400 to-pink-600 p-4 rounded-lg shadow-md">
          <h2 className="text-white text-6xl">{departmentCount ?? 10}</h2>
          <p className="text-white text-sm">Number of Departments</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={addFaculty}
          className="mt-4 bg-blue-600 text-white rounded px-4 py-2"
        >
          Add Faculty
        </button>
        {facultyList.map((card) => (
          <div key={card.id} className="bg-white p-6 rounded-lg shadow-md w-full">
            <h3 className="text-gray-800 text-xl mb-2">{card.username}</h3>
            <p className="text-gray-600">{card.department}</p>
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

      {/* Modal for adding/editing faculty */}
      {isEditPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl mb-4">{selectedCard?.id ? 'Edit Faculty' : 'Add Faculty'}</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Username:</label>
              <input
                type="text"
                name="username"
                value={selectedCard?.username || ''}
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setSelectedCard({ ...selectedCard, username: e.target.value })}
              />
            </div>
            {!selectedCard?.id && (  // Show password field only for new faculty
              <div className="mb-4">
                <label className="block text-gray-700">Password:</label>
                <input
                  type="text"
                  name="password"
                  value={selectedCard?.password || ''}
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(e) => setSelectedCard({ ...selectedCard, password: e.target.value })}
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700">Department:</label>
              <input
                type="text"
                name="department"
                value={selectedCard?.department || ''}
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setSelectedCard({ ...selectedCard, department: e.target.value })}
              />
            </div>
            <button
              className="mt-4 bg-blue-500 text-white py-1 px-3 rounded"
              onClick={saveFaculty}
            >
              Save
            </button>
            <button
              className="mt-4 ml-4 bg-red-500 text-white py-1 px-3 rounded"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyRight;
