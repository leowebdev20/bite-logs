export const revalidate = 10;
import prisma from "@/lib/prisma";
import CalendarCard from "./(components)/CalendarCard";
import EntryCard from "./(components)/EntryCard";
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
        <h1 className="text-3xl font-bold tracking-tight leading-none md:text-5xl lg:text-6xl pb-4">
          All Entries
        </h1>
        {journalEntries?.map((entry) => (
          <EntryCard key={entry.id} {...entry} />
        ))}
      </div>
      <div className="text-3xl">&#x2022; &#x2022; &#x2022;</div>
      <div className="z-10 w-full items-center justify-between p-8 pt-4">
        <MealPlan />
        <CalendarCard />
        <RecipeCard />
      </div>

      <footer className="bg-white rounded-lg shadow m-4 dark:bg-slate-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a
                href="https://github.com/leowebdev20/"
                className="hover:underline me-4 md:me-6"
              >
                © LeoWebDev 2023
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </main>
  );
}
