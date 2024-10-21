import { title } from 'framer-motion/client';
import React, { useState } from 'react';

function CreateQuestion({ addQuestion,setTitle,title }) {
  const [questionText, setQuestionText] = useState('');
  const [type, setType] = useState('1');
  const [options, setOptions] = useState(['']);
  const [correctAnswers, setCorrectAnswers] = useState(type === '2' ? [] : '');

  // Handle adding options
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);

    // Remove the correct answer if it was deleted
    if (type === '1' && correctAnswers === index) {
      setCorrectAnswers('');
    } else if (type === '2') {
      setCorrectAnswers(correctAnswers.filter((ans) => ans !== index));
    }
  };

  const handleSubmit = () => {
    const newQuestion = {
      question: questionText,
      type: type,
      options: type !== '3' ? options.filter(opt => opt) : [], // No options for text-based questions
      answers: type === '2' ? correctAnswers : correctAnswers === '' ? '' : [correctAnswers], // Adjust based on type
    };
    addQuestion(newQuestion);

    // Generate JSON format
    const questionsJSON = JSON.stringify([newQuestion], null, 2);
    console.log(questionsJSON); // Log JSON to console or handle it as needed

    // Reset form
    setQuestionText('');
    setType('1');
    setOptions(['']);
    setCorrectAnswers(type === '2' ? [] : '');
  };

  const handleCorrectAnswerChange = (index) => {
    if (type === '1') {
      setCorrectAnswers(index);
    } else if (type === '2') {
      setCorrectAnswers((prev) => {
        if (prev.includes(index)) {
          return prev.filter((ans) => ans !== index); // Uncheck
        } else {
          return [...prev, index]; // Check
        }
      });
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
       <label className="block text-gray-700 mb-2">Exam title</label>
 <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

      <h2 className="text-2xl font-bold mb-4">Create a New Question</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Question Text</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Question Type</label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setCorrectAnswers(e.target.value === '2' ? [] : ''); // Reset correct answers when changing type
          }}
        >
          <option value="1">Single Choice</option>
          <option value="2">Multiple Choice</option>
          <option value="3">Text-Based</option>
        </select>
      </div>

      {/* Options for single/multiple choice questions */}
      {(type === '1' || type === '2') && (
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Options</label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              <button
                type="button"
                className="ml-2 text-red-500"
                onClick={() => removeOption(index)}
              >
                Remove
              </button>

              {type === '1' && (
                <label className="ml-4">
                  <input
                    type="radio"
                    checked={correctAnswers === index}
                    onChange={() => handleCorrectAnswerChange(index)}
                  />
                  Correct Answer
                </label>
              )}
              {type === '2' && (
                <label className="ml-4">
                  <input
                    type="checkbox"
                    checked={correctAnswers.includes(index)}
                    onChange={() => handleCorrectAnswerChange(index)}
                  />
                  Correct Answer
                </label>
              )}
            </div>
          ))}
          <button
            type="button"
            className="text-blue-500"
            onClick={addOption}
          >
            Add Option
          </button>
        </div>
      )}

      <button
        className="bg-green-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Create Question
      </button>
    </div>
  );
}

export default CreateQuestion;
