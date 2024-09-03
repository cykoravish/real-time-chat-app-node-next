import Link from "next/link";
import React from "react";

export default function PasswordEnter({
  handlePasswordChange,
  handlePasswordSubmit,
  password,
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-pink-200 via-red-300 to-pink-400">
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-300 to-pink-500 text-white">
          <div className="text-2xl font-bold">Sweet Notes</div>
          <Link href={"/"}>
            <button
              type="button"
              className="py-2 px-4 text-sm font-medium rounded-lg bg-white text-pink-500 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300"
            >
              Home
            </button>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center animate__animated animate__fadeIn animate__delay-1s">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Enter Password
            </h1>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 transition duration-300"
              />
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-rose-400 to-red-500 text-white rounded-lg hover:from-pink-500 hover:to-red-600 transition duration-300 transform hover:scale-105"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
