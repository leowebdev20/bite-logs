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
  const [allFoods, setAllFoods] = useState<IFoodListData[]>(FoodList);

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
      <div className="flex items-center justify-center gap-1">
        <Link
          href={`/entry/edit?id=${id}`}
          // className="block bg-blue-400 text-white p-2 rounded-md text-center m-2"
          className="btn my-2 bg-green-t"
          style={{ width: "100%" }}
          role="button"
        >
          <p>Edit</p>
        </Link>
        <button
          onClick={() => deleteEntry(id)}
          // className="block bg-blue-400 text-white p-2 rounded-md m-2"
          className="btn-2 my-2 bg-gray-t"
          // style={{ width: "100%" }}
        >
          <p className=" text-medium-t">Delete</p>
        </button>
      </div>
    </article>
  );
};

export default EntryCard;
