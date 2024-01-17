"use client";
import { Mood } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { IRecipe, IFoodListData } from "../(models)/types";
import FoodList from "../assets/foodList.json";

// type Props = {
//   id: string;
//   title: string;
//   content: string;
//   foods: string[];
//   mood: Mood;
// };

const deleteRecipe = async (id: string) => {
  await fetch(`/api/recipe/delete?id=${id}`, {
    method: "DELETE",
  });
  // window.location.reload();
  redirect("/recipes/create");
};

const RecipeBox = ({
  id,
  title,
  content,
  foods,
  pain,
  mood,
  createdAt,
}: IRecipe) => {
  const [allFoods, setAllFoods] = useState<IFoodListData[]>(FoodList);

  return (
    <Link
      href={`/recipes/edit?id=${id}`}
      style={{ width: "100%" }}
      role="button"
    >
      <article className="h-full mb-4 bg-green-t hover:contrast-125 p-6 rounded-md flex flex-col justify-between">
        <div>
          <header>
            {/* <p className="text-xs  text-gray-300">{createdAt.toDateString()}</p> */}
            <h3 className="text-sm text-white">{title}</h3>
          </header>
          <p>{content}</p>
        </div>
      </article>
    </Link>
  );
};

export default RecipeBox;
