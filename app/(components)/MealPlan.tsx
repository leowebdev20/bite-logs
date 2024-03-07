"use client";
import { Mood } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { IEntry, IFoodListData } from "../(models)/types";
import FoodList from "../assets/foodList.json";
import NewFoodModal from "./NewFoodModal";

const MealPlan = ({ id, title, content, foods, pain, mood }: any) => {
  const [allFoods, setAllFoods] = useState<IFoodListData[]>(FoodList);

  return (
    // <article className="mb-4 bg-dark-t rounded-md">
    <article className="mb-4 rounded-md bg-dark-t hover:bg-light-t">
      {/* <div>
        <header>
          <h4></h4>
        </header> */}
      <NewFoodModal text="🍖 Maybe next you can try..." />
      {/* </div> */}
    </article>
  );
};

export default MealPlan;
