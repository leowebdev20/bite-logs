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
      className={`block text-gray-700 text-sm font-normal mb-2 border rounded-xl w-fit p-2 ${
        (isSelected || index.toString() === entry?.foods[0]) &&
        isSelected !== false
          ? "border-gray-700 border-2"
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
