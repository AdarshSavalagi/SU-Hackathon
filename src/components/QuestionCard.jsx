import React, { useState } from 'react';

function QuestionCard({ questionTitle, questionText, type, options }) {
  const [selectedOptions, setSelectedOptions] = useState([]);  // For type 2 (multiple selection)
  const [selectedOption, setSelectedOption] = useState('');    // For type 1 (single selection)
  const [textAnswer, setTextAnswer] = useState('');            // For type 3 (text answer)

  // Handle radio button change (type 1)
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Handle multiple selection (type 2)
  const handleMultipleSelectionChange = (event) => {
    const value = event.target.value;
    setSelectedOptions((prev) => 
      prev.includes(value) ? prev.filter((option) => option !== value) : [...prev, value]
    );
  };

  // Handle text input change (type 3)
  const handleTextChange = (event) => {
    setTextAnswer(event.target.value);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full">
      <h3 className="text-xl font-bold mb-6">{questionTitle}</h3> {/* Title from props */}
      <p className="text-lg mb-4">{questionText}</p> {/* Question text from props */}

      {/* Conditional Rendering Based on Type */}
      {type === '1' && options && (
        // Single selection (radio buttons)
        <div className="space-y-4 mb-6">
          {options.map((option) => (
            <div key={option}>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2 text-gray-700">{option}</span>
              </label>
            </div>
          ))}
        </div>
      )}

      {type === '2' && options && (
        // Multiple selection (checkboxes)
        <div className="space-y-4 mb-6">
          {options.map((option) => (
            <div key={option}>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={handleMultipleSelectionChange}
                  className="form-checkbox text-blue-600"
                />
                <span className="ml-2 text-gray-700">{option}</span>
              </label>
            </div>
          ))}
        </div>
      )}

      {type === '3' && (
        // Text input (type 3)
        <div className="space-y-4 mb-6">
          <label className="block text-gray-700">
            <textarea
              value={textAnswer}
              onChange={handleTextChange}
              className="form-textarea mt-1 block w-full rounded-md shadow-sm"
              rows="4"
              placeholder="Enter your answer here..."
            />
          </label>
        </div>
      )}

      {/* Buttons */}
      <div className="flex space-x-4">
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded">
          Reset
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save
        </button>
      </div>
    </div>
  );
}

export default QuestionCard;
