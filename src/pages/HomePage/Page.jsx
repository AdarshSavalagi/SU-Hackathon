import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import homeAnimation from '../../assets/Home.json'; // Adjust the path based on your project structure
import { useNavigate } from 'react-router-dom';
export const HomePage = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();

    // Update mouse position on move
    const handleMouseMove = (event) => {
        setMousePosition({
            x: event.clientX,
            y: event.clientY,
        });
    };

    return (
        <div
            className="relative overflow-hidden min-h-screen"
            onMouseMove={handleMouseMove}
            style={{ background: 'linear-gradient(to right, #6b46c1, #2d3748)' }}
        >
            {/* Parallax Background Effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-black"
                style={{ zIndex: 0, filter: 'blur(4px)' }}
                animate={{
                    x: (mousePosition.x - window.innerWidth / 2) * 0.02,
                    y: (mousePosition.y - window.innerHeight / 2) * 0.02,
                }}
                transition={{ ease: 'easeOut', duration: 0.3 }}
            />

            {/* Mouse Tracker */}
            <motion.div
                className="absolute bg-blue-500 rounded-full w-8 h-8"
                style={{
                    left: mousePosition.x - 16, // Center the circle on the cursor
                    top: mousePosition.y - 16,   // Center the circle on the cursor
                    pointerEvents: 'none', // Prevent mouse events from being captured by the tracker
                }}
                transition={{ type: 'spring', stiffness: 300 }}
            />

            <div className="relative z-10 flex min-h-screen">
                {/* Lottie Animation Section */}
                <motion.div
                    className="flex items-center justify-center w-1/2"
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Lottie animationData={homeAnimation} loop={true} style={{ width: '500px', height: '500px' }} />
                </motion.div>

                {/* Button Section */}
                <motion.div
                    className="flex flex-col justify-center items-start w-1/2 p-8"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <h1 className="text-3xl font-bold text-white mb-4">Welcome</h1>
                    <div className="flex flex-row gap-8">
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: '#7e22ce', color: '#fff' }}
                            whileTap={{ scale: 0.9 }}
                            onClick={()=>navigate('/admin-login')}
                            className="bg-white text-purple-700 font-bold py-3 px-4 rounded mb-2"
                        >
                            Admin Login
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: '#7e22ce', color: '#fff' }}
                            whileTap={{ scale: 0.9 }}
                            onClick={()=>navigate('/faculty-login')}
                            className="bg-white text-purple-700 font-bold py-2 px-4 rounded mb-2"
                        >
                            Faculty Login
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: '#7e22ce', color: '#fff' }}
                            whileTap={{ scale: 0.9 }}
                            onClick={()=>navigate('/student-login')}
                            className="bg-white text-purple-700 font-bold py-2 px-4 rounded mb-2"
                        >
                            Student Login
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
