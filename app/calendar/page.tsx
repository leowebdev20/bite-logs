"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import BackButton from "../(components)/BackButton";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
// CardModal component
const CardModal = ({ onClose, date }: any) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{date.toDateString()}</h2>
        <p>Card content for {date.toDateString()}</p>
      </div>
    </div>
  );
};

const LogCalendar = () => {
  const router = useRouter();
  const [value, onChange] = useState<Value>(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // State to manage highlighted dates
  const [highlightedDates, setHighlightedDates] = useState([
    new Date(2024, 1, 10), // Example date 1
    new Date(2024, 1, 15), // Example date 2
  ]);

  // Function to handle date selection
  const handleDateClick = (date: any) => {
    // Toggle the clicked date in the highlighted dates array
    // const updatedHighlightedDates = highlightedDates.includes(date)
    //   ? highlightedDates.filter((d) => !isSameDay(d, date))
    //   : [...highlightedDates, date];
    // setHighlightedDates(updatedHighlightedDates);

    // Open modal only if date is highlighted
    if (highlightedDates.some((d) => d.getTime() === date.getTime())) {
      setSelectedDate(date);
    }
  };

  // Function to check if two dates are the same
  const isSameDay = (date1: any, date2: any) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  // Function to determine custom classes for highlighted dates
  const tileClassName = ({ date, view }: any) => {
    if (highlightedDates.find((d) => isSameDay(d, date))) {
      return "highlighted-date"; // Apply this class to highlighted dates
    }
    return null;
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedDate(null);
  };

  return (
    <div>
      <style>
        {`
      .highlighted-date {
        background-color: #ffcc00; /* Yellow background color */
        color: #fff; /* White text color */
        border-radius: 50%; /* Rounded border */
      }

      /* Modal styles */
      .modal {
        display: ${selectedDate ? "block" : "none"};
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.4);
      }

      .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        border-radius: 10px;
      }

      .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }

      .close:hover,
      .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
      }
    `}
      </style>
      <div className="m-auto w-full max-w-sm p-2">
        <div className="m-2 rounded-md bg-white p-4 text-slate-800">
          <Calendar
            onChange={onChange}
            value={value}
            calendarType={"iso8601"}
            onClickDay={handleDateClick} // Handle date clicks
            tileClassName={tileClassName} // Apply custom classes to dates
          />
          <p className="text-black">{value?.toString()}</p>

          {/* Render CardModal if a date is selected */}
          {selectedDate && (
            <CardModal onClose={closeModal} date={selectedDate} />
          )}
        </div>
      </div>
      <BackButton />
    </div>
  );
};

export default LogCalendar;
