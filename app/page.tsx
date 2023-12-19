export const revalidate = 10;
import prisma from "@/lib/prisma";
import EntryCard from "./(components)/EntryCard";

export default async function Home() {
  const journalEntries = await prisma.entry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <main className=" bg-slate-800 text-white flex flex-col items-center justify-between">
      <div className="z-10 w-full items-center justify-between font-mono p-8">
        {/* <h1 className="text-4xl font-bold tracking-tight leading-none md:text-5xl lg:text-6xl">
          Bite Logs
        </h1> */}
        {journalEntries.map((entry) => (
          <EntryCard key={entry.id} {...entry} />
        ))}
      </div>
    </main>
  );
}
