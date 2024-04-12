"use client";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Link from "next/link";
import { useState } from "react";
const Page = () => {
  const [ActiveTab, setActiveTab] = useState(1);
  const changeActiveTab = (currentId) => {
    const element_id = currentId + "opt";
    const element_to_change = window.document.getElementById(element_id);
    element_to_change.classList.add("active");
    
  };
  const changePreviousTab = (currentId) => {
    if(ActiveTab===currentId){
        return null
    }
    else{
        const element_id = currentId + "opt";
        const element_to_change = window.document.getElementById(element_id);
        element_to_change.classList.remove("active");
    }
  };
  const changeActive=(currentId)=>{
    const element_id=ActiveTab+"opt";
    const element_to_revert=window.document.getElementById(element_id);
    element_to_revert.classList.remove("active")
    setActiveTab(currentId)
    const element_id_2=currentId+"opt"
    const element_to_change=window.document.getElementById(element_id_2);
    element_to_change.classList.add("active")
  }
  return (
    <div className="w-full h-full flex flex-col p-5 mt-16 gap-3  items-center">
      <Link
        onMouseEnter={() => {
          changeActiveTab(1);
        }}
        onMouseLeave={() => {
          changePreviousTab(1);
        }}
        onClick={()=>{
            changeActive(1)
        }}
        href="#"
        className="opt active"
        id="1opt"
      >
        <HomeIcon sx={{ fontSize: 35 }} /> Home
      </Link>
      <Link
        onMouseEnter={() => {
          changeActiveTab(2);
        }}
        onMouseLeave={() => {
          changePreviousTab(2);
        }}
        onClick={()=>{
            changeActive(2)
        }}
        className="opt"
        href="#"
        id="2opt"
      >
        <BookmarkBorderIcon /> Bookmarks
      </Link>
      <Link
        onMouseEnter={() => {
          changeActiveTab(3);
        }}
        onMouseLeave={() => {
          changePreviousTab(3);
        }}
        onClick={()=>{
            changeActive(3)
        }}
        className="opt"
        href="#"
        id="3opt"
      >
        <PermIdentityIcon /> Profile
      </Link>
      <Link
        onMouseEnter={() => {
          changeActiveTab(4);
        }}
        onMouseLeave={() => {
          changePreviousTab(4);
        }}
        onClick={()=>{
            changeActive(4)
        }}
        className="opt"
        href="#"
        id="4opt"
      >
        <ChatBubbleOutlineIcon /> Direct
      </Link>
      <Link
        onMouseEnter={() => {
          changeActiveTab(5);
        }}
        onMouseLeave={() => {
          changePreviousTab(5);
        }}
        onClick={()=>{
            changeActive(5)
        }}
        className="opt"
        href="#"
        id="5opt"
      >
        <NotificationsNoneIcon /> Notifications
      </Link>
      <Link
        onMouseEnter={() => {
          changeActiveTab(6);
        }}
        onMouseLeave={() => {
          changePreviousTab(6);
        }}
        onClick={()=>{
            changeActive(6)
        }}
        className="opt"
        href="#"
        id="6opt"
      >
        <SettingsIcon /> Settings
      </Link>
    </div>
  );
};
export default Page;
