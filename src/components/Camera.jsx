// Camera.js
import React, { useEffect, useRef } from 'react';

function Camera({ isOverlayActive }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // Start webcam stream on mount
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startCamera();
  }, []);

  return (
    <div className={`relative ${isOverlayActive ? 'blur-sm' : ''}`} style={{ width: '250px', height: '150px' }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className=" border rounded"
      />
     
    </div>
  );
}

export default Camera;
