'use client'
import AppContext from "./AppContext";
import React,{useState} from "react";
const AppState = ({ children }) => {
    const [AuthPayload, setAuthPayload] = useState({
        Email:"",
        Password:"",
        Image:"",
        Username:"",
    });
    const [Userinfo, setUserinfo] = useState({
        Email:"",
        Password:"",
        Image:"",
        Username:"",
        Followers:"",
        Following:"",
        id:"",
        Like_list:[],
        Usertag:"",
        Followers_list:[],
        Following_list : [],
        total_likes:0
    });
    const [Tweet, setTweet] = useState({
      Text:"",
      Author:"",  //id
      Image:[],
      ImageClient:[]
    });
    const [Comment, setComment] = useState({
      Text:"",
      Author:"",
      Image:[],
      ImageClient:[]
    });
    const [SingleUserProfile, setSingleUserProfile] = useState({
      Image:"",
        Username:"",
        Followers:"",
        Following:"",
        id:"",
        Like_list:[],
        Usertag:"",
        Followers_list:[],
        Following_list : []
    });
    const [AllTweets, setAllTweets] = useState([]);
    return (
      <AppContext.Provider value={{AuthPayload,setSingleUserProfile,SingleUserProfile,setAuthPayload,Userinfo, setUserinfo,Tweet,setTweet,AllTweets, setAllTweets,Comment,setComment}}>
        {children}
      </AppContext.Provider>
    );
  };
export default AppState