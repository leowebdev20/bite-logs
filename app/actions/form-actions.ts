'use server'
import { Mood } from "@prisma/client";
import { redirect } from "next/navigation";

export const createEntry = async (data: FormData) => {
  "use server";
  const formData = {
    title: data.get("title")!.toString(),
    content: data.get("content")!.toString(),
    foods: data.get("foods")!.toString(),
    mood: data.get("mood")! as Mood,
  };
  await prisma.entry.create({ data: formData });
  redirect("/");
};