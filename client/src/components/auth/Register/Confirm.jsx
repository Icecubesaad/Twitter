import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";
import { useState, useEffect } from "react";
const Confirm = ({ AuthPayload, imageURL, setSwitch }) => {
  const router = useRouter();
  const [Error, setError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const createAccount = async () => {
    setLoading(true);
    setError(false);
    const UserDetails=new FormData()
    UserDetails.append("Email",AuthPayload.Email)
    UserDetails.append("Password",AuthPayload.Password)
    UserDetails.append("Username",AuthPayload.Username)
    UserDetails.append("Image",AuthPayload.Image)
    const request = await fetch("/api/post/Register", {
      method: "POST",
      body: UserDetails
    });
    const response = await request.json();
    if (response.success) {
      setLoading(false);
      router.push("/Login");
    } else {
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 10000);
  }, [Error]);
  return (
    <div className="flex flex-col justify-center w-[95%] items-center gap-4 pb-6">
      <div className=" w-[60%] flex flex-col justify-center items-center">
        <div className="h-[150px]  w-[150px] bg-white border-[1px] border-white rounded-full flex justify-center items-center hover:bg-slate-300 hover:bg-opacity-25">
          <Image
            className="border-[1px] border-transparent rounded-full"
            src={imageURL || "/profile.svg"}
            height={150}
            width={150}
            alt="profile"
          />
        </div>
        <div className="w-full">
          <h1 className="text_fancy  text-lg">Username</h1>
          <p className="text_fancy  text-md">{AuthPayload.Username}</p>
          <h1 className="text_fancy  text-lg">Email</h1>
          <p className="text_fancy  text-md">{AuthPayload.Email}</p>
          {Error ? (
            <Alert variant="outlined" severity="error">
              Internal server error
            </Alert>
          ) : null}
          <button
            onClick={createAccount}
            className="w-full mt-3 border-transparent items-center h-[45px] bg-blue-800 text-white text_fancy border-[1px] rounded-lg flex justify-center"
          >
            {Loading ? (
              <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <p>Register</p>
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full mt-5">
        <button
          className="bg-white p-3 border-[1px] rounded-lg text-black"
          onClick={() => {
            setSwitch(1);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Confirm;
