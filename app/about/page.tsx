import React from "react";
import BackButton from "../(components)/BackButton";

const about = () => {
  return (
    <div className="m-auto w-full max-w-sm p-2">
      <div className="mb-4 flex flex-col justify-between rounded-md bg-dark-t p-6">
        <div className="text-sm text-white">
          I am Leonardo Seren, a Front End Developer from Italy!
          <div>
            You can follow me at
            <a
              href="https://github.com/leowebdev20/"
              className="me-4 ml-1 italic hover:underline md:me-6"
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
