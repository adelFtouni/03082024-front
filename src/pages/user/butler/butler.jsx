import React from 'react';
import './butler.scss';
import comming_soon from "../../../assets/images/announcements.svg"
import { BiChevronRight } from 'react-icons/bi';

const Butler = () => {
  return (
    <>
      <div className="header">
        <h1>Butler</h1>
      </div>
      <div className="flex-1 butler">
        <div className='note mb-3'>
          We deliver any thing that fits on motobike!
        </div>

<div className='card'>
        <div className='d-flex'>
          <img src={comming_soon} />
          <div>
            <h6>Deliver your staff</h6>
            <p>e.g. You forgot your keys at home and need to get them delivered to the office</p>
          </div>
          <BiChevronRight className='ml-auto text-primary'/>
        </div></div>
<div className='card'>
        <div className='d-flex'>
          <img width={"30px"} src={comming_soon} />
          <div>
            <h6>Buy something</h6>
            <p>e.g. You forgot your keys at home and need to get them delivered to the office</p>
          </div>
          <BiChevronRight className='ml-auto text-primary'/>
        </div></div>
      </div>
      </>
  );
};
 
export default Butler;
