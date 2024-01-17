"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-dark-t">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-t sm:mt-0">
          <li>
            <a
              href="https://github.com/leowebdev20/"
              className="hover:underline me-4 md:me-6"
            >
              © LeoWebDev 2023
            </a>
          </li>
          <li>
            <a href="/about" className="hover:underline me-4 md:me-6">
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
