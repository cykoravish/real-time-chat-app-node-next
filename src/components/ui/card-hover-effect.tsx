import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./moving-border";
import { TiTick } from "react-icons/ti";

export const HoverEffect = ({
  items,
  markedAsRead,
  className,
}: {
  items: {
    _id: any;
    username: any;
    message: any;
    createdAt: any;
    markedAsRead: any;
  }[];
  markedAsRead: (id: any) => void;
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const formatDate = (createdAt: string) => {
    const date = new Date(createdAt);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };
  let [username, setUsername] = useState<any>("");
  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10 relative",
        className
      )}
    >
      <div className="flex justify-center items-center mb-10">
        <Button
          borderRadius="1.75rem"
          className={`bg-white dark:bg-black font-bold text-black dark:text-white border-neutral-200 dark:border-pink-800`}
        >
          Total Notes: {items.length}
        </Button>
      </div>
      {items.map((item, idx) => (
        <div
          key={item?._id}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card
            className={`${
              item.username === "Ravish"
                ? "border dark:border-blue-400"
                : "dark:border-pink-400"
            } relative`}
          >
            <CardTitle
              className={`${
                item.username === "Ravish" ? "text-blue-400" : "text-pink-400"
              }`}
            >
              {item.username}
            </CardTitle>
            <span className="text-gray-400 absolute right-0 top-0 text-sm">
              {formatDate(item.createdAt)}
            </span>

            {item.username === username && item.markedAsRead && (
              <button
                className="text-gray-400 border border-gray-500 rounded-lg px-2 absolute right-0 top-6 text-xs cursor-pointer hover:bg-pink-400 hover:text-black"
                onClick={() => markedAsRead(item._id)}
              >
                <span>seen</span>
                <TiTick className="inline" />
              </button>
            )}
            {item.username !== username && (
              <button
                className="text-gray-400 border border-gray-500 rounded-lg px-2 absolute right-0 top-6 text-xs cursor-pointer hover:bg-pink-400 hover:text-black overflow-hidden"
                onClick={() => markedAsRead(item._id)}
              >
                {item.markedAsRead ? (
                  <>
                    <span>seen</span>
                    <TiTick className="inline" />
                  </>
                ) : (
                  <span className="text-pink-400 border border-pink-400 w-full rounded-full">
                    Mark as Seen
                  </span>
                )}
              </button>
            )}

            <CardDescription>{item.message}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
