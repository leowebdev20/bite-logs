"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import BackButton from "../(components)/BackButton";
import EntryCard from "../(components)/EntryCard";
import { IEntry } from "../(models)/types";
import { getAllEntries, getEntryByDate } from "../actions/entry-actions";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
// CardModal component

const LogCalendar = () => {
  const router = useRouter();
  const [value, onChange] = useState<Value>(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  // State to manage highlighted dates
  // const [highlightedDates, setHighlightedDates] = useState([
  //   new Date(2024, 1, 10), // Example date 1
  //   new Date(2024, 1, 15), // Example date 2
  // ]);

  const [entries, setEntries] = useState<IEntry[] | null>(null);
  const [entryDates, setEntryDates] = useState<Date[] | null>(null);
  const [singleEntry, setSingleEntry] = useState<IEntry | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllEntries();
      // set state with the result
      setEntries(data);

      // Extract dates from entries
      extractDates(data);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const fetchData = async () => {
        try {
          const data = await getEntryByDate(selectedDate);
          setSingleEntry(data);
          console.log(data, "!!!!!!!!");
        } catch (error) {
          console.error("Error fetching entry:", error);
        }
      };

      if (isModalOpen) {
        fetchData();
      }
    }
  }, [isModalOpen]);

  const extractDates = (data: IEntry[]) => {
    const datesArray = data.map((entry) => entry.createdAt);
    console.log("Extracted dates:", datesArray);
    // set state with the dates array
    setEntryDates(datesArray);
  };

  // Function to handle date selection
  const handleDateClick = (date: any) => {
    // Toggle the clicked date in the highlighted dates array
    // const updatedHighlightedDates = highlightedDates.includes(date)
    //   ? highlightedDates.filter((d) => !isSameDay(d, date))
    //   : [...highlightedDates, date];
    // setHighlightedDates(updatedHighlightedDates);
    console.log(date);
    console.log(entryDates![0]);

    // Open modal only if date is highlighted
    if (
      entryDates &&
      entryDates.some((d) => new Date(d).getDay() === date.getDay())
    ) {
      setIsModalOpen(!isModalOpen);
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
    if (entryDates && entryDates.find((d) => isSameDay(d, date))) {
      return "highlighted-date"; // Apply this class to highlighted dates
    }
    return null;
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
    setSelectedDate(null);
  };

  const CardModal = ({ onClose, date }: any) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <div className="p-4">
            <h2>{date.toDateString()}</h2>
            <p className="text-black">Recipe and mood on this day:</p>
          </div>
          <div className="gap-4 p-4 text-white">
            {singleEntry && <EntryCard key={singleEntry.id} {...singleEntry} />}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <style>
        {`
      .highlighted-date {
        background-color: #ca00ff; /* Yellow background color */
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
        <h3 className="text-center text-white">
          Review your moods and reactions by date
        </h3>
        <div className="m-2 rounded-md bg-white p-4 text-slate-800">
          <p className="pb-2 text-black">
            Days with entry logs are highlighted
          </p>
          <Calendar
            onChange={onChange}
            value={value}
            calendarType={"iso8601"}
            onClickDay={handleDateClick} // Handle date clicks
            tileClassName={tileClassName} // Apply custom classes to dates
          />
          <div>
            <p className="pt-2 text-black">
              Today is {(value as Date).toDateString()}
            </p>
          </div>
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
