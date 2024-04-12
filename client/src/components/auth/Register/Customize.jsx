"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Alert } from "@mui/material";
const Customize = ({ AuthPayload, setAuthPayload, setSwitch, setPFP,PFP }) => {
  const [Error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [Loading, setLoading] = useState(false);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError(true);
      } else if (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
      ) {
        setAuthPayload((prev) => ({ ...prev, ["Image"]: file }));
        setPFP(imageUrl);
        setError(false);
      } else {
        setError(true);
      }
    }
  };

  const handleImageClick = () => {
    // Trigger a click on the input tag
    document.getElementById("imageInput").click();
  };
  const checkUsername = async () => {
    setLoading(true);
    const { Username } = AuthPayload;
    if (Username.length < 1) {
      setError(true);
      setErrorMessage("Username should be of atleast 1 letter");
    } else {
      setError(false);
      const request = await fetch("/api/post/checkusername", {
        method: "POST",
        body: JSON.stringify({ Username: AuthPayload.Username }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      if (response.success) {
        setLoading(false);
        setError(true);
        setErrorMessage("This username has already been taken by another user");
      } else {
        setLoading(false);
        setSwitch(2);
        setError(false);
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 10000);
  }, [Error]);
  return (
    <div className="flex flex-col justify-center w-[95%] items-center gap-4 pb-6">
      <h1 className="text_fancy text-lg">Customize Profile</h1>
      <div className="h-[150px]  w-[150px] bg-white border-[1px] border-white rounded-full flex justify-center items-center hover:bg-slate-300 hover:bg-opacity-25">
        <Image
          onClick={handleImageClick}
          className="border-[1px] border-transparent rounded-full"
          src={PFP || "/profile.svg"}
          height={150}
          width={150}
          alt="profile"
        />
        <input
          id="imageInput"
          type="file"
          name="Image"
          accept=".png,.jpg,.jpeg"
          onChange={handleImageChange}
          className="opacity-0 h-[150px] w-[150px]"
        />
      </div>
      <div className="flex flex-col w-[60%]">
        <h1 className="text_fancy text-lg">Name</h1>
        <input
          value={AuthPayload.Username}
          onChange={(e) => {
            setAuthPayload((val) => ({
              ...val,
              ["Username"]: e.target.value,
            }));
          }}
          className="w-full mt-2 outline-none text_fancy bg-white  border-[1px] border-white rounded-md p-3 text-black placeholder:text-black h-[45px]"
          placeholder="Enter your Name"
        />
      </div>
      {Error ? (
        <Alert variant="outlined" severity="error">
          {ErrorMessage}
        </Alert>
      ) : null}
      <div className="flex flex-row justify-between w-full mt-5 h-[50px]">
        <button
          className="bg-white p-3 border-[1px] rounded-lg text-black h-[50px]"
          onClick={() => {
            setSwitch(0);
          }}
        >
          Back
        </button>
        {Loading ? (
          <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : null}
        <button
          onClick={checkUsername}
          className="bg-white p-3 border-[1px] rounded-lg text-black h-[50px]"
        >
          <p>Next</p>
        </button>
      </div>
    </div>
  );
};
export default Customize;
