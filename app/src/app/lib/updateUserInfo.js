"use server";

import { getCookie } from "@/app/lib/cookiesMiddleware"; // Asegúrate de que la ruta sea correcta

export default async function updateUserInfo(userData) {
  try {
    const token = await getCookie("token"); // Obtener el token desde las cookies
    const email = await getCookie("email"); // Obtener el email desde las cookies

    if (!token) {
      throw new Error("Token is missing.");
    }

    if (!email) {
      throw new Error("Email is missing.");
    }

    // Agregar el email al userData
    userData.email = email;

    // Ordenar el userData
    const orderedUserData = {
      email: userData.email,
      name: userData.name,
      surnames: userData.surnames,
      nif: userData.nif,
    };

    const response = await fetch(
      "https://bildy-rpmaya.koyeb.app/api/user/register",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderedUserData),
      }
    );

    if (!response.ok) {
      console.log(JSON.stringify(orderedUserData));
      const contentType = response.headers.get("content-type");
      let errorData;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        errorData = await response.json();
      } else {
        errorData = await response.text();
      }
      console.error("Error response data:", errorData);
      if (errorData === "USER_NOT_VALIDATED") {
        throw new Error("User is not validated. Please validate your account.");
      } else {
        throw new Error("Failed to update user information");
      }
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error in updateUserInfo:", error);
    throw new Error(error.message || "An unexpected error occurred");
  }
}
