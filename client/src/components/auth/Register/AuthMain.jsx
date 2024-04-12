"use client";
import { useState, useContext } from "react";
import AppContext from "@/context/AppContext";
import Customize from "./Customize";
import Confirm from "./Confirm";
import Register from "./Register";
const AuthMain = () => {
  const context = useContext(AppContext);
  const { AuthPayload, setAuthPayload } = context;
  const [Switch, setSwitch] = useState(0);
  const [UserPFP, setUserPFP] = useState("");
  return (
    <div className="flex flex-col justify-center w-[50%] p-8 h-[450px]border-white border-[2px] rounded-lg">
      {Switch===0?
      <Register AuthPayload={AuthPayload} setAuthPayload={setAuthPayload} setSwitch={setSwitch} />
      :
      Switch===1?
      <Customize AuthPayload={AuthPayload} setAuthPayload={setAuthPayload} setSwitch={setSwitch} PFP={UserPFP} setPFP={setUserPFP} />
      :<Confirm AuthPayload={AuthPayload} setSwitch={setSwitch} imageURL={UserPFP}/>}
      
    </div>
  );
};
export default AuthMain
