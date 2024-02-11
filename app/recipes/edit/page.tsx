"use client";
import React, { useEffect, useState } from "react";
import { Mood } from "@prisma/client";
import { redirect } from "next/navigation";
import FoodList from "../../assets/foodList.json";
import PainList from "../../assets/painList.json";
import { IRecipe, IFoodListData, IPainListData } from "@/app/(models)/types";
import { editRecipe, getRecipe } from "@/app/actions/recipe-actions";
import FoodButton from "@/app/(components)/FoodButton";
import PainButton from "@/app/(components)/PainButton";
import SkeletonLoader from "@/app/(components)/SkeletonLoader";
import BackButton from "@/app/(components)/BackButton";
import Footer from "@/app/(components)/Footer";

const deleteRecipe = async (id: string) => {
  await fetch(`/api/recipe/delete?id=${id}`, {
    method: "DELETE",
  });
  redirect("/");
};

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
    null,
  );
  const [pain, setPain] = useState<IPainListData[]>(PainList);
  const [selectedPain, setSelectedPain] = useState<IPainListData | null>(null);
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  // const recipe = await prisma.recipe.findUnique({ where: { id } });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecipe(id);
      // set state with the result
      setRecipe(data);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    setSelectedFoods(
      foods.find((x) => x.id.toString() === recipe?.foods[0]) || null,
    );

    setSelectedPain(
      pain.find((x) => x.pain.toString() === recipe?.pain.toString()) || null,
    );
  }, [recipe]);

  const selectFood = (index: number | string) => {
    setFoods((prevFoods) => {
      const stateUpdate = prevFoods.map((obj) => {
        if (obj.id === index) {
          if (obj.isSelected) {
            return { ...obj, isSelected: false };
          } else if (
            recipe?.foods[0] == obj.id.toString() &&
            obj.isSelected === undefined
          ) {
            return { ...obj, isSelected: false };
          } else if (
            recipe?.foods[0] == obj.id.toString() &&
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
            recipe?.pain.toString() == obj.pain.toString() &&
            obj.isSelected === undefined
          ) {
            return { ...obj, isSelected: false };
          } else if (
            recipe?.pain.toString() == obj.pain.toString() &&
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
    <div className="m-auto w-full max-w-sm p-2">
      {!recipe ? (
        // <SkeletonLoader className="flex gap-2 my-2 w-80">
        <SkeletonLoader className="rounded-md bg-white p-4 py-8">
          <div className="mb-4 rounded bg-gray-400 px-8 pb-8 pt-6 shadow-md"></div>
          <div className="flex w-full flex-col gap-2">
            <div className="h-5 bg-gray-400"></div>
            <div className="h-5 w-1/2 bg-gray-400"></div>
          </div>
        </SkeletonLoader>
      ) : (
        <form
          action={editRecipe}
          className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
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
              defaultValue={recipe?.title}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="food"
            >
              Foods
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
                  entry={recipe!}
                  isSelected={x.isSelected}
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
                    entry={recipe!}
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
              Content
            </label>
            <textarea
              required
              className="focus:shadow-outline mb-3 w-full resize-none appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              rows={4}
              name="content"
              id="content"
              placeholder="Your recipe text here"
              defaultValue={recipe?.content}
            />
          </div>
          {/* <div className="mb-4"> */}
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="title"
          >
            Mood
          </label>
          <div className="relative mb-3 inline-block w-full">
            {recipe?.mood && (
              <>
                <select
                  required
                  className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight text-gray-700 shadow hover:border-gray-500 focus:outline-none"
                  name="mood"
                  defaultValue={recipe?.mood}
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
              </>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="focus:shadow-outline rounded bg-green-t px-4 py-2 font-bold text-white hover:contrast-125 focus:outline-none"
              type="submit"
            >
              Update Recipe
            </button>
            <button
              onClick={() => deleteRecipe(id)}
              // className="block bg-blue-400 text-white p-2 rounded-md m-2"
              className="btn-2 my-2 bg-gray-t text-slate-800 hover:contrast-125"
              style={{ width: "auto" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
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

      <BackButton />
    </div>
  );
};

export default EditPage;
