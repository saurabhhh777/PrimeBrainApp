import React, { useState } from "react";
import GoogleLoginButton from "../GoogleLoginButton.jsx";
import { Link } from "react-router-dom";
import { userAuthStore } from "../../../store/userAuthStore.js";



const Signin = () => {


  const {signin} = userAuthStore();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [eye, setEye] = useState("false");

  function handleinputchange(key, value) {
    setUser({ ...user, [key]: value });
  }

  function handlesubmit(e) {
    e.preventDefault();
    signin(user);
  }

  return (
    <div className="h-screen flex justify-center items-center box-border">
      <div className="flex flex-col bg-slate-500 w-1/3 justify-center items-center text-center rounded">
        <div>
          <h2 className="text-xl font-poppins mt-5 mb-6 font-bold">
            Signin Page !
          </h2>
        </div>
        <div className="flex flex-col">
          <input
            className="w-64 p-2 rounded"
            type="text"
            placeholder="email"
            value={user.email}
            onChange={(e) => handleinputchange("email", e.target.value)}
          />
          <input
            className="w-64 mt-7 p-2 rounded"
            type={eye ? "text" : "password"}
            placeholder="John@123"
            value={user.password}
            onChange={(e) => handleinputchange("password", e.target.value)}
          />
          <button
            className="font-semibold text-xl bg-blue-700 rounded-md p-1  mt-7  hover:bg-blue-600 text-white"
            onClick={handlesubmit}
          >
            Signin
          </button>
          <span className="mt-3">
            Create an account.{" "}
            <Link className="text-blue-900 hover:text-blue-700" to="/signup">
              Signup
            </Link>
          </span>
        </div>
        <hr className="w-3/4 border-t border-gray-300 my-6" />
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default Signin;
