'use client'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState,useContext, useEffect } from 'react';
import AppContext from '@/context/AppContext';
import { useRouter } from 'next/navigation';
function TweetCard({text,Username,Key,authorPic,Images,Usertag,imageCount,author,type,Likes,CommentsNo}) {
  const router = useRouter()
  const [likeStatus, setlikeStatus] = useState(false);
  const [bookmarkStatus, setbookmarkStatus] = useState(false);
  const context = useContext(AppContext);
  const {Userinfo,setUserinfo}= context;
  const [CurrentLikes, setCurrentLikes] = useState(Likes);
  useEffect(() => {
    if(Userinfo){
      Userinfo.Like_list.map(e=>{
        if(Key==e){
          setlikeStatus(true)
        } 
      })
    }
  }, [Userinfo]);
  const like = async (id) => {
    setCurrentLikes(e=>e+1)
    setUserinfo((prevUserInfo) => ({
        ...prevUserInfo,
        Like_list: [...prevUserInfo.Like_list, id]
    }));

    try {
        const request = await fetch(`/api/post/like/${id}/t`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Corrected header name
            },
            body: JSON.stringify({
                userId: Userinfo.id,
                author:author
            })
        });

        const response = await request.json();
        if (response) {
            setlikeStatus(true);
        } else {
            setlikeStatus(false);
        }
    } catch (error) {
        // Handle any errors that occur during the fetch or parsing of JSON response
        console.error('Error occurred while liking post:', error);
        setlikeStatus(false); // Assuming you want to set likeStatus to false on error
    }
};


  return (
    <div key={Key} className='w-full h-auto flex flex-col border-[1px] pl-5 pb-5 pr-5 border-[#6e6e6e]'>
        <div className='flex flex-row items-center'>
          <div className='bg-slate-600 w-[50px] border-black h-[40px] border-[1px] rounded-full flex justify-center items-center mt-5'>
          <Image
                onClick={()=>{router.push(`/home/profile/${author}`)}}
                src={authorPic}
                width={50}
                height={50}
                alt="image"
                className="border-[1px]  border-black rounded-full"
              />
          </div>
          <div className='flex flex-row gap-2 pl-5 mt-3'>
            <h1>{Username}</h1>
            <p className=' text-slate-600'>@{Usertag}</p>
          </div>
        </div>
        <Link href={`/home/tweets/${type}/${Key}`} key={Key} >
        <p className='pl-[70px] text-lg mt-2'>
          {text}
        </p>
        <div className="w-full flex justify-center items-center h-auto mt-3">
        {imageCount == 0 ? null : imageCount == 1 ? (
          <div>
            <Image
              src={Images[0]}
              width={150}
              height={150}
              alt={`image1`}
              className="border-[1px] border-transparent rounded-3xl"
            />
          </div>
        ) : imageCount === 2 ? (
          <div className="flex flex-row gap-10">
            <Image
              src={Images[0]}
              width={180}
              height={180}
              alt={`image1`}
              className="border-[1px] border-transparent rounded-3xl"
            />
            <Image
              src={Images[1]}
              width={180}
              height={180}
              className="border-[1px] border-transparent rounded-3xl"
              alt={`image1`}
            />
          </div>
        ) : imageCount === 3 ? (
          <div className=" flex flex-col gap-5">
            <div className="flex flex-row gap-5">
              <Image
                src={Images[0]}
                width={180}
                height={180}
                className="border-[1px] border-transparent rounded-3xl"
                alt={`image1`}
              />
              <Image
                src={Images[1]}
                width={180}
                height={180}
                className="border-[1px] border-transparent rounded-3xl"
                alt={`image1`}
              />
            </div>
            <div className="flex flex-row gap-5">
              <div>
                <Image
                  src={Images[2]}
                  width={180}
                  height={180}
                  className="border-[1px] border-transparent rounded-3xl"
                  alt={`image1`}
                />
              </div>
              <div></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-5">
              <Image
                src={Images[0]}
                width={180}
                height={180}
                className="border-[1px] border-transparent rounded-3xl"
                alt={`image1`}
              />
              <Image
                src={Images[1]}
                width={180}
                height={180}
                className="border-[1px] border-transparent rounded-3xl"
                alt={`image1`}
              />
            </div>
            <div className="flex flex-row gap-5">
              <Image
                src={Images[2]}
                width={180}
                height={180}
                className="border-[1px] border-transparent rounded-3xl"
                alt={`image1`}
              />
              <Image
                src={Images[3]}
                width={180}
                height={180}
                className="border-[1px] border-transparent rounded-3xl"
                alt={`image1`}
              />
            </div>
          </div>
        )}
        </div>
    </Link>
        <div className=' flex mt-3 flex-row justify-center pb-2'>
          <div className='flex flex-row justify-between w-[60%]'>
            <div className=' flex items-center flex-row justify-center gap-2'>
          <button><ChatBubbleOutlineIcon sx={{color:"gray"}}/></button>
          <p>{CommentsNo}</p>
          </div>
          <div className=' flex items-center flex-row justify-center gap-2'>
          <button><ShareIcon sx={{color:"gray"}}/></button>
          </div>
          <div className=' flex items-center flex-row justify-center gap-2'>
          <button onClick={()=>{like(Key)}}>{likeStatus ? <FavoriteIcon sx={{color:"red"}}/> :<FavoriteBorderIcon sx={{color:"gray"}}/>}</button>
          <p className='text-white'>{CurrentLikes}</p>
          </div>
          <div className=' flex items-center flex-row justify-center gap-2'>
          <button onClick={()=>{like(Key)}}>{bookmarkStatus ? <BookmarkIcon sx={{color:"gray"}}/> :<BookmarkBorderIcon sx={{color:"gray"}}/>}</button>
          <p>0</p>
          </div>
          </div>
        </div>
        </div>
  )
}

export default TweetCard