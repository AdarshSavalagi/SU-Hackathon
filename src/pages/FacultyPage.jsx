import React from 'react'
import FacultyRight from '../components/FacultyRight'
import LeftDash from '../components/LeftDash'
import { useState } from 'react';

function FacultyPage() {
  const [selected, setSelected] = useState(0);
  return (
    <div >
      <LeftDash onclickHandler={setSelected} selected={selected}/>

      {/* Right Side - Main Content */}
      <FacultyRight/>
    </div>
  )
}

export default FacultyPage
