"use server";
import { getCookie } from "@/app/lib/cookiesMiddleware"; // Asegúrate de que la ruta sea correcta

/**
 * Verifica el código de 6 dígitos enviado al correo del usuario.
 * @param {string} code - Código de 6 dígitos
 * @returns {Promise<Object>} Respuesta del servidor
 */
export default async function verifyCode(code) {
  const url = "https://bildy-rpmaya.koyeb.app/api/user/validation";
  const body = { code };

  try {
    const token = await getCookie("token"); // Obtener el token desde las cookies

    if (!token) {
      throw new Error("Token is missing.");
    }

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    switch (response.status) {
      case 200:
        return {
          status: 200,
          message: "Verification successful. Status field changed to 1.",
          data: data,
        };
      case 401:
        return {
          status: 401,
          message: "Unauthorized. Authentication token is missing or invalid.",
        };
      case 422:
        return {
          status: 422,
          message:
            "Validation error. The request body contains invalid fields.",
        };
      case 500:
        return {
          status: 500,
          message: "Internal server error.",
        };
      default:
        throw new Error("Unexpected response status: " + response.status);
    }
  } catch (error) {
    console.error("Verification error:", error);
    throw error;
  }
}
