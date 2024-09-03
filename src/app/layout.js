import { Inter } from "next/font/google";
import "./globals.css";
import { ToastComponent } from "@/utils/toastUtils";
import { AuthProvider } from "@/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "sweet notes",
  description: "sweet notes and chats",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToastComponent />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
