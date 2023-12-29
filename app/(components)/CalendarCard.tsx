"use client";
import { Mood } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { IEntry, IFoodListData } from "./types";
import FoodList from "../assets/foodList.json";

const deleteEntry = async (id: string) => {
  await fetch(`/api/entry/delete?id=${id}`, {
    method: "DELETE",
  });
  window.location.reload();
};

const CalendarCard = ({ id, title, content, foods, pain, mood }: any) => {
  return (
    <article className="mb-4 bg-slate-800 p-6 rounded-md">
      <div>
        <header>
          <h4>🔎 Review your responses day by day</h4>
        </header>
      </div>
    </article>
  );
};

export default CalendarCard;
