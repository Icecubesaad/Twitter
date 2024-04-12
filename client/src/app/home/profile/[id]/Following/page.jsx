'use client'
import Account from '@/components/cards/Account';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress } from '@mui/material';

function page({params}) {
    const [Following, setFollowing] = useState([]);
    const [hasMore, sethasMore] = useState(true);
    const [loading, setloading] = useState(true);
    const [skip, setskip] = useState(0);
    const limit=10;
    const fetchUserFollowing = async()=>{
        setloading(true)
        const request = await fetch(`/api/get/fetchFollowing/${params.id}?limit=${limit}&skip=${skip}`,{
            method:"GET"
        })
        const response = await request.json()
        if(response.success){
          if(response.data.length>0){
            setFollowing((e)=>[...e,...response.data])
            setloading(false)
            setskip(e=>e+10)
          }
          else{
            sethasMore(false)
            setloading(false)
          }
        }
        else{
            sethasMore(false)
            setloading(false)
        }
    }
    useEffect(() => {
        fetchUserFollowing()
    }, []);
    if(loading){
        return <div className="w-full h-screen flex justify-center items-center">
            <CircularProgress/>
        </div>
    }
  return (
    <div className='h-auto w-full flex flex-col pt-10'>
        <h1 className='text-2xl font-bold'>Following</h1>
        <InfiniteScroll dataLength={Following.length}
            next={fetchUserFollowing}
            hasMore={hasMore}>
                {
                    Following.map((e)=>{
                        return <Account Username={e.Username} id={e._id} Usertag={e.Usertag} image={e.Image} />
                    })
                }
        </InfiniteScroll>
    </div>
  )
}

export default page