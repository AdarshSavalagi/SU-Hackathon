import React, { useEffect, useState, useRef } from 'react';
import QuestionButtonPanel from '../components/QuestionButtonPanel';
import QuestionCard from '../components/QuestionCard';
import LogoutPage from '../components/LogoutPage';

function Question() {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [isAltPressed, setIsAltPressed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showLogoutPage, setShowLogoutPage] = useState(false);
  const [timer, setTimer] = useState(10);
  const questionRef = useRef();

  // Sample questions
  const questions = [
    {
      question: 'What is your favorite color?',
      type: '1',
      options: ['Red', 'Green', 'Blue', 'Yellow'],
      answers: ''
    },
    // Add other questions as needed...
  ];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isFullscreen && event.altKey) {
        event.preventDefault();
        setIsAltPressed(true);
      }
      if (event.key === 'Escape') {
        exitFullscreen();
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'Alt') {
        setIsAltPressed(false);
        alert("Full Screen mode is disabling");
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
      exitFullscreen();
    } else {
      questionRef.current.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable full-screen mode:", err);
      });
    }
  };

  const exitFullscreen = () => {
    document.exitFullscreen();
    showModal(); // Show modal immediately when exiting fullscreen
  };

  const showModal = () => {
    setShowWarningModal(true);
    setTimer(10); // Reset timer when modal shows
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        showModal(); // Show modal if exiting fullscreen
      }
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleLogout = () => {
    // Show confirmation alert
    if (window.confirm("Your exam is over. Do you want to log out?")) {
      setShowLogoutPage(true); // Show the logout page
    }
  };

  // Countdown timer effect
  useEffect(() => {
    let countdownInterval;
    if (showWarningModal && timer > 0) {
      countdownInterval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            alert("Your exam will close if you do not keep it in fullscreen!");
            setShowWarningModal(false); // Close modal after alert
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timer === 0) {
      setShowWarningModal(false); // Hide modal after timer runs out
    }

    return () => clearInterval(countdownInterval);
  }, [showWarningModal, timer]);

  return (
    <div className="flex h-screen" ref={questionRef}>
      {showLogoutPage ? (
        <LogoutPage /> // Render LogoutPage if logout is triggered
      ) : (
        <>
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
            <QuestionCard
              questionTitle={questions[selectedQuestion].question}
              questionText="Which among "
              type={questions[selectedQuestion].type}
              options={questions[selectedQuestion].options}
            />
            {/* Add a button to call handleLogout */}
            <button
              onClick={handleLogout} // Call handleLogout when button is clicked
              className="mt-4 bg-red-600 text-white rounded px-4 py-2 hover:bg-red-500 transition"
            >
              Logout
            </button>
          </div>

          {/* Overlay Modal */}
          {showWarningModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
              <div className="bg-white p-6 rounded shadow-lg text-center">
                <h2 className="text-lg font-bold">Warning!</h2>
                <p>Your exam will close if you do not keep it in fullscreen!</p>
                <p>Time left: {timer} seconds</p>
                <button 
                  onClick={() => setShowWarningModal(false)} 
                  className="mt-4 bg-blue-600 text-white rounded px-4 py-2">
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Question;
