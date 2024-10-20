import React from 'react';
import { Link } from 'react-router-dom';

function PendingRight({list}) {



  const examTypes = list;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8">
      {examTypes.map((exam,index) => (
       <Link to={`/exam/${exam._id}`}>
       <div
          key={index}
          className={`bg-gradient-to-r from-indigo-400 to-purple-500 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-white`}
        >
          <h3 className="text-xl font-semibold">{exam.title}</h3>
          <p className="mt-2">{exam.department}</p>
          <p className="mt-2">{exam.teacher}</p>
        </div>
      </Link>
      ))}
    </div>
  );
}

export default PendingRight;
