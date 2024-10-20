import React from 'react'

function LeftDash({onclickHandler,selected}) {
  return (
    <div className="flex h-screen">
      {/* Left Side - Dashboard */}
      <div className=" bg-gray-800 text-white p-4">
        
        {/* Buttons */}
        <div className="space-y-4">
        <button onClick={()=>{onclickHandler(0)}} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Dashboard 
          </button>
          <button onClick={()=>{onclickHandler(1)}} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Faculty Detail
          </button>
          <button onClick={()=>{onclickHandler(2)}}   className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Student Detail
          </button>
        </div>
      </div>

      
      
    </div>
  )
}

export default LeftDash
