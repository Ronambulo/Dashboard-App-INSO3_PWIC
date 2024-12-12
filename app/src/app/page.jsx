"use client";

import Login from "@/app/components/Login";
import Register from "./components/Register";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/app/lib/cookiesMiddleware";
import register from "@/app/lib/register";

export default function Home() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleComponent = () => {
    setShowLogin(!showLogin);
  };

  const router = useRouter();
  useEffect(() => {
    async function checkCookies() {
      if (typeof window !== "undefined") {
        const email = await getCookie("email");
        const token = await getCookie("token");

        if (email && token) {
          router.push("/dashboard/clients");
        }
      }
    }
    checkCookies();
  }, [router]);

  return (
    <div
      style={{ width: "-webkit-fill-available" }}
      className="flex items-center justify-center min-h-screen flex-col bg-terciary-bg"
    >
      {showLogin ? <Login /> : <Register register={register} />}
      <div className="flex flex-row w-[448px] justify-between mt-4">
        <button onClick={toggleComponent}>
          {showLogin ? "Switch to Register" : "Switch to Login"}
        </button>
        {showLogin && <button>Forgot Password</button>}
      </div>
    </div>
  );
}
