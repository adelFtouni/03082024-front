import React from 'react'
import { BiChevronRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Item = ({ item }) => {
    return (
        <Link to='/stores' className="item">
            <img src={item.imageUrl} alt={item.text} />
            <div>
            <span>{item.text}</span>
            <p className='desc'>{item.description}</p></div>
            <BiChevronRight className='text-primary ml-auto arrow'/>
        </Link>
    );
};
const Categories = ({ items }) => {
    return (
        <>
            {items.map((item, index) => (
                <Item key={index} item={item} />
            ))}
        </>
    );
}

export default Categories