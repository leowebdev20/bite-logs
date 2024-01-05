"use client";
import React, { useEffect, useState } from "react";
import { Mood } from "@prisma/client";
import { redirect } from "next/navigation";
import FoodList from "../../assets/foodList.json";
import PainList from "../../assets/painList.json";
import { IEntry, IFoodListData, IPainListData } from "@/app/(models)/types";
import { editEntry, getEntry } from "@/app/actions/form-actions";
import FoodButton from "@/app/(components)/FoodButton";
import PainButton from "@/app/(components)/PainButton";
import SkeletonLoader from "@/app/(components)/SkeletonLoader";

const EditPage = ({
  searchParams: { id },
}: {
  searchParams: { id: string };
}) => {
  const moods = Object.values(Mood);
  const smileyMood = (mood: Mood) => {
    switch (mood) {
      case "Sad":
        return " 😞";
      case "Angry":
        return " 😠";
      case "Excited":
        return " 😃";
      case "Joyful":
        return " 😄";
      default:
        break;
    }
  };

  const [foods, setFoods] = useState<IFoodListData[]>(FoodList);
  const [selectedFoods, setSelectedFoods] = useState<IFoodListData | null>(
    null
  );
  const [pain, setPain] = useState<IPainListData[]>(PainList);
  const [selectedPain, setSelectedPain] = useState<IPainListData | null>(null);
  const [entry, setEntry] = useState<IEntry | null>(null);
  // const entry = await prisma.entry.findUnique({ where: { id } });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEntry(id);
      // set state with the result
      setEntry(data);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    setSelectedFoods(
      foods.find((x) => x.id.toString() === entry?.foods[0]) || null
    );

    setSelectedPain(
      pain.find((x) => x.pain.toString() === entry?.pain.toString()) || null
    );
  }, [entry]);

  const selectFood = (index: number | string) => {
    setFoods((prevFoods) => {
      const stateUpdate = prevFoods.map((obj) => {
        if (obj.id === index) {
          if (obj.isSelected) {
            return { ...obj, isSelected: false };
          } else if (
            entry?.foods[0] == obj.id.toString() &&
            obj.isSelected === undefined
          ) {
            return { ...obj, isSelected: false };
          } else if (
            entry?.foods[0] == obj.id.toString() &&
            obj.isSelected !== undefined
          ) {
            return { ...obj, isSelected: !obj.isSelected };
          } else {
            return { ...obj, isSelected: true };
          }
        } else {
          return { ...obj, isSelected: false };
        }
      });
      // Update selected foods to be the modified single object
      const selectedFood = stateUpdate
        // .filter((x) => x.isSelected)
        .find((x) => x.id === index);
      setSelectedFoods(selectedFood || null); // Use null if no item is found
      return stateUpdate;
    });
  };

  const selectPain = (index: number | string) => {
    setPain((prevPain) => {
      const stateUpdate = prevPain.map((obj) => {
        if (obj.pain === index) {
          if (obj.isSelected) {
            return { ...obj, isSelected: false };
          } else if (
            entry?.pain.toString() == obj.pain.toString() &&
            obj.isSelected === undefined
          ) {
            return { ...obj, isSelected: false };
          } else if (
            entry?.pain.toString() == obj.pain.toString() &&
            obj.isSelected !== undefined
          ) {
            return { ...obj, isSelected: !obj.isSelected };
          } else {
            return { ...obj, isSelected: true };
          }
        } else {
          return { ...obj, isSelected: false };
        }
      });
      const selectedPain = stateUpdate.find((x) => x.pain === index);
      setSelectedPain(selectedPain || null);
      return stateUpdate;
    });
  };

  return (
    <div className="w-full max-w-sm m-auto p-2">
      {!entry ? (
        // <SkeletonLoader className="flex gap-2 my-2 w-80">
        <SkeletonLoader className="bg-white p-4 py-8 rounded-md">
          <div className="bg-gray-400 shadow-md rounded px-8 pt-6 pb-8 mb-4"></div>
          <div className="w-full flex flex-col gap-2">
            <div className="h-5 bg-gray-400"></div>
            <div className="h-5 w-1/2 bg-gray-400"></div>
          </div>
        </SkeletonLoader>
      ) : (
        <form
          action={editEntry}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <input
              className="hidden"
              name="id"
              id="id"
              type="text"
              defaultValue={id}
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Entry title
            </label>
            <input
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="title"
              id="title"
              type="text"
              placeholder="Title"
              defaultValue={entry?.title}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="food"
            >
              Foods
            </label>
            <div className="flex flex-row gap-1 flex-wrap justify-evenly">
              <input
                className="hidden"
                name="foods"
                id="foods"
                type="text"
                value={selectedFoods?.id}
              />
              {foods?.slice(0, 8).map((x, y) => (
                <FoodButton
                  // {...x}
                  key={y}
                  food={x}
                  index={y}
                  entry={entry!}
                  isSelected={x.isSelected}
                  onClick={() => selectFood(x.id)}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="pain"
            >
              Pain
            </label>
            <div className="flex flex-row gap-1 flex-wrap justify-evenly">
              <input
                className="hidden"
                name="pain"
                id="pain"
                type="text"
                value={selectedPain?.pain}
              />
              {pain?.slice(0, 9).map((x, y) => (
                <PainButton
                  key={y}
                  pain={x}
                  index={y}
                  entry={entry!}
                  isSelected={x.isSelected}
                  onClick={() => selectPain(x.pain)}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              required
              className="shadow appearance-none border resize-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              rows={4}
              name="content"
              id="content"
              placeholder="Your entry text here"
              defaultValue={entry?.content}
            />
          </div>
          {/* <div className="mb-4"> */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Mood
          </label>
          <div className="inline-block relative w-full mb-3">
            {entry?.mood && (
              <>
                <select
                  required
                  className="text-gray-700 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  name="mood"
                  defaultValue={entry?.mood}
                >
                  <option value="" disabled></option>
                  {moods?.map((mood, idx) => (
                    <option key={idx} value={mood}>
                      {mood + smileyMood(mood)}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
            {/* <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Forgot Password?
        </a>*/}
          </div>
        </form>
      )}
    </div>
  );
};

export default EditPage;
