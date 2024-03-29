import { Mood } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import {
  IEntry,
  IFoodListData,
  IPainListData,
  IRecipe,
} from "../(models)/types";
import PainList from "../assets/painList.json";

export interface IPainProps {
  pain: IPainListData;
  index: number;
  entry?: IEntry;
  isSelected: boolean | null | undefined;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const PainButton = ({
  pain,
  index,
  entry,
  isSelected,
  onClick,
}: IPainProps) => {
  return (
    <>
      <button
        // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:contrast-125 dark:focus:ring-blue-800"
        className={`tooltip mb-2 block w-fit rounded-xl border p-2 text-sm font-normal text-gray-700 ${
          (isSelected || (index + 1).toString() === entry?.pain.toString()) &&
          isSelected !== false
            ? "border-2 border-gray-700"
            : ""
        }`}
        type="button"
        onClick={onClick}
      >
        {pain?.pain}
        <span className="tooltiptext">{pain?.description}</span>
      </button>
      <style jsx>{`
        /* Tooltip container */
        .tooltip {
          position: relative;
          display: inline-block;
        }

        /* Tooltip text */
        .tooltip .tooltiptext {
          visibility: hidden;

          width: 120px;
          bottom: 100%;
          left: 50%;
          margin-left: -60px; /* Use half of the width (120/2 = 60), to center the tooltip */

          background-color: #2a3851ed;
          border: 1px solid #abababe0;
          color: #fff;
          text-align: center;
          padding: 5px 0;
          border-radius: 6px;

          /* Position the tooltip text - see examples below! */
          position: absolute;
          z-index: 1;
        }

        .tooltip .tooltiptext::after {
          content: " ";
          position: absolute;
          top: 100%; /* At the bottom of the tooltip */
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: #2a3851ed transparent transparent transparent;
        }

        /* Show the tooltip text when you mouse over the tooltip container */
        .tooltip:hover .tooltiptext {
          visibility: visible;
        }
      `}</style>
    </>
  );
};

export default PainButton;
