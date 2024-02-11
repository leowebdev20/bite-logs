"use client";
import { Mood } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IRecipe, IFoodListData } from "../(models)/types";
import { getAllRecipes } from "../actions/recipe-actions";
import FoodList from "../assets/foodList.json";
import RecipeBox from "./RecipeBox";

const deleteEntry = async (id: string) => {
  await fetch(`/api/entry/delete?id=${id}`, {
    method: "DELETE",
  });
  window.location.reload();
};

const RecipesList = ({ id, title, content, foods, pain, mood }: any) => {
  const [allFoods, setAllFoods] = useState<IFoodListData[]>(FoodList);
  const [recipes, setRecipes] = useState<IRecipe[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllRecipes();
      // set state with the result
      setRecipes(data);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [id]);

  return (
    <>
      {recipes?.length && (
        <article className="mb-4 rounded-md bg-dark-t p-6">
          <div>
            <header className="text-md flex flex-row items-center justify-between text-white">
              <h4>All recipes</h4>
              {/* <Link
            className="btn h-full px-6 py-2 w-auto"
            href="/recipes/create"
            role={"button"}
          >
            New Recipe
          </Link> */}
            </header>
            <div className="gap-4 pt-3 sm:grid md:grid-cols-2 lg:grid-cols-3">
              {recipes?.map((recipe) => (
                <RecipeBox key={recipe.id} {...recipe} />
              ))}
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default RecipesList;
