"use client";
import { Mood } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { IEntry, IFoodListData } from "../(models)/types";
import FoodList from "../assets/foodList.json";

// type Props = {
//   id: string;
//   title: string;
//   content: string;
//   foods: string[];
//   mood: Mood;
// };

const deleteEntry = async (id: string) => {
  await fetch(`/api/entry/delete?id=${id}`, {
    method: "DELETE",
  });
  window.location.reload();
};

const EntryCard = ({
  id,
  title,
  content,
  foods,
  pain,
  mood,
  createdAt,
}: IEntry) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [allFoods, setAllFoods] = useState<IFoodListData[]>(FoodList);

  const CloseModal = ({ onClose, date }: any) => {
    return (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden p-6 outline-none focus:outline-none">
          <div className="relative mx-auto my-6 w-auto max-w-3xl">
            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
              <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
                <h3 className="text-xl text-slate-800">Delete</h3>
                <button
                  className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-gray-700 outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="block h-6 w-6 bg-transparent text-2xl text-gray-700 outline-none focus:outline-none">
                    ⨯
                  </span>
                </button>
              </div>
              <div className="relative flex-auto p-6">
                <p className="my-4 text-lg leading-relaxed text-slate-800">
                  Are you sure you want to delete this item?
                </p>
              </div>
              <div className="border-blueGray-200 roundedb flex items-center justify-end gap-2 border-t border-solid p-6">
                <button
                  className="btn w-auto border border-light-t bg-white text-light-t shadow hover:bg-white hover:shadow-lg"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="btn w-auto bg-red-600 shadow hover:shadow-lg"
                  type="button"
                  onClick={() => deleteEntry(id)}
                >
                  I am sure
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
    <article className="mb-4 flex flex-col justify-between rounded-md bg-dark-t p-6">
      <div>
        <header>
          <p className="text-xs text-gray-300">{createdAt.toDateString()}</p>
          <h3>{title}</h3>
        </header>
        <p>{content}</p>
        <div className="flex flex-row gap-1">
          {/* Foods: {allFoods.map(food => food.)} */}
          <strong>
            <p>Foods:</p>
          </strong>
          {foods.length ? (
            allFoods?.map(
              (food, idx) =>
                food.id.toString() == foods[0] && <p key={idx}>{food.name}</p>,
            )
          ) : (
            <p>No food logged</p>
          )}
        </div>
        <p>
          <strong> My mood at the moment:</strong> {mood}
        </p>
        <p>
          <strong> Pain the next morning:</strong>{" "}
          <span className="rounded-xl border border-white px-2">
            {pain.toString()}
          </span>
        </p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Link
          href={`/entry/edit?id=${id}`}
          // className="block bg-blue-400 text-white p-2 rounded-md text-center m-2"
          className="btn flex-2 my-2 bg-green-t"
          style={{ width: "100%" }}
          role="button"
        >
          <p>Edit</p>
        </Link>
        <button
          onClick={() => setShowModal(true)}
          // className="block bg-blue-400 text-white p-2 rounded-md m-2"
          className="btn-2 my-2 flex-1 bg-gray-t"
          // style={{ width: "100%" }}
        >
          <p className=" text-medium-t">Delete</p>
        </button>
      </div>
      {showModal ? <CloseModal /> : null}
    </article>
  );
};

export default EntryCard;
