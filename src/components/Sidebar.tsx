"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import LogoutButton from "./Logout";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  // Check if the current path is the home page
  if (pathname === "/") return null;
  return (
    <>
      <nav className="bg-black absolute w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white text-lg font-bold">
                𝕯𝖊𝖊𝖕𝖚
              </Link>
            </div>
            <div className="hidden md:flex md:ml-4">
              <Link
                href="/show-notes"
                className={`${
                  pathname === "/show-notes" ? "text-pink-500" : "text-white"
                } hover:text-pink-500 p-2 px-6 transition duration-200 font-bold font-mono text-xl`}
              >
                Notes
              </Link>
              <Link
                href="/chats"
                className={`${
                  pathname === "/chats" ? "text-pink-500" : "text-white"
                } hover:text-pink-500 p-2 px-6 transition duration-200 font-bold font-mono text-xl`}
              >
                Chats
              </Link>
              <Link
                href="/add-notes"
                className={`${
                  pathname === "/add-notes" ? "text-pink-500" : "text-white"
                } hover:text-pink-500 p-2 px-6 transition duration-200 font-bold font-mono text-xl`}
              >
                Add
              </Link>
              <Link
                href="/quiz"
                className={`${
                  pathname === "/quiz" ? "text-pink-500" : "text-white"
                } hover:text-pink-500 p-2 px-6 transition duration-200 font-bold font-mono text-xl`}
              >
                Quiz
              </Link>
              <Link
                href="/todo-list"
                className={`${
                  pathname === "/todo-list" ? "text-pink-500" : "text-white"
                } hover:text-pink-500 p-2 px-6 transition duration-200 font-bold font-mono text-xl`}
              >
                Todo List
              </Link>
              <Link
                href="/study-notes"
                className={`${
                  pathname === "/study-notes" ? "text-pink-500" : "text-white"
                } hover:text-pink-500 p-2 px-6 transition duration-200 font-bold font-mono text-xl`}
              >
                Study Notes
              </Link>

              <div className="">
                <LogoutButton />
              </div>
            </div>
            <div className="md:hidden">
              <button
                className="flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleNavbar}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <HiMenuAlt3 size={25} />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed inset-x-0 top-0 bg-blue-500 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          } z-50`}
        >
          <div className="flex flex-col h-full px-4 pt-5 pb-3 space-y-4 text-center">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-white text-lg font-bold">
                𝕯𝖊𝖊𝖕𝖚
              </Link>
              <button
                className="text-white"
                onClick={toggleNavbar}
                aria-label="Close menu"
              >
                <IoClose size={25} />
              </button>
            </div>
            <Link
              href="/quiz"
              className={`${
                pathname === "/quiz"
                  ? "text-pink-700 bg-white rounded-lg p-2 transition duration-200"
                  : "text-white hover:bg-pink-700 rounded-lg p-2 transition duration-200"
              } font-mono font-bold`}
              onClick={toggleNavbar}
            >
              Quiz
            </Link>
            <Link
              href="/todo-list"
              className={`${
                pathname === "/todo-list"
                  ? "text-pink-700 bg-white rounded-lg p-2 transition duration-200"
                  : "text-white hover:bg-pink-700 rounded-lg p-2 transition duration-200"
              } font-mono font-bold`}
              onClick={toggleNavbar}
            >
              TodoList
            </Link>
            <Link
              href="/study-notes"
              className={`${
                pathname === "/study-notes"
                  ? "text-pink-700 bg-white rounded-lg p-2 transition duration-200"
                  : "text-white hover:bg-pink-700 rounded-lg p-2 transition duration-200"
              } font-mono font-bold`}
              onClick={toggleNavbar}
            >
              Study Notes
            </Link>
            <Link
              href="/show-notes"
              className={`${
                pathname === "/show-notes"
                  ? "text-pink-700 bg-white rounded-lg p-2 transition duration-200"
                  : "text-white hover:bg-pink-700 rounded-lg p-2 transition duration-200"
              } font-mono font-bold`}
              onClick={toggleNavbar}
            >
              Sweet Notes
            </Link>
            <Link
              href="/add-notes"
              className={`${
                pathname === "/add-notes"
                  ? "text-pink-700 bg-white rounded-lg p-2 transition duration-200"
                  : "text-white hover:bg-pink-700 rounded-lg p-2 transition duration-200"
              } font-mono font-bold`}
              onClick={toggleNavbar}
            >
              Add sweet Notes
            </Link>
            <Link
              href="/chats"
              className={`${
                pathname === "/chats"
                  ? "text-pink-700 bg-white rounded-lg p-2 transition duration-200"
                  : "text-white hover:bg-pink-700 rounded-lg p-2 transition duration-200"
              } font-mono font-bold`}
              onClick={toggleNavbar}
            >
              Chats
            </Link>
            <div className="">
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 transition-opacity duration-300 ease-in-out"
          onClick={toggleNavbar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
