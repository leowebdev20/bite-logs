import React from "react";
import BackButton from "../(components)/BackButton";

const about = () => {
  return (
    <div className="w-full max-w-sm m-auto p-2">
      <div className="mb-4 bg-dark-t p-6 rounded-md flex flex-col justify-between">
        <div className="text-white text-sm">
          I am Leonardo Seren, a Front End Developer from Italy!
          <div>
            You can follow me at
            <a
              href="https://github.com/leowebdev20/"
              className="italic hover:underline me-4 md:me-6 ml-1"
            >
              LeoWebDev.
            </a>
          </div>
        </div>
      </div>
      <BackButton />
    </div>
  );
};

export default about;
