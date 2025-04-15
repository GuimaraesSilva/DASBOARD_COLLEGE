import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { ThemeProviderWrapper } from "@/app/theme/ThemeProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "College Management Dashboard",
  description: "Next.js College Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} bg-extralightyellow dark:bg-black text-black text-white`}
        >
          <ThemeProviderWrapper>
            {children}
            <ToastContainer position="bottom-right" theme="dark" />
          </ThemeProviderWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
