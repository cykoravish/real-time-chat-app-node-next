import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosCloseCircle } from "react-icons/io";
import { Button } from "./moving-border";

export const HoverEffect = ({
  items,
  markedAsRead,
  className,
}: {
  items: {
    _id: any;
    username: any;
    message: any;
    image_url?: any;
    createdAt: any;
    markedAsRead: any;
  }[];
  markedAsRead: (id: any) => void;
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  let [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state
  let [modalImageUrl, setModalImageUrl] = useState<string | null>(null); // Image URL for the modal
  const router = useRouter();

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

  // Open the modal with the clicked image
  const openModal = (imageUrl: string) => {
    setIsModalOpen(true);
    setModalImageUrl(imageUrl);
    // Push a new state to history for the back button functionality
    window.history.pushState(null, "", window.location.href);
  };

  // Close the modal and return to the previous state
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageUrl(null);
    router.back(); // Navigate back in the history stack
  };

  // Close modal when the back button is pressed
  useEffect(() => {
    const handlePopState = () => {
      if (isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isModalOpen]);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10 relative",
        className
      )}
    >
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
              } font-mono underline mt-12`}
            >
              {item.username}
            </CardTitle>
            <span className="text-gray-400 absolute right-0 top-0 text-sm">
              {formatDate(item.createdAt)}
            </span>

            {item.username === username && item.markedAsRead && (
              <button
                className="text-gray-400 border border-gray-500 rounded-lg px-2 absolute right-0 top-8 text-xs cursor-pointer hover:bg-pink-400 hover:text-black"
                onClick={() => markedAsRead(item._id)}
              >
                <span>seen</span>
                <TiTick className="inline" />
              </button>
            )}
            {item.username !== username && (
              <button
                className="absolute right-0 top-8 text-xs cursor-pointer"
                onClick={() => markedAsRead(item._id)}
              >
                {item.markedAsRead ? (
                  <div className="border border-gray-500 rounded-lg px-2 hover:bg-pink-400">
                    <span className="text-gray-400 hover:text-black">seen</span>
                    <TiTick className="inline" />
                  </div>
                ) : (
                  <span className="text-pink-400 border border-pink-400 rounded-lg px-2 hover:bg-pink-400 hover:text-black">
                    Mark as Seen
                  </span>
                )}
              </button>
            )}

            <CardDescription>{item.message}</CardDescription>

            {item.image_url && (
              // <div
              //   className="relative w-full aspect-[16/10] sm:aspect-[4/3] md:aspect-[5/3] lg:aspect-[3/1]"
              //   onClick={() => openModal(item.image_url)}
              // >
              <div className="flex justify-center">
                <Image
                  src={item.image_url}
                  alt="cardImage"
                  width={350}
                  height={400}
                  onClick={() => openModal(item.image_url)}
                  // fill
                  // className="object-contain border border-red-500"
                  // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              // </div>
            )}
          </Card>
        </div>
      ))}

      {/* Fullscreen Modal */}
      {isModalOpen && modalImageUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full">
            <Image
              src={modalImageUrl}
              alt="FullScreenImage"
              fill
              className="object-contain"
            />
            {/* Close button */}
            <div onClick={closeModal} className="absolute top-28 right-6">
              <IoIosCloseCircle
                size={35}
                className="rounded-full bg-pink-500 font-bold"
              />
            </div>
          </div>
        </div>
      )}
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
        "rounded-2xl h-full w-full p-2 overflow-hidden bg-black border border-transparent group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-3">{children}</div>
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
    <h4 className={cn("text-zinc-100 font-bold tracking-wide", className)}>
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
        "mt-6 text-zinc-400 tracking-wide leading-relaxed text-sm break-words whitespace-pre-wrap font-semibold",
        className
      )}
    >
      {children}
    </p>
  );
};
