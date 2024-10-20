import React, { useState } from 'react';
import CreateQuestion from '../../../components/CreateQuestion';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BACKEND_URL } from '../../../constants/Constant';

function ConductExam() {
  const [questions, setQuestions] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState(null);

  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedQuestion({ ...questions[index] }); // Clone the question to edit
  };

  const handleQuestionChange = (e) => {
    setEditedQuestion({ ...editedQuestion, question: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...editedQuestion.options];
    newOptions[index] = value;
    setEditedQuestion({ ...editedQuestion, options: newOptions });
  };

  const addOption = () => {
    setEditedQuestion({
      ...editedQuestion,
      options: [...editedQuestion.options, '']
    });
  };

  const removeOption = (index) => {
    const newOptions = editedQuestion.options.filter((_, i) => i !== index);
    setEditedQuestion({ ...editedQuestion, options: newOptions });
  };

  const saveEdit = () => {
    const updatedQuestions = questions.map((question, i) =>
      i === editingIndex ? editedQuestion : question
    );
    setQuestions(updatedQuestions);
    setEditingIndex(null);
    setEditedQuestion(null);
  };

  const handleSubmit =async () => {
    const questionsJSON = JSON.stringify(questions, null, 2);
    console.log(questionsJSON); 
    try {
      const response = await axios.post(BACKEND_URL + '/api/v1/test', questionsJSON, {
        headers: {
          Authorization: `${localStorage.getItem('_token')}`
        }
      });
      toast.success('Questions submitted successfully');

    } catch (error) {
      toast.error('Failed to submit questions: '+error.message);
    }
  };

  return (
    <div className="flex">
      {/* Left Sidebar - Create Question Section */}
      <div className="w-1/3 p-4 bg-gray-100">
        <CreateQuestion addQuestion={addQuestion} />
      </div>

      {/* Right Section - Questions Display */}
      <div className="w-2/3 p-4">
        <h2 className="text-2xl font-bold mb-4">Questions</h2>
        {questions.length === 0 ? (
          <p>No questions added yet.</p>
        ) : (
          questions.map((question, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    value={editedQuestion.question}
                    onChange={handleQuestionChange}
                  />
                  {/* Options editing */}
                  {editedQuestion.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center mb-2">
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={option}
                        onChange={(e) => handleOptionChange(optIndex, e.target.value)}
                      />
                      <button
                        type="button"
                        className="ml-2 text-red-500"
                        onClick={() => removeOption(optIndex)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-blue-500 mb-2"
                    onClick={addOption}
                  >
                    Add Option
                  </button>
                  <div className="mt-4">
                    <button
                      className="bg-blue-500 text-white font-bold py-1 px-4 rounded mr-2"
                      onClick={saveEdit}
                    >
                      Save
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => setEditingIndex(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-gray-800 text-xl mb-2">{question.question}</h3>
                  {question.type !== '3' && question.options.length > 0 && (
                    <ul className="list-disc pl-5 mb-2">
                      {question.options.map((option, optIndex) => (
                        <li key={optIndex} className="text-gray-600">{option}</li>
                      ))}
                    </ul>
                  )}
                  {question.type === '3' && (
                    <p className="text-gray-600">Open-ended question</p>
                  )}
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      className="text-blue-500"
                      onClick={() => startEditing(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => deleteQuestion(index)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
        {/* Submit Button */}
        {questions.length > 0 && (
          <button
            className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleSubmit}
          >
            Submit Questions
          </button>
        )}
      </div>
    </div>
  );
}

export default ConductExam;
