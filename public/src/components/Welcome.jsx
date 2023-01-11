import React from "react";
import Robot from "../assets/robot.gif";

export default function Welcome({ currentUser }) {
  return (
    <div className="flex justify-center items-center flex-col text-white">
      <img className="h-80" src={Robot} alt="welcome" />
      <h1>
        Welcome,{" "}
        <span className="text-[#4e00ff] capitalize">
          {currentUser.username}!
        </span>
      </h1>
      <h3>Please select a chat to start Messaging.</h3>
    </div>
  );
}
