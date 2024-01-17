"use client";
import { Mood } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { IEntry, IFoodListData } from "../(models)/types";
import FoodList from "../assets/foodList.json";

const deleteEntry = async (id: string) => {
  await fetch(`/api/entry/delete?id=${id}`, {
    method: "DELETE",
  });
  window.location.reload();
};

const CalendarCard = ({ id, title, content, foods, pain, mood }: any) => {
  return (
    <Link href={`/calendar`} role="button">
      <article className="mb-4 bg-dark-t p-6 rounded-md">
        <div>
          <header>
            <h4>🔎 Review your responses day by day</h4>
          </header>
        </div>
      </article>
    </Link>
  );
};

export default CalendarCard;
