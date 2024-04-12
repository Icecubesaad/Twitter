'use client'
import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import PollIcon from "@mui/icons-material/Poll";
import Spinner2 from "../utils/Spinner2";
import AppContext from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
function TweetComment({id,UserId,setposted, setNewComment}) {
    const { Comment, setComment, Userinfo } = useContext(AppContext)
    const [TweetLoading, setTweetLoading] = useState(false);

    const handleImageChange = (e) => {
        const files = e.target.files;
        if (files) {
          let isValid = true;
          const newImages = Array.from(files)
            .map((file) => {
              if (
                !["image/jpeg", "image/png", "image/jpg"].includes(file.type) ||
                file.size > 10 * 1024 * 1024
              ) {
                isValid = false;
                return null;
              }
              return URL.createObjectURL(file);
            })
            .filter((image) => image !== null);
    
          if (isValid) {
            setComment((prevState) => ({
              ...prevState,
              Image: [...prevState.Image, ...files], // Append new files to existing ones
              ImageClient: [...prevState.ImageClient, ...newImages],
            }));
            setError(false);
          } else {
            setError(true);
            setErrorMessage("Invalid file format or size.");
          }
        }
      };
    
      const handleImageClick = () => {
        document.getElementById("imageInput").click();
      };
      const handleSubmit = async () => {
        setTweetLoading(true);
        const formData = new FormData();
        formData.append("Text", Comment.Text);
        formData.append("Author", Userinfo.id);
        formData.append("UserId", UserId);
        Comment.Image.forEach((image, index) => {
          formData.append("Image", image);
        });
        try {
          const request = await fetch(`/api/post/comment/${id}`, {
            method: "POST",
            body: formData,
          });
          const response = await request.json();
          if (response.success) {
            setTweetLoading(false);
            setposted(true)
            setNewComment(response.data)
            setComment({
              Text: "",
              ImageClient: [],
              Image: [],
              Author: "",
            });
          } else {
            console.error("Failed to post tweet");
            setTweetLoading(false);
          }
        } catch (error) {
          console.error("Error:", error);
          setTweetLoading(false);
        }
      };
  return (
    <div className="flex flex-col border-[1px] border-[#6e6e6e] pl-5 pr-5 pb-5">
          <div className='flex flex-row items-center'>
            <div className='bg-slate-600 w-[50px] border-black h-[40px] border-[1px] rounded-full flex justify-center items-center mt-5'>
              <Image
                src={Userinfo.Image}
                width={50}
                height={50}
                alt="image"
                className="border-[1px]  border-black rounded-full"
              />
            </div>
            <div className='flex flex-row gap-2 pl-5 mt-3'>
              <h1>{Userinfo.Username}</h1>
              <p className=' text-slate-600'>@{Userinfo.Usertag}</p>
            </div>
          </div>
          <div className="ml-[70px]">
          <textarea
            value={Comment.Text}
            onChange={(e) => setComment((t) => ({ ...t, Text: e.target.value }))}
            placeholder="Write a Comment"
            className="w-full h-[auto] text-white text-lg outline-none placeholder:text-white bg-black "
          />
          </div>
          <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4">
          <button onClick={handleImageClick}>
            <InsertPhotoIcon sx={{ fontSize: 25, color:"#1DA1F2" }} />
          </button>
          <input
            id="imageInput"
            type="file"
            name="Image"
            accept=".png,.jpg,.jpeg"
            onChange={handleImageChange}
            className="hidden"
            multiple
          />
          <button>
            <PollIcon sx={{ fontSize: 25, color:"#1DA1F2" }} />
          </button>
          <button>
            <InsertEmoticonIcon sx={{ fontSize: 25, color:"#1DA1F2" }} />
          </button>
        </div>
        <div>
          <button
            className="w-[100px] h-[40px] border-[1px] border-transparent rounded-3xl bg-blue-500 text-white p-4 flex justify-center items-center"
            onClick={handleSubmit}
          >
            {TweetLoading ? (
              <CircularProgress color="inherit" size={30} />
            ) : (
              <p>Comment</p>
            )}
          </button>
        </div>
      </div>
        </div>
  )
}

export default TweetComment