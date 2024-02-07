"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Footer = () => {
  return (
    <footer className="m-4 rounded-lg bg-white shadow dark:bg-dark-t">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-t sm:mt-0">
          <li>
            <a
              href="https://github.com/leowebdev20/"
              className="me-4 hover:underline md:me-6"
            >
              © LeoWebDev 2023
            </a>
          </li>
          <li>
            <a href="/about" className="me-4 hover:underline md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="mailto:serlebeiso@gmail.com" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
