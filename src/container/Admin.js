import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const Admin = () => {

  const [payments, setPayments] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [data, setData] = useState([])


  useEffect(() => {
    const fetchPayments = async () => {
      try {

        const res = await axios.get('https://calsoft.onrender.com/api/paymentget');
        setPayments(res.data);
        setFilterData(res.data);
        setData(res.data);


      } catch (error) {
        console.error(error);
      }
    };

    fetchPayments();
  }, []);


  const handleFilter = (value) => {

    const fil = filterData.filter((index) => index.senderWalletId.toLowerCase().includes(value) || index.receiverWalletId.toLowerCase().includes(value));
    setPayments(fil);

  }


  const sortBySender = () => {
    const sortedData = [...data];
    sortedData.sort((a, b) => a.senderWalletId.localeCompare(b.senderWalletId));
    setData(sortedData);
  };

  const sortByReceiver = () => {
    const sortedData = [...data];
    sortedData.sort((a, b) => a.receiverWalletId.localeCompare(b.receiverWalletId));
    setData(sortedData);
  };

  const sortByAmount = () => {
    const sortedData = [...data];

    console.log(sortedData)
    sortedData.sort((a, b) => a.amount - b.amount);
    setData(sortedData);
  };



  return (
    <div className="flex">
      <Sidebar />
      <div className='w-screen container'>
        <div className='mx-5 my-5 flex justify-between '>
          <h1 className='text-2xl font-bold text-slate-900 uppercase'>WALLET</h1>
          <div className='w-96'>
            <input className="shadow bg-slate-800 appearance-none border font-sm  rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Asset, wallet ..."
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>
        </div>
        <hr />
        <div className='flex mx-auto px-3 py-3 gap-2'>
          <button className='py-2 px-4 font-bold rounded' style={{ backgroundColor: "#8884d8" }} onClick={sortBySender}>Sort by Sender</button>
          <button className='py-2 px-4 font-bold rounded' style={{ backgroundColor: "#8884d8" }} onClick={sortByAmount}>Sort by Amount</button>
          <button className='py-2 px-4 font-bold rounded' style={{ backgroundColor: "#8884d8" }} onClick={sortByReceiver}>Sort by Receiver</button>
        </div>
        <hr />
        <table className='table-auto text-white  mx-auto align-middle text-center justify-between overflow-auto '>
          <thead className='border-b-2 border-white text-slate-500'>
            <tr>
              <th className='py-3 px-3'>Sender Wallet</th>
              <th className='py-3 px-3'>Receiver Wallet</th>
              <th className='py-3 px-3'>Amount</th>
              <th className='py-3 px-3'>Currency</th>
              <th className='py-3 px-3'>Timestamp</th>
            </tr>
          </thead>
          <tbody className='text-black'>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td className='py-3 px-3'>{payment.senderWalletId}</td>
                <td className='py-3 px-3'> {payment.receiverWalletId}</td>
                <td className='py-3 px-3'>{payment.amount}</td>
                <td className='py-3 px-3'>{payment.currency}</td>
                <td className='py-3 px-3'>{payment.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  )
}

export default Admin
