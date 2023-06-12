import React from 'react'
import { Link } from 'react-router-dom'




const Sidebar = () => {
  return (
    <div className='container w-72 h-screen bg-slate-900 text-white font-bold text-center justify-center flex'>
      <div className=' '>
        <div className='w-40 h-fit bg-slate-800  mx-auto my-4 rounded-2xl'>
          <h3 className='mx-auto py-5  uppercase '>Crypto Dashboard</h3>
        </div>
        <div className='mx-auto my-7 py-3 '>
          <h2 className='py-3'>Welcome to Crypto</h2>
          <p className=" text-zinc-500 text-sm ">Connect an Ethereum wallet to manage your DeFi portfolio</p>
        </div>
        <div className=' text-start mx-auto h-72 px-8 py-8  '>
          <Link to="/" >
            <div className="flex gap-2 " >
              <h2 className=''>Dashboard</h2>
            </div>
          </Link>
          <Link to="/" >
            <div className="flex gap-2 my-10 ">
              <h2 className=''>Wallet</h2>
            </div>
          </Link>
          <Link to="/payment" >
            <div className="flex gap-2 ">
              <h2>Payment</h2>
            </div>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Sidebar