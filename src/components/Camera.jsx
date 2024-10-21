import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

const Camera = ({ isOverlayActive }) => {
    const videoRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [lastAlertTime, setLastAlertTime] = useState(0);

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

        startCamera();

        // Detect fullscreen mode changes
        const handleFullscreenChange = () => {
            const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
            setIsFullscreen(!!fullscreenElement);
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

    const detectFaces = async () => {
        const model = await cocoSsd.load();
        console.log("Model loaded successfully");

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
