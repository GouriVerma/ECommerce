import React from 'react'
import rolling from '../images/rolling.gif'

const Loading = () => {
  return (
     
        <div className='min-h-[90vh] text-7xl flex justify-center items-center z-50'>
            <img src={rolling} className='w-28 h-28' alt="Loading" />
        </div>
    
    
  )
}

export default Loading
