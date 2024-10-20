import React from 'react';

import { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import RightDash from '../components/RightDash';
import LeftDash from '../components/LeftDash';
import StudentRight from '../components/StudentRight';
import FacultyRight from '../components/FacultyRight';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SuperAdminPage = () => {
  // Line Chart Data
  
const [selected, setSelected] = useState(0);




  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Revenue',
      },
    },
  };

  return (
    <div className='flex'>
      {/* Left Side - Dashboard */}

      <div className='w-1/6'>
      <LeftDash onclickHandler={setSelected} selected={selected}/>
      </div>

      {/* Right Side - Main Content */}
      <div className='w-5/6'>

      {selected==0?<RightDash/>:
      selected==1?<StudentRight/>:<FacultyRight/>}
      </div>
    </div>
  );
};

export default SuperAdminPage;
