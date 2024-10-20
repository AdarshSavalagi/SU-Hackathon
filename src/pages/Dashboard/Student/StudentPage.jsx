import React from 'react'
import StudentRight from '../../../components/StudentRight'
import LeftDash from '../../../components/LeftDash';
import { useState } from 'react';
import RightDash from '../../../components/RightDash';


import FacultyRight from '../../../components/FacultyRight';

function StudentPage() {
    
const [selected, setSelected] = useState(0);
  return (
    <div className='flex flex-row' >
      {/* Left Side - Dashboard */}
      <LeftDash onclickHandler={setSelected} selected={selected}/>
      


      {/* Right Side - Main Content */}

      <div className='w-5/6'>

      {selected==0?<RightDash/>:
      selected==1?<FacultyRight/>:<StudentRight/>}
      </div>
      
    </div>
  )
}

export default StudentPage
