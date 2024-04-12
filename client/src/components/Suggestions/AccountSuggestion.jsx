'use client'
import React from 'react'
import Account from '../cards/Account'
import Link from 'next/link'
import { useState,useEffect } from 'react'
import { CircularProgress } from '@mui/material'
function AccountSuggestion() {
  const [Accounts, setAccounts] = useState([]);
  const [loading, setloading] = useState(true);
  const fetchAccounts = async()=>{
    const request = await fetch('/api/get/whoToFollow',{
      method:"GET"
    })
    const response = await request.json()
    if(response.success){
      setAccounts(response.data)
    }
    else{
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchAccounts()
  }, []);
  return (
    <div className='w-[90%] h-auto pl-5 pb-5 bg-[#202427] border-[1px] border-[#202427] rounded-xl'>
        <h1 className=" font-bold text-xl mt-8">Who to follow</h1>
        <div className='w-full flex flex-col gap-4'>
          {
            Accounts.length>0 ? Accounts.map((e)=>{
              return <Account image={e.Image} Username={e.Username} id={e._id} Usertag={e.Usertag} />
            }) :<div className='flex justify-center items-center'>
              <CircularProgress color='inherit' />
            </div>

          }
        <Link href="/follow" className='text-[#1DA1F2] font-semibold'>see more</Link>
        </div>
    </div>
  )
}

export default AccountSuggestion