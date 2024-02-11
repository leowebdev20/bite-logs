'use server'
import { Mood } from "@prisma/client";
import { redirect } from "next/navigation";

export const getAllEntries = async () => {
  return await prisma.entry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export const createEntry = async (data: FormData) => {
  "use server";
  const formData = {
    title: data.get("title")!.toString(),
    foods: [data.get("foods")!.toString()],
    pain: data.get("pain")!.toString(),
    content: data.get("content")!.toString(),
    mood: data.get("mood")! as Mood,
  };
  await prisma.entry.create({ data: formData });
  redirect("/");
};

export const editEntry = async (data: FormData) => {
  "use server";
  const id = data.get("id")!.toString();
  const formData = {
    title: data.get("title")!.toString(),
    foods: [data.get("foods")!.toString()],
    pain: data.get("pain")!.toString(),
    content: data.get("content")!.toString(),
    mood: data.get("mood")! as Mood,
  };
  await prisma.entry.update({ data: formData, where: { id } });
  redirect("/");
};

export const getEntry = async (id: string) => {
  "use server";
  return await prisma.entry.findUnique({ where: { id } });

};