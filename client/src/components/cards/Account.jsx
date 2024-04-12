import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
function Account({ Username, image, Usertag,id }) {
  const router = useRouter()
  return (
    <div className="w-full flex flex-row pr-5 items-center">
      <div onClick={()=>{router.push(`/home/profile/${id}`)}} className="flex flex-row w-full items-center gap-3 cursor-pointer">
        <div className="bg-slate-600 w-[70px] border-black border-[1px] rounded-full flex justify-center items-center mt-5">
          <Image src={image} width={70} height={70} alt="profile" className="border-[1px] border-transparent rounded-full" />
        </div>
        <div className="flex flex-col w-full">
          <h1 className=" text-md">{Username}</h1>
          <p className=" text-sm">@{Usertag}</p>
        </div>
      </div>
      <div className="w-full flex flex-row justify-end items-center">
        <button className="bg-white text-black w-auto h-[30px] pr-2 pl-2 border-[1px] border-transparent rounded-xl">
          follow
        </button>
      </div>
    </div>
  );
}

export default Account;
