import React from 'react'
import { Line } from 'react-chartjs-2';

function RightDash({ dataset }) {
    const data = dataset.gradeData;
    const data1 = dataset.attendanceData;
    return (
        <div className=" p-4 bg-gray-100">
            <div className="grid grid-cols-4 gap-4 mb-4">
                {/* Stats Cards */}
                <div className="bg-gradient-to-r from-purple-400 to-pink-600 p-4 rounded-lg shadow-md h-40">
                    <h2 className="text-white text-4xl">{dataset.noOfStudents}</h2>
                    <p className="text-white text-sm">Number of Students</p>
                </div>
                <div className="bg-gradient-to-r from-purple-400 to-pink-600 p-4 rounded-lg shadow-md">
                    <h2 className="text-white text-4xl">{dataset.noOfFaculties}</h2>
                    <p className="text-white text-sm">Number of Exams</p>
                </div>
            </div>


            {/* Large Card and Line Chart */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-gray-800 text-xl mb-4">Student Attendance</h3>
                    {/* Line Chart */}
                    <Line data={data1} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-gray-800 text-xl mb-4">Student Stats</h3>
                    {/* Line Chart */}
                    <Line data={data} />
                </div>
            </div>
        </div>
    )
}

export default RightDash
