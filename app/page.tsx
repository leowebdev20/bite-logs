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
    <main className="text-white flex flex-col items-center justify-between">
      <div className="z-10 w-full items-center justify-between p-8 pb-2">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight leading-none md:text-5xl lg:text-6xl pb-4">
            All Entries
          </h1>
          <Link
            className="btn h-full px-6 py-2 w-auto bg-green-t mb-2"
            href="/entry/create"
            role={"button"}
          >
            New Entry
          </Link>
        </div>
        <div className="sm:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
