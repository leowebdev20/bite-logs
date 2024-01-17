'use server'
import { Mood } from "@prisma/client";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";


export const getAllRecipes = async () => {
  return await prisma.recipe.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export const createRecipe = async (data: FormData) => {
  "use server";
  const formData = {
    title: data.get("title")!.toString(),
    foods: [data.get("foods")!.toString()],
    pain: data.get("pain")!.toString(),
    content: data.get("content")!.toString(),
    mood: data.get("mood")! as Mood,
  };
  await prisma.recipe.create({ data: formData });
  // window.location.reload();
  redirect("/");
};

export const editRecipe = async (data: FormData) => {
  "use server";
  const id = data.get("id")!.toString();
  const formData = {
    title: data.get("title")!.toString(),
    foods: [data.get("foods")!.toString()],
    pain: data.get("pain")!.toString(),
    content: data.get("content")!.toString(),
    mood: data.get("mood")! as Mood,
  };
  await prisma.recipe.update({ data: formData, where: { id } });
  redirect("/recipes/create");
};

export const getRecipe = async (id: string) => {
  "use server";
  return await prisma.recipe.findUnique({ where: { id } });

};