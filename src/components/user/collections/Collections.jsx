import React from 'react'
import './collections.scss'
import { Link } from 'react-router-dom'

const Collections = ({ items }) => {
    return (
        <div>
            <h2>Collections</h2>
            <div className='grid-2 mt-3'>
                {items.map((item) => (
                    <Link key={item.id} className="item" to={`/stores`}>
                        <img src={item.imageUrl} alt={item.name} />
                        <h3>{item.name}</h3>
                        
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Collections