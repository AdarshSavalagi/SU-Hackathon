import React from 'react';

function PendingRight() {
  const examTypes = [
    { id: 1, title: 'Midterm Exam', description: 'Details about the midterm exam.', gradient: 'bg-gradient-to-r from-green-400 to-blue-500' },
    { id: 2, title: 'Final Exam', description: 'Details about the final exam.', gradient: 'bg-gradient-to-r from-purple-400 to-pink-500' },
    { id: 3, title: 'Quiz', description: 'Details about the quiz exam.', gradient: 'bg-gradient-to-r from-yellow-400 to-red-500' },
    { id: 4, title: 'Practical Exam', description: 'Details about the practical exam.', gradient: 'bg-gradient-to-r from-indigo-400 to-purple-500' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8">
      {examTypes.map((exam) => (
        <div
          key={exam.id}
          className={`${exam.gradient} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-white`}
        >
          <h3 className="text-xl font-semibold">{exam.title}</h3>
          <p className="mt-2">{exam.description}</p>
        </div>
      ))}
    </div>
  );
}

export default PendingRight;
