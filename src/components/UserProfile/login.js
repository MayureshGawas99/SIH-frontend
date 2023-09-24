import React, { useState } from "react";

import u_img from "../assests/user.png";
import e_img from "../assests/email.png";
import p_img from "../assests/password.png";

const Login = () => {
  const [action, setAction] = useState("Login");
  return (
    <div className="flex flex-col w-1/2 mt-40 ml-auto mr-auto bg-white pb-15">
      <div className="text-[#4c00b4] text-center text-4xl font-bold mt-8">
        {action}
      </div>
      <div className="mt-10 flex flex-col gap-4">
        {action === "Login" ? <div></div> : <div className="flex items-center m-auto w-2/3 h-10 bg-slate-300 rounded-md">
          <img className="mt-0 mr-9 ml-9" src={u_img} alt="" />
          <input
            className="h-8 w-2/3 bg-transparent outline-none text-lg"
            type="text"
            placeholder="Name"
          />
        </div>}
        <div className="flex items-center m-auto w-2/3 h-10 bg-slate-300 rounded-md">
          <img className="mt-0 mr-9 ml-9" src={e_img} alt="" />
          <input
            className="h-8 w-2/3 bg-transparent outline-none text-lg"
            type="email"
            placeholder="Email-ID"
          />
        </div>
        <div className="flex items-center m-auto w-2/3 h-10 bg-slate-300 rounded-md">
          <img className="mt-0 mr-9 ml-9" src={p_img} alt="" />
          <input
            className="h-8 w-2/3 bg-transparent outline-none text-lg"
            type="password"
            placeholder="Password"
          />
        </div>
      </div>
      {action === "Login" ? <div className="mt-7 mb-5 text-gray-500 text-xs">
        Forget Password ?
        <span className="text-[#4c00b4] cursor-pointer font-bold">
          Change Password
        </span>
      </div> : <div className="mt-7 mb-5"></div>}
      <div className="flex flex-col justify-center items-center mb-5">
        <div
          className={
            action === "Login"
              ? "flex justify-center items-center w-40 h-10 mb-3 text-white bg-[#4c00b4] rounded-3xl font-bold cursor-pointer"
              : "flex justify-center items-center w-40 h-10 mb-3 rounded-3xl cursor-pointer bg-slate-300 text-black"
          }
          onClick={() => {
            setAction("Login");
          }}
        >
          Login
        </div>
        <div
          className={
            action === "Sign Up"
              ? "flex justify-center items-center w-40 h-10 mb-3 text-white bg-[#4c00b4] rounded-3xl font-bold cursor-pointer"
              : "flex justify-center items-center w-40 h-10 mb-3 rounded-3xl cursor-pointer bg-slate-300 text-black"
          }
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          Sign Up
        </div>
      </div>
    </div>
  );
};

export default Login;
