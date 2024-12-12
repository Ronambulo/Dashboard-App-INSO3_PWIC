"use client";

import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";
import { getCookie } from "@/app/lib/cookiesMiddleware";
import "@/app/globals.css";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  const router = useRouter();
  useEffect(() => {
    async function checkCookies() {
      if (typeof window !== "undefined") {
        const token = await getCookie("token");

        if (!token) {
          router.push("/");
        }
      }
    }
    checkCookies();
  }, [router]);

  return (
    <>
      <div className="flex flex-row">
        <Navbar />
        {children}
      </div>
    </>
  );
}
