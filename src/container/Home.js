import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios';
import {Link} from "react-router-dom"
import Transaction from '../components/Transaction';
import {CgProfile} from "react-icons/cg"

const Home = () => {   



  const [totalHoldingsUSD, setTotalHoldingsUSD] = useState(0);
  const [userDetailsData,setUserDetailsData] = useState([]);
  const [cryptoHoldings, setCryptoHoldings] = useState([]);




  useEffect(() => {
    const fetchexchangeData = async () => {
      try {
        const exchangeRates = await axios.get("http://localhost:5000/api/exchangeget");
        const exchangeFetchData = exchangeRates.data[0];
  

        const userWallet = await axios.get("http://localhost:5000/api/userwalletget");
        const userWalletFetchData = userWallet.data;
        setUserDetailsData(userWalletFetchData);



        // Calculate total holdings in USD and breakdown by cryptocurrency
        let totalHoldingsUSD = 0;
        const holdingsByCrypto = {};

        for (const wallet of userWalletFetchData) {

          for (const [crypto, amount] of Object.entries(wallet.holdings)) {

            const exchangeRate = exchangeFetchData[crypto]
            const holdingsUSD = amount * exchangeRate;
            totalHoldingsUSD += holdingsUSD;

            if (holdingsByCrypto[crypto]) {
              holdingsByCrypto[crypto] += holdingsUSD;
            } else {
              holdingsByCrypto[crypto] = holdingsUSD;
            }
          }
        }
          

        
        setTotalHoldingsUSD(totalHoldingsUSD);
        setCryptoHoldings(holdingsByCrypto);

      } catch (error) {
        console.log(error);

      }
    }
    fetchexchangeData();



  }, []);
  
 




  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-screen container'>
        <div className='mx-5 my-5 flex justify-between'>
          <div className='text-2xl font-bold text-slate-900 uppercase'>
            <h1>Dashboard</h1>
          </div>
          <div className='text-2xl font-bold text-slate-900 '>
             <CgProfile size={35} color='black' className=' cursor-pointer mx-auto'/>
          </div>
        </div>
        <hr />
        <div className=' grid grid-cols-2 gap-5 container w-full text-white font-bold'>
          <div className='h-64 bg-slate-900 m-2 rounded-xl overflow-auto text-center ' style={{ width: "90%" }}>
            <h3 className='mx-auto my-5 text-2xl'>User Wallets</h3>
            <table className='table-auto text-white  mx-auto align-middle text-center justify-between  '>
              <thead className='border-b-2 border-white text-slate-500'>
                <tr className="">
                  <th className='py-3 px-3'>Wallet Address</th>
                  <th className='py-3 px-3'>Balance</th>
                  <th className='py-3 px-3'>Payments</th>
                  <th className='py-3 px-3'>GetDetails</th>
                </tr>
              </thead>
              <tbody>
                {
                  userDetailsData.map((wallet)=>{
                    return(
                      <tr key={wallet._id                      }>
                      <td className='py-3'>{wallet.walletAddress}</td>
                      <td className='py-3'>{wallet.balance}</td>
                      <td className='py-3'>{wallet.payments}</td>
                      <td className='py-3'>
                        <Link to={`/wallet/${wallet._id}`}>
                          <button className="py-2 px-4 font-bold rounded  " style={{backgroundColor:"#8884d8"}}>show</button>
                        </Link>
  
                      </td>
                    </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          <div className='h-64  bg-slate-900 m-2 rounded-xl overflow-auto' style={{ width: "90%" }}>
           <Transaction/>

          </div>
          <div className='h-64 bg-slate-900 m-2 rounded-xl text-white text-center font-bold ' style={{ width: "90%" }}>
            <h1 className='mx-auto my-10 text-3xl ' >Total Holdings</h1>
            <h1 className='text-2xl  w-40 h-10 rounded-md  mx-auto' style={{ backgroundColor: "#8884d8" }}>${totalHoldingsUSD.toFixed(2)}</h1>
          </div>
          <div className='h-64 bg-slate-900 m-2 rounded-xl text-white text-center font-bold overflow-auto' style={{ width: "90%" }}>
            <h3 className='mx-auto my-5 text-2xl '>Holdings Breakdown</h3>
            <ul className='text-lg w-40 h-10 rounded-md  mx-auto my-3' style={{ backgroundColor: "#8884d8" }}>
              {Object.entries(cryptoHoldings).map(([crypto, valueUSD]) => (
                <li className='text-lg w-40 h-10 rounded-md  mx-auto my-3' style={{ backgroundColor: "#8884d8" }} key={crypto}>{crypto}: ${valueUSD.toFixed(2)}</li>
              ))}
            </ul>
          </div>

        </div>



      </div>

    </div>

  )
}

export default Home