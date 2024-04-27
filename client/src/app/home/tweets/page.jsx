'use client'
import TweetInput from "@/components/Tweet/TweetInput"
import { useState, useEffect, useContext } from "react";
import AppContext from "@/context/AppContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner2 from "@/components/utils/Spinner2";
import { CircularProgress } from '@mui/material';

import TweetCard from "@/components/cards/Tweet";
function Page() {
  const context = useContext(AppContext);
  const [loading, setloading] = useState(true);
  const [posted, setposted] = useState(false);
  const [NewTweet, setNewTweet] = useState(null);
  const [skip, setskip] = useState(0);
  const [skipF, setskipF] = useState(0);
  const [forYou, setforYou] = useState(true);
  const limit = 10;
  const [AllTweets, setAllTweets] = useState([]);
  const [AllFollowingTweets, setAllFollowingTweets] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [hasMoreF, sethasMoreF] = useState(true);
  const { Userinfo } = context;
  const fetchTweets = async () => {
    try {
      setforYou(true)
      setloading(true)
      const request = await fetch(`/api/get/getAllTweet?limit=${limit}&skip=${skip}`, {
        method: "GET",
      })
      const response = await request.json();
      if (response.success && response.data) {
        if (response.data.length === 0) {
          sethasMore(false)
        }
        else {
          setskip(e => e + 10);
          setAllTweets(e => [...e, ...response.data])
          setloading(false)
        }
      }
      else {
        setloading(false)
        sethasMore(false)
      }
    } catch (error) {
      sethasMore(false)
      setloading(false)
      console.log(error)
    }
  }
  function getCookie(cookieName) {
    var cookies = window.document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName + "=") === 0) {
        return cookie.substring(cookieName.length + 1);
      }
    }
    return null;
  }
  const fetchFollowingFeed = async () => {
    try {
      setforYou(false)
      setloading(true)
      const token = getCookie("token");
      const request = await fetch(`/api/get/fetchFollowing?limit=${limit}&skip=${skipF}`, {
        method: "GET",
        headers: {
          "token": token
        }
      })
      const response = await request.json()
      if (response.success) {
        if(response.data.length==0){
          sethasMoreF(false)
        }
        setloading(false)
        sethasMoreF(true)
        setskipF(e => e + 10)
        setAllFollowingTweets(e => ([...e, ...response.data]))
      }
      else {
        // show some error  
      }
    }
    catch (error) {

    }
  }
  useEffect(() => {
    fetchTweets()
  }, []);
  return (
    <div className="w-full scroll h-[145vh] border-[1px] border-[#6e6e6e] overflow-y-scroll">
      <h1 className=" font-bold text-xl mt-10 pl-10">Home</h1>
      <TweetInput setposted={setposted} setNewTweet={setNewTweet} />
      <div className="w-full h-[70px] border-b-[1px] border-t-[1px] border-[#6e6e6e] flex flex-row">
        {!forYou?<button onClick={fetchTweets} className="flex justify-center items-center w-full h-full text-md font-bold" >For you</button>:<button className="flex justify-center items-center w-full h-full text-md font-bold text-blue-500 " >For you</button>}
        {forYou?<button className="flex border-l-[1px] border-[#6e6e6e] justify-center items-center w-full h-full text-md font-bold" onClick={fetchFollowingFeed}>Following</button>:<button className="flex border-l-[1px] border-[#6e6e6e] justify-center items-center w-full h-full text-md font-bold text-blue-500">Following</button>}
      </div>
      {
        !posted ? null : <TweetCard Key={NewTweet._id} text={NewTweet.Text} Usertag={Userinfo.Username} authorPic={Userinfo.Image} Username={Userinfo.Username} Images={NewTweet.image} imageCount={NewTweet.imageAmount} />
      }
      {
        AllTweets.length === 0 ? <div className="w-full h-[100px] flex flex-row justify-center items-center"><CircularProgress /></div> :
          forYou? <InfiniteScroll dataLength={AllTweets.length} next={fetchTweets} hasMore={hasMore}>
            {
              AllTweets.map((e) => {
                return <TweetCard Key={e._id} text={e.Text} Usertag={e.postedBy.Usertag} authorPic={e.postedBy.Image} author={e.postedBy._id} Username={e.postedBy.Username} Images={e.image} imageCount={e.imageAmount} type={"t"} Likes={e.Likes} CommentsNo={e.totalComments} />
              })
            }
          </InfiniteScroll>
          :
          <InfiniteScroll dataLength={AllFollowingTweets.length} next={fetchFollowingFeed} hasMore={hasMoreF}>
             {AllFollowingTweets.map((e) => {
                  return <TweetCard Key={e._id} text={e.Text} Usertag={e.postedBy.Usertag} authorPic={e.postedBy.Image} author={e.postedBy._id} Username={e.postedBy.Username} Images={e.image} imageCount={e.imageAmount} type={"t"} Likes={e.Likes} CommentsNo={e.totalComments} />
                })}
          </InfiniteScroll>
}
      {
        loading && AllTweets.length > 0 && hasMore ?
          <div className="flex w-full justify-center items-center">
            <CircularProgress />
          </div>
          : loading ? null : <p className="text-md text-center">no more tweets</p>
      }
    </div>
  )
}
export default Page