import { useRouter } from "next/navigation";
import { showToast } from "./LoveToast";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the username from localStorage
    localStorage.removeItem("username");

    // Remove the username cookie
    removeCookie("username");

    // Redirect to the home page or login page
    router.push("/");
    window.location.reload();
    showToast("Logged Out", "success");
  };

  const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  };

  return (
    <button
      onClick={handleLogout}
      className="font-mono font-bold relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0">
        Logout
      </span>
    </button>
  );
};

export default LogoutButton;
