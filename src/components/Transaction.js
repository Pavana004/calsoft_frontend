import axios from 'axios'
import React, { useEffect,useState } from 'react'

const Transaction = () => {
   
    const [transactionData,setTransactionData] =  useState([]);

   
    const fetchTransactionData = async()=>{

        try{

            const res = await axios.get("http://localhost:5000/api/transactionget");
            setTransactionData(res.data)
           
        }catch(error){
           console.log(error)
        }
    }
useEffect(()=>{
     
    fetchTransactionData()

},[])

  return (
    <>
    <h3 className='mx-auto my-5 text-2xl text-center'>Holdings Breakdown</h3>
    <table className='table-auto text-white  mx-auto align-middle text-center justify-between  '>
    <thead className='border-b-2 border-white text-slate-500'>
      <tr className="">
        <th className='py-3 px-3'>SenderAddress</th>
        <th className='py-3 px-3'>ReceiverAddress</th>
        <th className='py-3 px-3'>Amount</th>
        <th className='py-3 px-3'>Currency</th>
      </tr>
    </thead>
    <tbody>
      {
        transactionData.map((currentData) => {
          return (
            <tr key={currentData.id}>
              <td className='py-3'>{currentData.senderAddress}</td>
              <td className='py-3'>{currentData.receiverAddress}</td>
              <td className='py-3'>{currentData.amount}</td>
              <td className='py-3'>{currentData.currency}</td>
            </tr>
          )
        })
      }
    </tbody>
  </table>
    </>
 
    
  )
}

export default Transaction