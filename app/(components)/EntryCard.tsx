"use client";
import { Mood } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  title: string;
  content: string;
  mood: Mood;
};

const deleteEntry = async (id: string) => {
  await fetch(`/api/entry/delete?id=${id}`, {
    method: "DELETE",
  });
  window.location.reload();
};

const EntryCard = ({ id, title, content, mood }: Props) => {
  return (
    <article className="mb-4">
      <header>
        <h2>{title}</h2>
      </header>
      <p>{content}</p>
      <footer>
        <p>
          How I felt at the moment: <strong>{mood}</strong>
        </p>
        <Link
          href={`/entry/edit?id=${id}`}
          className="block bg-blue-400 text-white p-2 rounded-md text-center m-2"
          style={{ width: "100%" }}
          role="button"
        >
          <p>Edit</p>
        </Link>
        <button
          onClick={() => deleteEntry(id)}
          className="block bg-blue-400 text-white p-2 rounded-md m-2"
          style={{ width: "100%" }}
        >
          <p>Delete</p>
        </button>
      </footer>
    </article>
  );
};

export default EntryCard;
