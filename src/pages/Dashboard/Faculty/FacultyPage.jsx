import React, { useEffect } from 'react'
import FacultyRight from '../../../components/FacultyRight'
import LeftDash from '../../../components/Faculty/LeftDash'
import { useState } from 'react';
import RightDash from '../../../components/Faculty/RightDash';
import ConductExam from './ConductExam';
import { useNavigate } from 'react-router-dom';

function FacultyPage() {
  const [selected, setSelected] = useState(0);

  const navigate = useNavigate();
useEffect(() => {
  if (localStorage.getItem('_token') === null) {
    navigate('/student-login');
  }

}, []);

  const data = {
    noOfStudents: 100,
    noOfFaculties: 10,
    examsConducted: 5,
    noOfDepartments: 9,
    gradeData: {
      labels: ['AIML', 'AIDS', 'ISE', 'AE', 'Marine', 'ME', 'Automobile', 'Civil', 'EEE', 'ECE', 'CSE'],
      datasets: [
        {
          label: 'Grade',
          data: [85, 80, 90, 100, 50, 39, 40, 90, 50, 60, 70,],
          fill: false,
          backgroundColor: 'rgb(99, 102, 241)',
          borderColor: 'rgba(99, 102, 241, 0.2)',
        },
      ],
    },
    attendanceData: {
      labels: ['AIML', 'AIDS', 'ISE', 'AE', 'Marine', 'ME', 'Automobile', 'Civil', 'EEE', 'ECE', 'CSE'],
      datasets: [
        {
          label: 'Attendance',
          data: [85, 80, 90, 100, 50, 39, 40, 90, 50, 60, 70,],
          fill: false,
          backgroundColor: 'rgb(99, 102, 241)',
          borderColor: 'rgba(99, 102, 241, 0.2)',
        },
      ],
    }

  };
  return (
    <div className='flex flex-row' >
      <LeftDash onclickHandler={setSelected} selected={selected} />
      <div className='w-5/6 overflow-y-auto h-screen'>
        {selected == 0 ? <RightDash dataset={data} /> :
          selected == 1 ? <FacultyRight facultyList={[]} /> :
          <ConductExam/>}
      </div>
    </div>
  )
}

export default FacultyPage
