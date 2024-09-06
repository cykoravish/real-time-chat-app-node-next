import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the username from localStorage
    localStorage.removeItem("username");

    // Remove the username cookie
    removeCookie("username");

    // Redirect to the home page or login page
    router.push("/");
    toast.success("Logged Out");
  };

  const removeCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  };

  return (
    <div className="">
      <Button
        onClick={handleLogout}
        className="rounded-full w-16 h-16"
        variant="destructive"
      >
        Exit
      </Button>
    </div>
  );
};

export default LogoutButton;
