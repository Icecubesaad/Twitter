"use client";
import { Alert } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import {fetchUserDetails} from "@/functions";
import AppContext from "@/context/AppContext";
const AuthMain = () => {
    const context = useContext(AppContext);
    const {Userinfo,setUserinfo}=context
    const router=useRouter()
  const [Error, setError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [AuthPayload, setAuthPayload] = useState({
    "Email":"",
    "Password":""
  });

  const check = async () => {
    setLoading(true);
    setError(false);
    try {
      const request = await fetch("/api/post/login", {
        method: "POST",
        body: JSON.stringify(AuthPayload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await request.json();
      console.log(response)
      if (response.success) {
        setLoading(false);
        setUserinfo({
            Email:response.data.Email,
            Password:response.data.Password,
            Image:response.data.Image,
            Followers:response.data.Followers,
            Following:response.data.Following,
            Like_list:response.data.Like_list
        })
        router.push('/home/tweets')
      } else {
        setLoading(false);
        setErrorMessage("Invalid  Crededentials");
        setError(true);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage("An error occurred while processing your request.");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 10000);
  }, [Error]);
  return (
    <div className="flex flex-col justify-center w-[95%] items-center gap-4 pb-6 overflow-hidden">
      <h1 className="text_fancy text-xl">Login</h1>
      <div className="w-[60%] h-auto flex flex-col  gap-4">
        <h2 className="text_fancy text-lg">Email</h2>
        <input
          onChange={(e) => {
            setAuthPayload((val) => ({ ...val, ["Email"]: e.target.value }));
          }}
          value={AuthPayload.Email}
          className="w-full outline-none text_fancy bg-white  border-[1px] border-white rounded-md p-3 text-black placeholder:text-black h-[45px]"
          placeholder="Enter your Email"
        />
        <h3 className="text_fancy text-lg">Password</h3>
        <input
          value={AuthPayload.Password}
          onChange={(e) => {
            setAuthPayload((val) => ({ ...val, ["Password"]: e.target.value }));
          }}
          className="w-full outline-none text_fancy bg-white  border-[1px] border-white rounded-md p-3 text-black placeholder:text-black h-[45px]"
          placeholder="Enter your Password"
        />
        <button className="w-full flex flex-row gap-16 pl-4 bg-white text-black text_fancy border-[1px] rounded-lg border-black items-center h-[45px]">
          <GoogleIcon sx={{ color: "black" }} />
          <p className="text_fancy text-black">Sign In with Google</p>
        </button>
        {Error ? (
          <Alert variant="outlined" severity="error">
            {ErrorMessage}
          </Alert>
        ) : null}
        <button
          onClick={check}
          className="w-full flex flex-row gap-28 pl-4 bg-blue-900 text-white text_fancy border-[1px] rounded-lg border-black items-center justify-center h-[45px]"
        >
          {Loading ? (
            <div class="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <p className="text_fancy text-white">Login</p>
          )}
        </button>
      </div>
    </div>
  );
};
export default AuthMain;
