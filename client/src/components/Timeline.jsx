import React from 'react'
import { FaCheck } from 'react-icons/fa'

const timeline=[
    {time:"February 24, 2024",details:"Expected Delivery"},
    {time:"February 24, 2024",details:"Delivered at warehouse"},
    {time:"February 24, 2024",details:"Dispached"},
    {time:"February 24, 2024",details:"Order Placed"},

]

const timelineStatus=["Order Placed","Shipped","Delivered"]


const Timeline = ({product,orderDetails}) => {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const statusIndex=timelineStatus.findIndex(status=>status==product.orderStatus);
    // console.log(statusIndex);
    const timeline=[{label:"Order Placed",time:orderDetails?.createdAt},{label:"Shipped",time:product?.shippedAt},{label:"Delivered",time:product?.deliveredAt}]
  return (
    <div>
    
        <ol className="relative border-s-2 border-gray-200 flex flex-col pl-8 gap-4 font-xlato">
                
        {
        timeline.map((level,index)=>(
            <li className="" key={index}>
                <div className="absolute w-4 h-4 rounded-full mt-1.5 -start-3">
                    <FaCheck className={`${index<=statusIndex ? 'bg-green-500':'bg-gray-400'} text-white rounded-full p-1 w-5 h-5`} />
                </div>
                <p className={`text-base font-normal ${index<=statusIndex ? 'text-gray-700':'text-gray-400'} `}>{level.label}</p>
                {level.time && <p className={`text-base font-normal text-gray-400 `}>{new Date(level.time)?.toLocaleDateString('en-us',options)}</p>}
            </li>
        ))
        }
        </ol>

    

    </div>
  )
}

export default Timeline
