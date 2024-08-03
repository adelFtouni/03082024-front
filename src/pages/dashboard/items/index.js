import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './index.css';
import { BsEye, BsEyeFill } from 'react-icons/bs';
import { FcApprove } from 'react-icons/fc';
import { TiTick, TiTimes } from 'react-icons/ti';

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const socket = io('http://localhost:5000');

function Items() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('http://localhost:5000/items/getItems');
      setItems(response.data);
      console.log(response)
    };

    fetchPosts();

    socket.on('newItem', (item) => {
      setItems((prevItems) => [...prevItems, item]);
      toast.info('new item added')
    });

    return () => {
      socket.off('newItem');
    };
  }, []);

  return (
    
    <div>
    <ToastContainer />
    <div className='d-flex gap-2 mb-3 align-items-center'><h1 className='mb-0'>Items</h1>
        <Link className="ml-auto btn btn-primary" to='/addItem'>Add Item</Link>
      </div>
      <div className='card'>
        <div className="post-list">
          {items.map((item) => (
            <div key={item._id}>
              <div className='list-item d-flex gap-3'>
                <div className=''><img className="rounded" src={item.imageUrl} alt="image" /></div>
                <div className=''> 
                <p>{item.name}</p>
                  </div>

                <div className='ml-auto btns d-flex gap-2'>
                  <button className='btn btn-primary'><TiTick/> approve</button>
                  <button className='btn btn-secondary'><TiTimes/> reject</button>
                  <button className='btn btn-outline'><BsEyeFill/></button>
                </div>
              </div>

            </div>
          ))}
        </div></div>
    </div>
  );
}

export default Items;
