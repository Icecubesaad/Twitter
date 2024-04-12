"use client";
import TweetCard from "@/components/cards/Tweet";
import Spinner2 from "@/components/utils/Spinner2";
import AppContext from "@/context/AppContext";
import { useEffect, useState, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import TweetComment from "@/components/Tweet/TweetComment";
import fetchUserDetails from "@/functions/FetchRequest/fetchUserDetails";
import { useRouter } from "next/navigation";
const Page = ({ params }) => {

  const router = useRouter()
  const [SingleTweet, setSingleTweet] = useState({});
  const [loading, setloading] = useState(true);
  const [Comments, setComments] = useState([]);
  const [NewComment, setNewComment] = useState(null);
  const [posted, setposted] = useState(false);
  const limit = 10;
  const [skip, setskip] = useState(0);
  const [LoadingComments, setLoadingComments] = useState(true);
  const [hasMore, sethasMore] = useState(true);
  const { Userinfo,setUserinfo } = useContext(AppContext)
  const fetchComments = async () => {
    try {
      if (SingleTweet.totalComments && SingleTweet.totalComments === 0) {
        sethasMore(false)
        return null;
      } else {
        setLoadingComments(true);
        const request = await fetch(
          `/api/get/getComments/${params.id}?limit=${limit}&skip=${skip}`,
          {
            method: "GET",
          }
        );
        const response = await request.json();
        // console.log(response)
        if (response.success && response.data.length>0) {
          setskip((e) => e + 10);
          setLoadingComments(false);
          setComments((e) => [...e, ...response.data]);
          sethasMore(true)
        } else {
          sethasMore(false)
          setLoadingComments(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
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
  const fetchSingleTweet = async () => {
    try {
      setloading(true);
      const request = await fetch(`/api/get/getTweet/${params.id}`, {
        method: "GET",
      });
      const response = await request.json();
      if (response.success) {
        fetchComments();
        setloading(false);
        setSingleTweet(response.data);
      } else {
        setloading(false);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCommentTweet= async()=>{
    try {
      setloading(true);
      const request = await fetch(`/api/get/getComment/${params.id}`, {
        method: "GET",
      });
      const response = await request.json();
      if (response.success) {
        fetchComments();
        setloading(false);
        setSingleTweet(response.data);
      } else {
        setloading(false);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if(params.type == 't' || params.type=='c'){
      const token = getCookie("token");
      if(Userinfo.id == ""){
        fetchUser(token);
      }
      if(params.type == 't'){
        fetchSingleTweet();
      }
      else{
        fetchCommentTweet()
      }
    }
    else{
      router.push('/')
    }
  }, []);
  const fetchUser = async (token) => {
    const response = await fetchUserDetails(token);
    if (response.success) {
      setUserinfo({
        Email: response.data.Email,
        Image: response.data.Image,
        Followers: response.data.Followers,
        Following: response.data.Following,
        Like_list: response.data.Like_list,
        id: response.data._id,
        Username:response.data.Username,
        Usertag:response.data.Usertag
      });
    } else {
      router.push("/Login");
    }
  };
  return (
    loading ? (
      <div className=" w-full h-screen flex justify-center items-center">
        <Spinner2 />
      </div>
    ) : (
      <div className="h-auto w-full flex flex-col justify-center border-[#202427]">
        <h1 className=" font-bold text-xl mt-10 pl-10">Home</h1>
        <TweetCard
          Key={SingleTweet._id}
          text={SingleTweet.Text}
          Usertag={SingleTweet.postedBy.Usertag}
          authorPic={SingleTweet.postedBy.Image}
          Username={SingleTweet.postedBy.Username}
          Images={SingleTweet.image}
          imageCount={SingleTweet.imageAmount}
          Likes={SingleTweet.Likes}
          CommentsNo={SingleTweet.totalComments}
        />
        <TweetComment id={params.id} UserId={SingleTweet.postedBy._id} setposted={setposted} setNewComment={setNewComment}/>
        {
          !posted? null : <TweetCard Key={NewComment._id} text={NewComment.Text} Usertag={Userinfo.Username} authorPic={Userinfo.Image} Username={Userinfo.Username} Images={NewComment.image} imageCount={NewComment.imageAmount} />
        }
        {SingleTweet.totalComments === 0 ? (
          <div className="w-full h-[100px] flex flex-row justify-center items-center">
            <p>No Comments here</p>
          </div>
        ) : LoadingComments ? (
          <div className="w-full h-[100px] flex flex-row justify-center items-center">
            <Spinner2 />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={Comments.length}
            next={fetchComments}
            hasMore={hasMore}
          >
            {Comments.map((e) => {
              return (
                <TweetCard
                  Key={e._id}
                  text={e.Text}
                  Usertag={e.postedBy.Usertag}
                  authorPic={e.postedBy.Image}
                  Username={e.postedBy.Username}
                  Images={e.image}
                  imageCount={e.imageAmount}
                  type={"c"}
                  Likes={e.Likes}
                  CommentsNo={e.Comments}
                />
              );
            })}
          </InfiniteScroll>
        )}
        {
          loading&&Comments.length>0&&hasMore&&SingleTweet.totalComments!==0?
        <div className="flex w-full justify-center items-center">
          <Spinner2/>
        </div>
        :null
        }
      </div>
    )
  );
};
export default Page;
