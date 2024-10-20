import React, { useEffect } from 'react';

import { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import RightDash from '../../../components/RightDash';
import LeftDash from '../../../components/LeftDash';
import StudentRight from '../../../components/StudentRight';
import FacultyRight from '../../../components/FacultyRight';
import axios from 'axios';
import { BACKEND_URL } from '../../../constants/Constant';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SuperAdminPage = () => {
  // Line Chart Data
  
const [selected, setSelected] = useState(0);

const data = {
  noOfStudents: 100,
  noOfFaculties: 10,
  examsConducted: 5,
  noOfDepartments: 9,
  gradeData:{
    labels: ['AIML', 'AIDS', 'ISE', 'AE', 'Marine', 'ME', 'Automobile', 'Civil', 'EEE', 'ECE', 'CSE'],
    datasets: [
      {
        label: 'Grade',
        data: [85,80,90,100,50,39,40,90,50,60,70,],
        fill: false,
        backgroundColor: 'rgb(99, 102, 241)',
        borderColor: 'rgba(99, 102, 241, 0.2)',
      },
    ],
  },
  attendanceData:{
    labels: ['AIML', 'AIDS', 'ISE', 'AE', 'Marine', 'ME', 'Automobile', 'Civil', 'EEE', 'ECE', 'CSE'],
    datasets: [
      {
        label: 'Attendance',
        data: [85,80,90,100,50,39,40,90,50,60,70,],
        fill: false,
        backgroundColor: 'rgb(99, 102, 241)',
        borderColor: 'rgba(99, 102, 241, 0.2)',
      },
    ],
  }
  
};

useEffect(() => {
  const fecthData = async () => {
    try {
      const facultyData = await axios.get(BACKEND_URL + '/api/v1/teacher', {
        headers: {
          Authorization: `${localStorage.getItem('_token')}`
        }
      });
      setFacultyData(facultyData.data.data);
      const studentData = await axios.get(BACKEND_URL + '/api/v1/student');
      setStudentData(studentData.data.data);
      console.log(studentData.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  fecthData();
}, []);


useEffect(() => {
  if (localStorage.getItem('_token') == null) {
    window.location.href = '/student-login';    
  }
}, []);


const [facultyData, setFacultyData] = useState([]);
const [studentData, setStudentData] = useState([]);
const [dataset, setDataset] = useState(data);

  return (
    <div className='flex flex-row' >
      <LeftDash onclickHandler={setSelected} selected={selected}/>
      <div className='w-5/6 overflow-y-auto h-screen'>
      {selected==0?<RightDash dataset={data}/>:
      selected==1?<FacultyRight facultyList={facultyData}/>:<StudentRight studentList={studentData}/>}
      </div>
    </div>
  );
};

export default SuperAdminPage;
