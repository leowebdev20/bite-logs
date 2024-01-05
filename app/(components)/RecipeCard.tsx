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

const RecipeCard = ({ id, title, content, foods, pain, mood }: any) => {
  const [allFoods, setAllFoods] = useState<IFoodListData[]>(FoodList);

  return (
    <Link href={`/recipes/create`} role="button">
      <article className="mb-4 bg-slate-800 p-6 rounded-md">
        <div>
          <header>
            <h4>👩‍🍳 Log a recipe or choose a new one!</h4>
          </header>
        </div>
      </article>
    </Link>
  );
};

export default RecipeCard;
