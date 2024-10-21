import React, { useEffect, useState, useRef } from 'react';
import QuestionButtonPanel from '../../components/QuestionButtonPanel';
import QuestionCard from '../../components/QuestionCard';
import LogoutPage from '../LogoutPage/LogoutPage';
import Camera from '../../components/Camera';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../constants/Constant';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

function Question() {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [isAltPressed, setIsAltPressed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(true);
  const [showLogoutPage, setShowLogoutPage] = useState(false);
  const [timer, setTimer] = useState(10);
  const questionRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    document.title = 'Exam';
    if (!localStorage.getItem('_token') || localStorage.getItem('_type') !== '1') {
      window.location.href = '/student-login';
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(BACKEND_URL + '/api/v1/test/' + id);
        setQuestions(response.data.data.questions);
        console.log('response', response.data.data.questions);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();

  }, []);

 

  useEffect(() => {
    const handleKeyDown = (event) => {
      const keysToPrevent = [
        'Alt',
        'Control',
        'Meta', // Windows key or Command key
        'Tab',
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
        'Escape' // Optional: Prevent Escape to avoid exiting fullscreen
      ];


      if (keysToPrevent.includes(event.key)) {
        event.preventDefault();
      }

      if (isFullscreen && event.altKey) {
        event.preventDefault();
        // setIsAltPressed(true);
      }
      if (event.key === 'Meta') {
        exitFullscreen();
      }

      if (event.key === 'Escape') {
        exitFullscreen();
      }
    };

    // const handleFocus = () => {
    //   alert("You have switched away from the exam. Please stay focused on this page.");
    // };

    window.addEventListener('keydown', handleKeyDown);
    // window.addEventListener('blur', handleFocus); // Alert when the window loses focus
    window.addEventListener('focus', () => {
      // Optionally notify the user when they return to the window
      console.log("Welcome back to the exam!");
    });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // window.removeEventListener('blur', handleFocus);
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

  const handleSubmit = () => {
    try {
      // calculate marks
      const response = axios.post(BACKEND_URL + '/api/v1/test/' , {
      test:id,
      score:100
      });
      toast.success('Submitted successfully');
      navigate('/logout')
    } catch (error) {
      toast.error('Failed to submit' + error.message);
    }
  }

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
              questionTitle={`question ${selectedQuestion + 1}`}
              questionText={questions[selectedQuestion]?.question}
              type={questions[selectedQuestion]?.type}
              options={questions[selectedQuestion]?.options}
            />
            {/* Add a button to call handleLogout */}
            <button
                  onClick={() => {
                    handleSubmit();
                  }}
                  className="mt-4 bg-blue-600 text-white rounded px-4 py-2"
                >
                  submit
                </button>
          </div>
          <div className="mt-4 items-start">
            <Camera isOverlayActive={showWarningModal} />
          </div>
          {/* Overlay Modal */}
          {showWarningModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
              <div className="bg-white p-6 rounded shadow-lg text-center">
                <h2 className="text-lg font-bold">Warning!</h2>
                <p>Your exam will close if you do not keep it in fullscreen!</p>
                <p>Time left: {timer} seconds</p>
                <button
                  onClick={() => {
                    setShowWarningModal(false);
                    toggleFullscreen(); // Re-enter fullscreen when the button is clicked
                  }}
                  className="mt-4 bg-blue-600 text-white rounded px-4 py-2"
                >
                  Go Fullscreen
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
