import React from 'react';
import Lottie from 'lottie-react';
import homeAnimation from '../../assets/Home.json'; // Adjust the path based on your project structure

export const HomePage = () => {
    return (
        <div className="flex min-h-screen bg-gradient-to-r from-purple-500 to-black">
            {/* Lottie Animation Section */}
            <div className="flex items-center justify-center w-1/2">
                <Lottie animationData={homeAnimation} loop={true} style={{ width: '500px', height: '500px' }} />
            </div>

            {/* Button Section */}
            <div className="flex flex-col justify-center items-start w-1/2 p-8">
                <h1 className="text-3xl font-bold text-white mb-4"></h1>
                <div className='flex flex-row gap-8'>
                <button className="bg-white text-purple-700 font-bold py-2 px-4 rounded mb-2">
                   Admin Login
                </button>
                <button className="bg-white text-purple-700 font-bold py-2 px-4 rounded mb-2">
                     Faculty Login
                </button>
                <button className="bg-white text-purple-700 font-bold py-2 px-4 rounded mb-2">
                    Student Login
                </button>
                </div>
            </div>
        </div>
    );
}
