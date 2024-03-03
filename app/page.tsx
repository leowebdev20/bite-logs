"use client";
export const revalidate = 10;
import Link from "next/link";
import { useEffect, useState } from "react";
import CalendarCard from "./(components)/CalendarCard";
import EntryCard from "./(components)/EntryCard";
import Footer from "./(components)/Footer";
import MealPlan from "./(components)/MealPlan";
import RecipeCard from "./(components)/RecipeCard";
import { IEntry } from "./(models)/types";
import { getAllEntries } from "./actions/entry-actions";

// export default async function Home() {
export default function Home() {
  const [entries, setEntries] = useState<IEntry[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllEntries();
      // set state with the result
      setEntries(data);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <main className="flex flex-col items-center justify-between text-white">
      <div className="z-10 w-full items-center justify-between p-8 pb-2">
        <div className="flex flex-row items-center justify-between">
          <h1 className="pb-4 text-3xl font-bold leading-none tracking-tight md:text-5xl lg:text-6xl">
            All Entries
          </h1>
          <Link
            className="btn mb-2 h-full w-auto bg-green-t px-6 py-2"
            href="/entry/create"
            role={"button"}
          >
            New Entry
          </Link>
        </div>
        {entries?.length ? (
          <div className="gap-4 sm:grid md:grid-cols-2 lg:grid-cols-3">
            {entries?.map((entry) => <EntryCard key={entry.id} {...entry} />)}
          </div>
        ) : (
          <div className="gap-4 text-center ">
            <h4>Add an entry...</h4>
          </div>
        )}
      </div>
      <div className="text-3xl">&#x2022; &#x2022; &#x2022;</div>
      <div className="z-10 w-full items-center justify-between p-8 pt-4">
        <CalendarCard />
        <MealPlan />
        <RecipeCard />
      </div>

      <Footer />
    </main>
  );
}
