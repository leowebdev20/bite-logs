"use client";
import { Mood } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { IEntry, IFoodListData } from "../(models)/types";
import FoodList from "../assets/foodList.json";

export interface IPainProps {
  food: IFoodListData;
  index: number;
  entry?: IEntry;
  isSelected: boolean | null | undefined;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const FoodButton = ({
  food,
  index,
  entry,
  isSelected,
  onClick,
}: IPainProps) => {
  return (
    <button
      className={`mb-2 block w-fit rounded-xl border p-2 text-sm font-normal text-gray-700 ${
        (isSelected || index.toString() === entry?.foods[0]) &&
        isSelected !== false
          ? "border-2 border-gray-700"
          : ""
      }`}
      // key={index}
      type="button"
      // onClick={() => selectFood(food.id)}
      onClick={onClick}
    >
      {food?.name}
    </button>
  );
};

export default FoodButton;
