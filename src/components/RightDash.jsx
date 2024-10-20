import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

function RightDash() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Revenue',
            data: [12000, 19000, 3000, 5000, 20000, 30000, 40000],
            fill: false,
            backgroundColor: 'rgb(99, 102, 241)',
            borderColor: 'rgba(99, 102, 241, 0.2)',
          },
        ],
      };
  return (
    <div className=" p-4 bg-gray-100">
        <div className="grid grid-cols-4 gap-4 mb-4">
          {/* Stats Cards */}
          <div className="bg-gradient-to-r from-purple-400 to-pink-600 p-4 rounded-lg shadow-md h-40">
            <h2 className="text-white text-4xl">2478</h2>
            <p className="text-white text-sm">Number of Students</p>
          </div>
          <div className="bg-gradient-to-r from-purple-400 to-pink-600 p-4 rounded-lg shadow-md">
            <h2 className="text-white text-4xl">983</h2>
            <p className="text-white text-sm">Number of Faculties</p>
          </div>
          <div className="bg-gradient-to-r from-purple-400 to-pink-600 p-4 rounded-lg shadow-md">
            <h2 className="text-white text-4xl">1256</h2>
            <p className="text-white text-sm">Total Number of Exam Conducted</p>
          </div>
          <div className="bg-gradient-to-r from-purple-400 to-pink-600 p-4 rounded-lg shadow-md">
            <h2 className="text-white text-4xl">652</h2>
            <p className="text-white text-sm">Number of departements</p>
          </div>
        </div>

        {/* Large Card and Line Chart */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-800 text-xl mb-2">anything</h3>
            <p className="text-3xl text-gray-800">number</p>
            <p className="text-sm text-gray-500 mt-1">number</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-800 text-xl mb-4">Monthly Revenue Overview</h3>
            {/* Line Chart */}
            <Line data={data}  />
          </div>
        </div>
      </div>
  )
}

export default RightDash
