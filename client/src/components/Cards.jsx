import React from 'react'
import Item from './Item'
import {Link} from 'react-router-dom'


const Cards = ({filteredProducts}) => {
  return (
    <div className='grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-4 gap-2 mx-auto'>
      
        {filteredProducts.slice(0,4).map((item,i)=>(
            <Item item={item} />
        ))}
      
    </div>
  )
}

export default Cards
