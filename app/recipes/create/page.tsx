"use client";
import React, { useState } from "react";
import { Mood } from "@prisma/client";
import FoodList from "../../assets/foodList.json";
import PainList from "../../assets/painList.json";
import { IFoodListData, IPainListData } from "@/app/(models)/types";
import PainButton from "@/app/(components)/PainButton";
import FoodButton from "@/app/(components)/FoodButton";
import RecipesList from "@/app/(components)/RecipesList";
import { createRecipe } from "@/app/actions/recipe-actions";
import { useRouter } from "next/navigation";
import BackButton from "@/app/(components)/BackButton";

const CreatePage = () => {
  const router = useRouter();
  const moods = Object.values(Mood);
  const smileyMood = (mood: Mood) => {
    switch (mood) {
      case "Sad":
        return " 😞";
      case "Angry":
        return " 😠";
      case "Neutral":
        return " 😐";
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
    null,
  );
  const [pain, setPain] = useState<IPainListData[]>(PainList);
  const [selectedPain, setSelectedPain] = useState<IPainListData | null>(null);

  const selectFood = (index: number) => {
    setFoods((prevFoods) => {
      const stateUpdate = foods.map((obj) => {
        // 👇️ if id equals 2, update country property
        if (obj.id === index) {
          return { ...obj, isSelected: !obj.isSelected };
        }
        // 👇️ otherwise return the object as is
        return { ...obj, isSelected: false };
      });
      // Update selected foods to be the modified single object
      const selectedFood = stateUpdate.find((x) => x.id === index);
      setSelectedFoods(selectedFood || null); // Use null if no item is found
      return stateUpdate;
    });
  };

  const selectPain = (index: number) => {
    setPain((prevPain) => {
      const stateUpdate = pain.map((obj) => {
        // 👇️ if id equals 2, update country property
        if (obj.pain === index) {
          return { ...obj, isSelected: !obj.isSelected };
        }
        // 👇️ otherwise return the object as is
        return { ...obj, isSelected: false };
      });
      // Update selected foods to be the modified single object
      const selectedPain = stateUpdate.find((x) => x.pain === index);
      setSelectedPain(selectedPain || null); // Use null if no item is found
      return stateUpdate;
    });
  };

  return (
    <div className="m-auto w-full p-2">
      <div className="flex flex-col gap-2 lg:flex-row">
        <div className="m-auto w-full max-w-sm flex-1 p-2">
          <form
            action={createRecipe}
            className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
          >
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="title"
              >
                Recipe title
              </label>
              <input
                required
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                name="title"
                id="title"
                type="text"
                placeholder="Title"
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="food"
              >
                Ingredients
              </label>
              <div className="flex flex-row flex-wrap justify-evenly gap-1">
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
                    isSelected={x.isSelected}
                    // entry={entry!}
                    onClick={() => selectFood(x.id)}
                  />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="pain"
              >
                Pain
              </label>
              <div className="flex flex-row flex-wrap justify-evenly gap-1">
                <input
                  className="hidden"
                  name="pain"
                  id="pain"
                  type="text"
                  value={selectedPain?.pain}
                />
                {pain
                  ?.slice(0, 9)
                  .map((x, y) => (
                    <PainButton
                      key={y}
                      pain={x}
                      index={y}
                      isSelected={x.isSelected}
                      onClick={() => selectPain(x.pain)}
                    />
                  ))}
              </div>
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="content"
              >
                Steps
              </label>
              <textarea
                required
                className="focus:shadow-outline mb-3 w-full resize-none appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                rows={4}
                name="content"
                id="content"
                placeholder="Your recipe steps here"
              />
            </div>
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="title"
            >
              Mood for this recipe
            </label>
            <div className="relative mb-3 inline-block w-full">
              <select
                required
                className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight text-gray-700 shadow hover:border-gray-500 focus:outline-none"
                name="mood"
                defaultValue=""
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
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="focus:shadow-outline rounded bg-green-t px-4 py-2 font-bold text-white hover:contrast-125 focus:outline-none"
                type="submit"
              >
                Add Recipe
              </button>
            </div>
          </form>
        </div>
        <div className=" ml-2 mr-2 mt-2 flex-1">
          <RecipesList />
        </div>
      </div>
      <BackButton />
    </div>
  );
};

export default CreatePage;
