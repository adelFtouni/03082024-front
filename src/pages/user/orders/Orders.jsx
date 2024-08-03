import React from 'react'

const Orders = () => {
  return (
    <>
      <div className="header">
        <h1>Orders</h1>
      </div>
      <div className="flex-1">
        <div className="d-flex flex-column justify-content-center h-100 align-items-center">
          <h2 className='mt-3'>Orders</h2>
          <p className='w-75 mx-auto text-center'>
            Login to see your orders
          </p>
          <button className="btn btn-outline mx-auto mt-3" >Login</button>
        </div>
      </div>
    </>
  )
}

export default Orders