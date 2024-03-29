"use client";
import React from "react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        className="btn-2 my-2 w-auto bg-gray-t"
        onClick={() => router.back()}
      >
        Back
      </button>
    </div>
  );
};

export default BackButton;
