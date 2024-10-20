import React, { useEffect, useState, useRef } from 'react';
import QuestionButtonPanel from '../components/QuestionButtonPanel';
import QuestionCard from '../components/QuestionCard';

function Question() {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [isAltPressed, setIsAltPressed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEscapePressed, setIsEscapePressed] = useState(false); // New state for Escape key
  const questionRef = useRef();

  // Sample questions
  const questions = [
    {
      question: 'What is your favorite color?',
      type: '1',
      options: ['Red', 'Green', 'Blue', 'Yellow'],
      answers: ''
    },
    {
      question: 'Which programming languages do you know? (Select multiple)',
      type: '2',
      options: ['JavaScript', 'Python', 'Java', 'C#'],
      answers: ''
    },
    {
      question: 'Describe your ideal vacation.',
      type: '3',
      options: [], // No options for text answer
      answers: ''
    },
    {
      question: 'What type of music do you prefer?',
      type: '1',
      options: ['Rock', 'Pop', 'Jazz', 'Classical'],
      answers: ''
    },
    {
      question: 'Select your hobbies.',
      type: '2',
      options: ['Reading', 'Traveling', 'Cooking', 'Gardening'],
      answers: ''
    },
    {
      question: 'What is your dream job?',
      type: '3',
      options: [],
      answers: ''
    },
    {
      question: 'How do you prefer to communicate?',
      type: '1',
      options: ['Email', 'Phone', 'In-Person', 'Chat'],
      answers: ''
    },
    {
      question: 'What sports do you enjoy? (Select multiple)',
      type: '2',
      options: ['Soccer', 'Basketball', 'Tennis', 'Swimming'],
      answers: ''
    },
    {
      question: 'What is your favorite book?',
      type: '3',
      options: [],
      answers: ''
    },
    {
      question: 'Which food do you like the most?',
      type: '1',
      options: ['Italian', 'Mexican', 'Chinese', 'Indian'],
      answers: ''
    },
    {
      question: 'Choose your preferred social media platforms.',
      type: '2',
      options: ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'],
      answers: ''
    },
    {
      question: 'What motivates you to work hard?',
      type: '3',
      options: [],
      answers: ''
    },
    {
      question: 'How do you stay organized?',
      type: '1',
      options: ['Digital Tools', 'Paper Planner', 'Lists', 'Notebooks'],
      answers: ''
    },
    {
      question: 'What do you enjoy doing in your free time? (Select multiple)',
      type: '2',
      options: ['Watching Movies', 'Playing Video Games', 'Exercising', 'Cooking'],
      answers: ''
    },
    {
      question: 'If you could learn any skill, what would it be?',
      type: '3',
      options: [],
      answers: ''
    },
    {
      question: 'What kind of movies do you prefer?',
      type: '1',
      options: ['Action', 'Comedy', 'Drama', 'Horror'],
      answers: ''
    }
  ];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isFullscreen && event.altKey) {
        event.preventDefault(); // Prevent Alt key actions when in fullscreen
      }
      if (event.key === 'Escape') {
        setIsEscapePressed(true); // Set Escape key pressed state
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'Alt') {
        setIsAltPressed(false);
        alert("Full Screen mode is disabling");
      }
      if (event.key === 'Escape') {
        setIsEscapePressed(false); // Reset Escape key pressed state
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      questionRef.current.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable full-screen mode:", err);
      });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Preventing tab change and showing warning message
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isFullscreen) {
        alert("Warning: You cannot change tabs while in fullscreen mode!");
        // Forcefully keep the user in the tab
        window.focus();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isFullscreen]);

  return (
    <div className="flex h-screen" ref={questionRef}>
      {/* Left side Button Panel */}
      <QuestionButtonPanel
        changeHandler={setSelectedQuestion}
        selected={selectedQuestion}
        length={questions.length}
      />

      {/* Right side Question Card */}
      <div className="w-4/5 p-4">
        {!isFullscreen && (
          <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">
            Warning: Fullscreen mode is disabled in your browser!
            <button onClick={toggleFullscreen} className="ml-4 bg-blue-600 text-white rounded px-2 py-1">
              Go Fullscreen
            </button>
          </div>
        )}
        {isAltPressed && (
          <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">
            Warning: Alt key is disabled!
          </div>
        )}
        {isEscapePressed && (
          <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">
            Warning: Escape key is pressed!
          </div>
        )}
        <QuestionCard
          questionTitle={questions[selectedQuestion].question}
          questionText="Which among "
          type={questions[selectedQuestion].type}
          options={questions[selectedQuestion].options}
        />
      </div>
    </div>
  );
}

export default Question;
