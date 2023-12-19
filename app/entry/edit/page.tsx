import React from "react";
import { Mood } from "@prisma/client";
import { redirect } from "next/navigation";

const EditPage = async ({
  searchParams: { id },
}: {
  searchParams: { id: string };
}) => {
  const moods = Object.values(Mood);
  const entry = await prisma.entry.findUnique({ where: { id } });

  const editEntry = async (data: FormData) => {
    "use server";
    const formData = {
      title: data.get("title")!.toString(),
      content: data.get("content")!.toString(),
      mood: data.get("mood")! as Mood,
    };
    await prisma.entry.update({ data: formData, where: { id } });
    redirect("/");
  };

  return (
    <div className="w-full max-w-xs m-auto p-2">
      <form
        action={editEntry}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="title"
            id="title"
            type="text"
            placeholder="Title"
            defaultValue={entry?.title}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            className="shadow appearance-none border resize-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="content"
            id="content"
            placeholder="Your entry text here"
            defaultValue={entry?.content}
          />
        </div>
        {/* <div className="mb-4"> */}
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Mood
        </label>
        <div className="inline-block relative w-full mb-3">
          <select
            className="text-gray-700 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            name="mood"
            defaultValue={entry?.mood}
          >
            <option value="" disabled selected></option>
            {moods.map((mood, idx) => (
              <option key={idx} value={mood}>
                {mood}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
          {/* <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Forgot Password?
        </a>*/}
        </div>
      </form>
    </div>
  );
};

export default EditPage;
