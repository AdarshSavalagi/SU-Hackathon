import React, { useState } from 'react';

function FacultyRight({ facultyList, departmentCount }) {
  // Sample data for exams
  const examData = [
    { title: 'Math Exam', questionCount: 10, minMarks: 0, maxMarks: 100 },
    { title: 'Science Exam', questionCount: 12, minMarks: 0, maxMarks: 120 },
    { title: 'History Exam', questionCount: 8, minMarks: 0, maxMarks: 80 },
  ];

  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = (exam) => {
    setModalData(exam);
    setIsModalOpen(true);
  };  

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalData(null);
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

      {/* Exam Cards Section */}
      <div className="flex flex-col gap-4">
        {examData.map((exam, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md w-full flex justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-gray-800 text-xl mb-2">{exam.title}</h3>
              <p className="text-gray-600">Number of Questions: {exam.questionCount}</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-gray-600">Min Marks: {exam.minMarks}</p>
              <p className="text-gray-600">Max Marks: {exam.maxMarks}</p>
              <button
                className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
                onClick={() => handleModalOpen(exam)}
              >
                List
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for displaying student marks */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl mb-4">{modalData.title} - Student Marks</h2>
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Marks</th>
                </tr>
              </thead>
              <tbody>
                {/* Replace with actual student data as needed */}
                {[
                  { name: 'Alice', marks: 85 },
                  { name: 'Bob', marks: 90 },
                  { name: 'Charlie', marks: 78 },
                ].map((student, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{student.name}</td>
                    <td className="border border-gray-300 p-2">{student.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="mt-4 bg-red-500 text-white py-1 px-3 rounded"
              onClick={handleModalClose}
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
