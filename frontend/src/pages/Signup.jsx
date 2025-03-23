import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAuthStore } from "../../store/userAuthStore";
import DarkModeBtn from "../components/Buttons/DarkModeBtn";
import toast, { Toaster } from "react-hot-toast";



const Signup = () => {
  const { isDarkMode, toggleDarkMode,signup,Authuser,googleAuth} = userAuthStore();

  const navigate = useNavigate();

  const [fordata,setFormdata] = useState({
    fullname:"",
    email:"",
    password:""
  });


  const handleChange =(e)=>{
    e.preventDefault();
    const { name, value } = e.target;
    setFormdata((data) => ({
      ...data,
      [name]: value
    }));
  }

  const handleGoogleSignup = ()=>{
    googleAuth();
  }

  
  const handleSubmit = ()=>{

    const res = signup(fordata);

    if(res.success){
      toast.success('signup Successfully !');

      //debug user details
      console.log(Authuser.newUser.user);

      toast.success("Signup Successfully")
      navigate("/dashboard");
    }
    else{
      toast.error(`User already exist !`);
    }
  }



  return (
    <div
      className={`flex items-center justify-center h-screen w-full text-center
        ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
    >
      <Toaster/>
      <span className="absolute top-5 right-5">
        <DarkModeBtn onClick={toggleDarkMode} />
      </span>

      <div
        className={`flex flex-col items-center justify-center h-96 w-96 rounded-2xl border-2 
        ${
          isDarkMode
            ? "bg-gray-700 border-gray-500 text-gray-100"
            : "bg-[#e4e4e4] border-gray-300 text-black"
        }`}
      >
        <h2 className="font-poppins font-semibold text-2xl mb-4">
          Signup Page
        </h2>
        <div className="flex flex-col text-center items-center gap-3 w-3/4 ">
          <input
            type="text"
            placeholder="John Wick"
            className={`border-2 rounded w-full p-2 
              ${
                isDarkMode
                  ? "bg-gray-600 border-gray-500 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
              name="fullname"
              value={fordata.fullname}

              onChange={handleChange}
          />
          <input
            type="email"
            placeholder="example@gmail.com"
            className={`border-2 rounded w-full p-2 
              ${
                isDarkMode
                  ? "bg-gray-600 border-gray-500 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}

              name="email"
              value={FormData.email}

              onChange={handleChange}

          />
          <input
            type="password"
            placeholder="John@123"
            className={`border-2 rounded w-full p-2 
              ${
                isDarkMode
                  ? "bg-gray-600 border-gray-500 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}

              name="password"
              value={FormData.password}
              onChange={handleChange}

          />
          <button
            className={`rounded px-4 py-2 mt-2 
              ${
                isDarkMode
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-600 text-white"
              }`}

              onClick={handleSubmit}
          >
            Sign Up
          </button>
          <p className="mt-2">
            Already have an account?{" "}
            <span
              className={`hover:underline
                ${
                  isDarkMode
                    ? "text-blue-400 hover:text-blue-200"
                    : "text-blue-600 hover:text-blue-800"
                }`}
            >
              <Link to="/signin">Sign in</Link>
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-96 w-96 rounded-2xl border-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleGoogleSignup}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
