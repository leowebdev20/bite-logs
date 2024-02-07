export const revalidate = 10;
import prisma from "@/lib/prisma";
import Link from "next/link";
import CalendarCard from "./(components)/CalendarCard";
import EntryCard from "./(components)/EntryCard";
import Footer from "./(components)/Footer";
import MealPlan from "./(components)/MealPlan";
import RecipeCard from "./(components)/RecipeCard";

export default async function Home() {
  const journalEntries = await prisma.entry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

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
        <div className="gap-4 sm:grid md:grid-cols-2 lg:grid-cols-3">
          {journalEntries?.map((entry) => (
            <EntryCard key={entry.id} {...entry} />
          ))}
        </div>
      </div>
      <div className="text-3xl">&#x2022; &#x2022; &#x2022;</div>
      <div className="z-10 w-full items-center justify-between p-8 pt-4">
        <MealPlan />
        <CalendarCard />
        <RecipeCard />
      </div>

      <Footer />
    </main>
  );
}
