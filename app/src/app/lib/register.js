"use server";

import { setCookie } from "@/app/lib/cookiesMiddleware";

export default async function register(email, password) {
  const url = "https://bildy-rpmaya.koyeb.app/api/user/register";
  const body = { email, password };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error("Failed to register user.");

    const data = await response.json();

    console.log("Registration successful:", data);
    // Guardar correo y token en cookies
    if (typeof setCookie === "function") {
      setCookie("email", email);
      setCookie("token", data.token);
    } else {
      console.error("setCookie is not a function");
    }

    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}
