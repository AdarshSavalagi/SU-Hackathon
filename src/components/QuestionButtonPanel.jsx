import React from 'react';

function QuestionButtonPanel({changeHandler,selected,length}) {
  return (
    <div className="w-1/5 bg-gray-200 p-4">
      <h2 className="text-lg font-bold mb-4">Self Assessment of  the Question</h2>

      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: length }, (_, i) => (
          <button
            key={i}
            onClick={()=>{changeHandler(i)}}
            className={`w-10 h-10 rounded-full ${
              i === selected ? 'bg-green-600 text-white' : 'bg-blue-900 text-white'
            } flex items-center justify-center`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionButtonPanel;
