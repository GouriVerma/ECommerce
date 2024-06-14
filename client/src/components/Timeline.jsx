import React from 'react'
import { FaCheck } from 'react-icons/fa'

const timeline=[
    {time:"February 24, 2024",details:"Expected Delivery"},
    {time:"February 24, 2024",details:"Delivered at warehouse"},
    {time:"February 24, 2024",details:"Dispached"},
    {time:"February 24, 2024",details:"Order Placed"},

]

const Timeline = () => {
  return (
    <div>
    
        <ol className="relative border-s border-gray-200">
                
        {
        timeline.map((level,index)=>(
            <li className="mb-10 ms-4" key={index}>
                <div className="absolute w-4 h-4 rounded-full mt-1.5 -start-2">
                    <FaCheck className='bg-green-600 text-white rounded-full p-1' />
                </div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{level.time}</time>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">{level.details}</p>
            </li>
        ))
        }
        </ol>
    
      
    

    </div>
  )
}

export default Timeline
