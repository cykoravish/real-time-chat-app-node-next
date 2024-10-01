import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deepu",
  description: "Hard work and decipline is the key to success",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar />
          {children}
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              success: {
                icon: "🎉",
                duration: 3000,
                style: {
                  border: "2px solid #4CAF50",
                  background: "#dff0d8",
                  color: "#3c763d",
                  borderRadius: "8px",
                  padding: "12px 20px",
                  fontSize: "16px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                },
              },
              error: {
                icon: "⚠️",
                duration: 3000,
                style: {
                  border: "2px solid #F44336",
                  background: "#f2dede",
                  color: "#a94442",
                  borderRadius: "8px",
                  padding: "12px 20px",
                  fontSize: "16px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
