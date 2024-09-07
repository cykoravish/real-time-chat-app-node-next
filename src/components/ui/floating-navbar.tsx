"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LogoutButton from "../Logout";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: any;
    link: any;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  let auth = document.cookie.includes("username");

  const visible = useState(true);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit  fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-green-500 rounded-full dark:bg-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-4 pl-4 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {auth ? (
          <>
            {navItems.map((navItem: any, idx: number) => {
              return (
                <Link
                  key={`link=${idx}`}
                  href={navItem.link}
                  className={cn(
                    "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-green-300 hover:text-green-500"
                  )}
                >
                  <span className="block text-[16px]">{navItem.name}</span>
                </Link>
              );
            })}
            <LogoutButton />
          </>
        ) : (
          <div>LogIn</div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
