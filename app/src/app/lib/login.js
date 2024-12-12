"use server";

import { setCookie } from "@/app/lib/cookiesMiddleware";

export default async function login(email, password) {
  const url = "https://bildy-rpmaya.koyeb.app/api/user/login";
  const body = { email, password };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      switch (response.status) {
        case 401:
          throw new Error("User is not validated.");
        case 404:
          throw new Error("User not found.");
        case 422:
          throw new Error(
            "Validation error. The request body contains invalid fields."
          );
        case 500:
          throw new Error("Internal server error.");
        default:
          throw new Error("Failed to login user.");
      }
    }

    const data = await response.json();

    console.log("Login successful:", data);
    // Guardar correo y token en cookies
    if (typeof setCookie === "function") {
      setCookie("email", email);
      setCookie("token", data.token);
    } else {
      console.error("setCookie is not a function");
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    return { error: error.message };
  }
}
