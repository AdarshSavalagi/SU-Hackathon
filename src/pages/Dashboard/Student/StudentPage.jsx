import React, { useEffect } from 'react'
import LeftDash from '../../../components/Student/LeftDash';
import { useState } from 'react';
import RightDash from '../../../components/Student/RightDash';
import PendingRight from '../../../components/Student/PendingRight';
import axios from 'axios';
import { BACKEND_URL } from '../../../constants/Constant';

function StudentPage() {
    
useEffect(() => {
  document.title = 'Student Dashboard';
  if (!localStorage.getItem('_token') || localStorage.getItem('_type') !== '1') {
    window.location.href = '/student-login';
  }
},[]);
const [exams, setExams] = useState([]);
const [written,setWritten]=useState([]);

useEffect(() => {

  const fetchData = async () => {
    try {
      const response = await axios.get(BACKEND_URL + '/api/v1/test');
      const allExams = response.data.data;
      const res = await axios.get(BACKEND_URL + '/api/v1/result/student',{headers: {
        Authorization: `${localStorage.getItem('_token')}`
      }});
      const allResults = res.data.data;
      setExams(allExams);
      console.log(exams);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
  
},[]);

const [selected, setSelected] = useState(0);
  return (
    <div className='flex flex-row' >
      <LeftDash onclickHandler={setSelected} selected={selected}/>
      <div className='w-5/6'>
      {selected==0?<RightDash/>:
      selected==1?
      <RightDash />:<PendingRight list={exams}/>}
      </div>
    </div>
  )
}

export default StudentPage
