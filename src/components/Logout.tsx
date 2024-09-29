import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the username from localStorage
    localStorage.removeItem("username");

    // Remove the username cookie
    removeCookie("username");

    // Redirect to the home page or login page
    window.location.reload();
    router.push("/");
    toast.success("Logged Out");
  };

  const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  };

  return (
    <div className="">
      <div
        onClick={handleLogout}
        className="text-[16px] border-b cursor-pointer border-blue-400 shadow-[0_4px_4px_rgba(0,0,255,0.5)]"
      >
        Logout
      </div>
    </div>
  );
};

export default LogoutButton;
