"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import BackButton from "../(components)/BackButton";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const LogCalendar = () => {
  const router = useRouter();
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <div className="m-auto w-full max-w-sm p-2">
        <div className="m-2 rounded-md bg-white p-4 text-slate-800">
          <Calendar
            onChange={onChange}
            value={value}
            calendarType={"iso8601"}
          />
          <p className="text-black">{value?.toString()}</p>
        </div>
      </div>
      <BackButton />
    </div>
  );
};

export default LogCalendar;
