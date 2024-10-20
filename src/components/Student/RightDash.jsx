import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../../constants/Constant';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from 'recharts';

function StudentRight() {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const cards = [];
  const studentList = cards;

  // Sample data for student performance and attendance
  const performanceData = [
    { name: 'John', marks: 50 },
    { name: 'Alice', marks: 28 },
    { name: 'Bob', marks: 92 },
    { name: 'Jane', marks: 59 },
    { name: 'Tom', marks: 80 },
  ];

  const attendanceData = [
    { name: 'John', attendance: 95 },
    { name: 'Alice', attendance: 90 },
    { name: 'Bob', attendance: 80 },
    { name: 'Jane', attendance: 75 },
    { name: 'Tom', attendance: 85 },
  ];

  const handleEdit = (card) => {
    setSelectedCard(card);
    setIsEditPopupOpen(true);
  };

  const handleClose = () => {
    setIsEditPopupOpen(false);
    setSelectedCard(null);
  };

  const addStudent = () => {
    setIsEditPopupOpen(true);
  };

  const saveStudent = async () => {
    setIsEditPopupOpen(false);
    setSelectedCard(null);
    try {
      const response = await axios.post(BACKEND_URL + '/api/v1/student/add', selectedCard, {
        headers: {
          Authorization: `${localStorage.getItem('_token')}`
        }
      });
      console.log(response.data);
      toast.success('Student added successfully');
    } catch (error) {
      toast.error('Failed to add student' + error.message);
    }
  };

  return (
    <div className="p-8 bg-gray-100 h-full">
      <div className="grid grid-cols-4 gap-4 mb-4">
        {/* Stats Cards */}
        <div className="bg-gradient-to-r from-purple-400 to-pink-600 p-4 rounded-lg shadow-md">
          <h2 className="text-white text-6xl">{studentList.length ?? 0}</h2>
          <p className="text-white text-sm">Number of Students</p>
        </div>

        <div className="bg-gradient-to-r from-purple-400 to-pink-600 p-4 rounded-lg shadow-md">
          <h2 className="text-white text-6xl">10</h2>
          <p className="text-white text-sm">Number of Departments</p>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Student Performance Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-800 text-xl mb-4">Student Performance</h3>
          <LineChart width={400} height={300} data={performanceData}>
            <Line type="monotone" dataKey="marks" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>

        {/* Attendance Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-800 text-xl mb-4">Attendance</h3>
          <BarChart width={400} height={300} data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="attendance" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>

      {/* Remaining Screen - Cards, Full Width in Each Row */}
      <div className="flex flex-col gap-4">
        <button onClick={addStudent} className="mt-4 bg-blue-600 text-white rounded px-4 py-2">
          Add Student
        </button>
        {cards.map((card) => (
          <div key={card.id} className="bg-white p-6 rounded-lg shadow-md w-full">
            <h3 className="text-gray-800 text-xl mb-2">{card.username}</h3>
            <p className="text-gray-600">{card.department}</p>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => handleEdit(card)} className="text-blue-500 hover:underline">
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
              <label className="block text-gray-700">Username:</label>
              <input
                type="text"
                name="username"
                value={selectedCard?.username}
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) => setSelectedCard({ ...selectedCard, username: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password:</label>
              <input
                type="text"
                name="password"
                value={selectedCard?.password}
                className="w-full p-2 border border-gray-300 rounded"
                readOnly={selectedCard?.id}
                onChange={(e) => setSelectedCard({ ...selectedCard, password: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Department:</label>
              <input
                type="text"
                name="department"
                value={selectedCard?.department}
                onChange={(e) => setSelectedCard({ ...selectedCard, department: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={handleClose} className="bg-gray-500 text-white px-4 py-2 rounded">
                Close
              </button>
              <button onClick={saveStudent} className="bg-blue-500 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentRight;
