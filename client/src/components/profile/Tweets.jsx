'use client'
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import TweetCard from '../cards/Tweet';
function Tweets({id}) {
    const [Tweets, setTweets] = useState([]);
    const [hasMore, sethasMore] = useState(true);
    const [loading, setloading] = useState(true);
    const [skip, setskip] = useState(0);
    const limit=7;
    const fetchUserTweets = async()=>{
        setloading(true)
        const request = await fetch(`/api/get/fetchUserTweets/${id}?limit=${limit}&skip=${skip}`,{
            method:"GET"
        })
        const response = await request.json()
        if(response.success){
            setTweets((e)=>[...e,...response.data])
            setloading(false)
            setskip(e=>e+7)
        }
        else{
            sethasMore(false)
            setloading(false)
        }
    }
    useEffect(() => {
       fetchUserTweets()
    }, []);
  return (
        Tweets.length==0&&loading?<div className='flex justify-center items-center w-full h-auto'>
        <CircularProgress  />
      </div>:<InfiniteScroll
            dataLength={Tweets.length}
            next={fetchUserTweets}
            hasMore={hasMore}
          >
            {Tweets.map((e) => {
              return (
                <TweetCard Key={e._id} text={e.Text} Usertag={e.postedBy.Usertag} authorPic={e.postedBy.Image} author={e.postedBy._id} Username={e.postedBy.Username} Images={e.image} imageCount={e.imageAmount} type={"t"} Likes={e.Likes} CommentsNo={e.totalComments}/>
              );
            })}
          </InfiniteScroll>  
  )
}

export default Tweets