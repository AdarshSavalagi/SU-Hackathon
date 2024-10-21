import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as speechCommands from '@tensorflow-models/speech-commands';

const Camera = ({ isOverlayActive }) => {
    const videoRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [lastAlertTime, setLastAlertTime] = useState(0);
    const [audioModel, setAudioModel] = useState(null); // State for audio model

    const suspiciousClasses = ['Speech', 'Conversation']; // Suspicious classes
    const noiseThreshold = 0.04; // Filter out background noise

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                detectFaces(); // Start detection once the camera is on
            } catch (error) {
                console.error("Error accessing webcam:", error);
            }
        };

        // Load the audio model for speech recognition
        const loadAudioModel = async () => {
            try {
                const recognizer = await speechCommands.create('BROWSER_FFT');
                await recognizer.ensureModelLoaded();
                setAudioModel(recognizer);
                console.log("Audio model loaded successfully");

                // Start listening for suspicious audio after the model is loaded
                startListening(recognizer);
            } catch (error) {
                console.error("Error loading audio model:", error);
            }
        };

        startCamera();
        loadAudioModel(); // Load audio model

        // Detect fullscreen mode changes
        const handleFullscreenChange = () => {
            const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
            const isFullscreenActive = !!fullscreenElement;
            setIsFullscreen(isFullscreenActive);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
    }, []);

    // Function to start listening for suspicious audio
    const startListening = (recognizer) => {
        recognizer.listen(result => {
            const scores = result.scores;
            const labels = recognizer.wordLabels();
            console.log("Scores:", scores);
            console.log("Labels:", labels);

            const highestScoreIndex = scores.indexOf(Math.max(...scores));
            const detectedLabel = labels[highestScoreIndex];
            const confidence = scores[highestScoreIndex];

            console.log(`Detected: ${detectedLabel}, Confidence: ${confidence}`);

            // Check if the detected audio matches suspicious classes
            if (confidence > noiseThreshold ) {
                console.log('Suspicious audio detected:', detectedLabel); // Log the detected label
                alert('Suspicious audio detected!'); // Trigger alert on suspicious audio
            } else {
                console.log('No suspicious audio detected.'); // Log if no suspicious audio is detected
            }
        }, {
            probabilityThreshold: 0.5, // Adjusted threshold for better detection
            overlapFactor: 0.75 // Adjusted overlap for better performance
        });
        console.log("Listening started for audio");
    };

    const detectFaces = async () => {
        const model = await cocoSsd.load();
        console.log("Face detection model loaded successfully");

        const detect = async () => {
            if (videoRef.current && videoRef.current.videoWidth > 0 && videoRef.current.videoHeight > 0) {
                const predictions = await model.detect(videoRef.current);
                console.log("Predictions:", predictions);

                // Check for malpractice: Alert if more than one person is detected
                const peopleDetected = predictions.filter(prediction => prediction.class === 'person');
                const currentTime = new Date().getTime();

                if (peopleDetected.length > 1 && isFullscreen) {
                    if (currentTime - lastAlertTime >= 10000) { // Alert every 10 seconds
                        alert('Multiple persons detected! The exam may be closed.');
                        setLastAlertTime(currentTime); // Update the last alert time
                    }
                }
            }
            requestAnimationFrame(detect);
        };
        detect();
    };

    return (
        <div className={`relative ${isOverlayActive ? 'blur-sm' : ''}`} style={{ width: '250px', height: '150px' }}>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                className="border rounded"
                style={{ width: '250px', height: '150px' }}
            />
        </div>
    );
};

export default Camera;
