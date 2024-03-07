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
// CalModal component

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
          if (data) {
            console.log(data, "Entry by Date");
            setSingleEntry(data);
          }
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
    console.log(date, "date");
    console.log(entryDates![0], "first entry date");

    // Open modal only if date is highlighted
    if (
      entryDates &&
      entryDates.some(
        (d) => new Date(d).setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0),
      )
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
    } else if (date.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)) {
      return "today-date"; // Apply this class to highlighted dates
    }
    return null;
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
    setSelectedDate(null);
  };

  const CalModal = ({ onClose, date }: any) => {
    return (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden p-6 outline-none focus:outline-none">
          <div className="relative mx-auto my-6 w-auto max-w-3xl">
            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
              <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
                <h3 className="text-xl text-slate-800">
                  {date.toDateString()}
                </h3>
                <button
                  className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-gray-700 outline-none focus:outline-none"
                  onClick={onClose}
                >
                  <span className="block h-6 w-6 bg-transparent text-2xl text-gray-700 outline-none focus:outline-none">
                    ⨯
                  </span>
                </button>
              </div>
              <div className="relative flex-auto p-6">
                <p className="my-4 text-lg leading-relaxed text-slate-800">
                  🕒 Recipe and mood on this day:
                </p>
                <div className="text-white">
                  {singleEntry && (
                    <EntryCard key={singleEntry.id} {...singleEntry} />
                  )}
                </div>
              </div>
              <div className="border-blueGray-200 roundedb flex items-center justify-end gap-2 border-t border-solid p-6">
                <button
                  // className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  className="btn w-auto border border-light-t bg-white text-light-t shadow hover:bg-white hover:shadow-lg"
                  type="button"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-gray-700 opacity-25"></div>
      </>
    );
  };

  return (
    <div>
      <style>
        {`
      .today-date {
        background-color: #7cc59c; 
        color: #fff; 
        border-radius: 50%; 
      }
      .highlighted-date {
        background-color: #ca00ff; 
        color: #fff; 
        border-radius: 50%; 
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
              You selected {(value as Date).toDateString()}
            </p>
          </div>
          {/* Render CalModal if a date is selected */}
          {selectedDate && (
            <CalModal onClose={closeModal} date={selectedDate} />
          )}
        </div>
      </div>
      <BackButton />
    </div>
  );
};

export default LogCalendar;
