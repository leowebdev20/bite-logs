"use client";
import { Mood } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IEntry, IFoodListData } from "../(models)/types";
import { getAllEntries } from "../actions/entry-actions";
import FoodList from "../assets/foodList.json";

// const deleteEntry = async (id: string) => {
//   await fetch(`/api/entry/delete?id=${id}`, {
//     method: "DELETE",
//   });
//   window.location.reload();
// };

const CalendarCard = ({ id, title, content, foods, pain, mood }: any) => {

  return (
    <Link href={`/calendar`} role="button">
      <article className="mb-4 rounded-md bg-dark-t p-6 hover:bg-light-t">
        <div>
          <header>
            <h4>🔎 Review your reactions day by day</h4>
          </header>
        </div>
      </article>
    </Link>
  );
};

export default CalendarCard;
