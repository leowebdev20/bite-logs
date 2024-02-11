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
      <article className="mb-4 rounded-md bg-dark-t p-6 hover:bg-light-t">
        <div>
          <header>
            <h4>👩‍🍳 Log a new recipe or try another!</h4>
          </header>
        </div>
      </article>
    </Link>
  );
};

export default RecipeCard;
