import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useParams } from 'react-router-dom';
import axios from 'axios'

const Wallet = () => {

  const { id } = useParams();
  const [totalHoldingsUSD, setTotalHoldingsUSD] = useState(0);
  const [assets, setAssets] = useState([]);
  const [transaction, setTransaction] = useState([]);


  useEffect(() => {

    const fetchSingleuserData = async () => {
      try {
        const res = await axios.get(`https://calsoft-backend.vercel.app/api/userwalletid/${id}`);
        const singleUserWallet = res.data.holdings;
        setTransaction(res.data)
        


        const exchangeRates = await axios.get("https://calsoft-backend.vercel.app/api/exchangeget");
        const exchangeFetchData = exchangeRates.data[0];



        let totalHoldingsUSD = 0;
        for (const [crypto, amount] of Object.entries(singleUserWallet)) {

          const exchangeRate = exchangeFetchData[crypto]
          const holdingsUSD = amount * exchangeRate;
          totalHoldingsUSD += holdingsUSD;
        }


        const assetsWithValues = Object.entries(singleUserWallet).map(([crypto, amount]) => {
          const exchangeRate = exchangeFetchData[crypto];
          const holdingsUSD = amount * exchangeRate;
          return {
            crypto,
            amount,
            valueUSD: holdingsUSD.toFixed(2),
          };
        });




        setTotalHoldingsUSD(totalHoldingsUSD);
        setAssets(assetsWithValues);




      } catch (error) {

        console.log(error);

      }

    }


    fetchSingleuserData();

  }, [id])


  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-screen container'>
        <div className='mx-5 my-5 '>
          <div className='text-2xl font-bold text-slate-900 uppercase px-3 py-2'>
            <h1>WALLET</h1>
          </div>
          <hr />
          <div className=' grid grid-cols-2 gap-5 container w-full text-white font-bold'>
            <div className='h-64 bg-slate-900 m-2 rounded-xl overflow-auto text-center ' style={{ width: "90%" }}>
              <h1 className='mx-auto my-10 text-3xl '>User Holdings</h1>
              <h1 className='text-2xl  w-40 h-10 rounded-md  mx-auto' style={{ backgroundColor: "#8884d8" }}>${totalHoldingsUSD.toFixed(2)}</h1>
            </div>
            <div className='h-64 bg-slate-900 m-2 rounded-xl text-white text-center font-bold' style={{ width: "90%" }}>
              <h1 className='mx-auto my-5 text-2xl'>Assets Breakdown</h1>
              <table className='table-auto text-white  mx-auto align-middle text-center justify-between  '>
                <thead className='border-b-2 border-white text-slate-500'>
                  <tr className="">
                    <th className='py-3 px-3'>Crypto</th>
                    <th className='py-3 px-3'>Amount</th>
                    <th className='py-3 px-3'>valueUSD</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    assets.map((assetBreak,index) => {
                      return (
                        <tr key={index}>
                          <td className='py-3'>{assetBreak.crypto}</td>
                          <td className='py-3'>{assetBreak.amount}</td>
                          <td className='py-3'>{assetBreak.valueUSD}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
            <div className='h-64 bg-slate-900 m-2 rounded-xl overflow-auto text-center  ' style={{ width: "90%" }}>
            <h1 className='mx-auto my-5 text-2xl'>Transaction</h1>
              <table className='table-auto text-white  mx-auto align-middle text-center justify-between  '>
                <thead className='border-b-2 border-white text-slate-500'>
                  <tr className="">
                    <th className='py-3 px-3'>SenderAddress</th>
                    <th className='py-3 px-3'>ReceiverAddress</th>
                    <th className='py-3 px-3'>Amount</th>
                    <th className='py-3 px-3'>Currency</th>
                  </tr>
                </thead>
                <br/>
                <tbody>
                <tr className='text-sm  w-40 h-10  rounded-lg py-3 gap-3' style={{ backgroundColor: "#8884d8" }} >
                          <td>{transaction.senderAddress}</td>
                          <td>{transaction.receiverAddress}</td>
                          <td>{transaction.amount}</td>
                          <td>{transaction.currency}</td>
                        </tr>
                </tbody>
              </table>
            </div>


          </div>


        </div>
      </div>
    </div>
  )
}

export default Wallet
