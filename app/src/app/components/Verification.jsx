"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "@/app/lib/cookiesMiddleware"; // Importamos la función de cookies
import verifyCode from "@/app/lib/verifyCode";
import CompleteRegistration from "./CompleteRegistration"; // Importamos el componente para el registro completo

export default function Verification() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [isVerified, setIsVerified] = useState(false); // Estado para saber si el código es válido

  React.useEffect(() => {
    const fetchEmail = async () => {
      const cookieEmail = await getCookie("email");
      setEmail(cookieEmail);
    };
    fetchEmail();
  }, []);

  const verify = async () => {
    try {
      if (!email) {
        setError("Email not found in cookies.");
        return;
      }

      await verifyCode(code);
      setIsVerified(true); // El código es correcto, habilitamos el registro completo
      deleteCookie("email"); // Borramos la cookie del email
    } catch (err) {
      setError("Invalid code. Please try again.");
    }
  };

  return (
    <div className="w-[448px]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/10 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-white">
          Verify Your Email
        </h2>
        <div className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-5 py-3 text-lg text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {error && <p className="h-5 text-base text-red-500">{error}</p>}
          </div>
          <button
            onClick={verify}
            className="w-full py-3 text-lg text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Verify
          </button>
        </div>

        {/* Si la verificación es correcta, mostramos el formulario para completar el registro */}
        {isVerified && <CompleteRegistration />}
      </div>
    </div>
  );
}
