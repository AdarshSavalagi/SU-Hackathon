import React from 'react'
import LeftDash from '../../../components/Student/LeftDash';
import { useState } from 'react';
import RightDash from '../../../components/Student/RightDash';
import PendingRight from '../../../components/Student/PendingRight';

function StudentPage() {
    
const [selected, setSelected] = useState(0);
  return (
    <div className='flex flex-row' >
      <LeftDash onclickHandler={setSelected} selected={selected}/>
      <div className='w-5/6'>
      {selected==0?<RightDash/>:
      selected==1?
      <RightDash />:<PendingRight/>}
      </div>
    </div>
  )
}

export default StudentPage
