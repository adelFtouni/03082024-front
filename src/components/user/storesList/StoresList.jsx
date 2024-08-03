import React from 'react'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const StoresList = ({ items }) => {
    return (
        <div>
          {items.map((item) => (
            <Link key={item.id} className="item" to={`/store`}>
              <img src={item.image} alt={item.title} />
              <div className=''>
    
              <h3>{item.title}</h3>
                <p className='mb-0'>{item.description}</p>
                <span className='time'>{item.time}</span>
                <div className='d-flex flex-wrap gap-2 mt-1 mb-3'>
                  {item.rating &&(
                  <span className='badge rating'>
                    <BsStarFill className='text-primary'/>
                    {item.rating} 
                  {item.rating > 1 ? 'stars' : 'star'}
                  </span>
                  )}
                  {item.extraElements &&
                    item.extraElements.map((extra, idx) => <span className='badge purple' key={idx}>
                     <BsStar/> {extra}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )
}

export default StoresList