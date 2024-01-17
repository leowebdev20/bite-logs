"use client";
import { Mood } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { IEntry, IFoodListData } from "../(models)/types";
import FoodList from "../assets/foodList.json";
import Modal from "./NewFoodModal";

const MealPlan = ({ id, title, content, foods, pain, mood }: any) => {
  const [allFoods, setAllFoods] = useState<IFoodListData[]>(FoodList);

  return (
    <article className="mb-4 bg-dark-t rounded-md">
      {/* <div>
        <header>
          <h4></h4>
        </header> */}
      <Modal text="🍖 Maybe next you can try..." />
      {/* </div> */}
    </article>
  );
};

export default MealPlan;
