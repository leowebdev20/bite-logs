'use server'
import { Mood } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

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


export const createWithDateEntry = async (data: FormData) => {
  "use server";
  const formData = {
    title: data.get("title")!.toString(),
    foods: [data.get("foods")!.toString()],
    pain: data.get("pain")!.toString(),
    content: data.get("content")!.toString(),
    mood: data.get("mood")! as Mood,
    createdAt: data.get("createdAt")!.toString()
  };
  await prisma.entry.create({ data: formData });
  // window.location.reload();
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

export const getEntryByDate = async (date: Date) => {
  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0); // Set to beginning of the day
  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999); // Set to end of the day

  console.log(startDate, endDate);
  "use server";
  const result = await prisma.entry.findFirst({
    where: {
      createdAt: {
        gte: startDate, // Greater than or equal to the start of the day
        lte: endDate,   // Less than or equal to the end of the day
      },
    },
  });
  return result
};