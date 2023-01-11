import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
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

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("Password required!", toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("Username required", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center gap-4 items-center bg-[#131324]">
        <form
          className="flex flex-col gap-8 bg-[#00000076] px-12 py-20 rounded-[32px]"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex items-center gap-1 justify-center">
            <img className="h-20" src={Logo} alt="Logo" />
            <h1 className="text-white capitalize">RChat</h1>
          </div>
          <input
            className="bg-transparent p-4 border border-solid border-[#4e0eff] rounded-md text-white w-full text-base focus:border-2 focus:border-solid focus:border-[#997af0] focus:outline-none"
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            className="bg-transparent p-4 border border-solid border-[#4e0eff] rounded-md text-white w-full text-base focus:border-2 focus:border-solid focus:border-[#997af0] focus:outline-none"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button
            className="bg-[#4e0eff] text-white px-8 py-4 border-0 font-bold cursor-pointer rounded-md text-base uppercase hover:bg-[#3d12b3]"
            type="submit"
          >
            Login
          </button>
          <span className="text-white uppercase">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#4e0eff] font-bold">
              Register
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};
export default Login;
