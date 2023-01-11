import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

const Register = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      }
      navigate("/");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Enter correct Confirm Password!", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username must be atleast 3 characters.", toastOptions);
      return false;
    } else if (password.length < 4) {
      toast.error("Password must be atleast 4 characters.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center gap-4 items-center bg-[#131324]">
        <form
          className="flex flex-col gap-8 bg-[00000076] rounded-[32px] px-12 py-20"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex items-center gap-4 justify-center">
            <img className="h-20" src={Logo} alt="Logo" />
            <h1 className="text-white capitalize">RChat</h1>
          </div>
          <input
            className="bg-transparent p-4 border border-solid border-[#4e0eff] rounded-md text-white w-full text-base focus:border-2 focus:border-solid focus:border-[#997af0] focus:outline-none"
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="bg-transparent p-4 border border-solid border-[#4e0eff] rounded-md text-white w-full text-base focus:border-2 focus:border-solid focus:border-[#997af0] focus:outline-none"
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="bg-transparent p-4 border border-solid border-[#4e0eff] rounded-md text-white w-full text-base focus:border-2 focus:border-solid focus:border-[#997af0] focus:outline-none"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="bg-transparent p-4 border border-solid border-[#4e0eff] rounded-md text-white w-full text-base focus:border-2 focus:border-solid focus:border-[#997af0] focus:outline-none"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button
            className="bg-[#4e0eff] text-white py-4 px-8 border-0 font-bold cursor-pointer rounded-md text-base uppercase hover:bg-[#3d12b3]"
            type="submit"
          >
            Create User
          </button>
          <span className="text-white uppercase">
            Already have an account?{" "}
            <Link to="/login" className="text-[#4e0eff] font-bold">
              Login
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};
export default Register;
