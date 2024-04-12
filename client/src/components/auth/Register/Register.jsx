"use client";
import { Alert } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useState, useEffect } from "react";
const Register = ({ AuthPayload, setAuthPayload, setSwitch }) => {
  const [Error, setError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //checking  the Email availibility

  const check = async () => {
    setLoading(true)
    setError(false);
    const { Email, Password } = AuthPayload;
  
    if (!emailRegex.test(Email)) {
      setError(true);
      setErrorMessage("Enter a valid Email");
      setLoading(false)
    } else if (Password.length < 6) {
      setError(true);
      setErrorMessage("Password must have 6 or more letters");
      setLoading(false)
    } else {
      try {
        const request = await fetch("/api/post/checkUser", {
          method: "POST",
          body: JSON.stringify({ Email }),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const response = await request.json();
        if (!response.success) {
          setLoading(false)
          setSwitch(1);
        } else {
          setLoading(false)
          setErrorMessage("An account with this Email already exists.");
          setError(true);
        }
      } catch (error) {
        setLoading(false)
        console.error("Error:", error);
        setError(true);
        setErrorMessage("An error occurred while processing your request.");
      }
    }
  };
  
  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 10000);
  }, [Error]);
  return (
    <div className="flex flex-col justify-center w-[95%] items-center gap-4 pb-6 overflow-hidden">
      <h1 className="text_fancy text-xl">Register</h1>
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
          <p className="text_fancy text-black">Sign Up with Google</p>
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
         {Loading? <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div> : <p className="text_fancy text-white">Register</p>}
        </button>
      </div>
    </div>
  );
};
export default Register;
