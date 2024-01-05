"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const LogCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="w-full max-w-sm m-auto p-2">
      <div className="text-slate-800 p-4 m-2 bg-white rounded-md">
        <Calendar onChange={onChange} value={value} />
        <p className="text-black">{value?.toString()}</p>
      </div>
    </div>
  );
};

export default LogCalendar;
