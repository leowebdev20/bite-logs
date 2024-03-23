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
      <article className="mb-4 flex h-full flex-col justify-between rounded-md bg-green-t p-6 hover:contrast-125">
        <div>
          <header>
            {/* <p className="text-xs  text-gray-300">{createdAt.toDateString()}</p> */}
            <h3 className="text-sm text-white">{title}</h3>
          </header>
          <p className="content">
            <style jsx>
              {`
                .content {
                  overflow: hidden;
                  display: -webkit-box;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
                }
              `}
            </style>
            {content}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default RecipeBox;
