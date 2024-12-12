"use server";

import { cookies } from "next/headers";

/**
 * Obtiene una cookie por nombre.
 * @param {string} name - Nombre de la cookie.
 * @returns {Promise<string|null>} Valor de la cookie o null si no existe.
 */
export async function getCookie(name) {
  if (!name || typeof name !== "string") {
    throw new Error("El nombre de la cookie debe ser un string válido.");
  }
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(name);
    return cookie;
  } catch (error) {
    console.error("Error al obtener la cookie:", error);
    return null;
  }
}

/**
 * Establece una cookie en el cliente.
 * @param {string} name - Nombre de la cookie.
 * @param {string} value - Valor de la cookie.
 * @param {Object} options - Opciones para la cookie.
 * @returns {Promise<void>}
 */
export async function setCookie(name, value) {
  if (!name || typeof name !== "string") {
    throw new Error("El nombre de la cookie debe ser un string válido.");
  }
  const cookieOptions = {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 60 * 60 * 24 * 365 * 10, // 10 años
  };
  try {
    cookies().set(name, value, cookieOptions);
  } catch (error) {
    console.error("Error al establecer la cookie:", error);
    throw error;
  }
}

/**
 * Borra una cookie por nombre.
 * @param {string} name - Nombre de la cookie.
 * @param {Object} options - Opciones para la cookie.
 * @returns {Promise<void>}
 */
export async function deleteCookie(name, options = {}) {
  if (!name || typeof name !== "string") {
    throw new Error("El nombre de la cookie debe ser un string válido.");
  }
  const cookieOptions = {
    path: "/",
    ...options,
    maxAge: 0,
  };
  try {
    cookies().set(name, "", cookieOptions); // Asegurarse de await aquí también
  } catch (error) {
    console.error("Error al borrar la cookie:", error);
    throw error;
  }
}

/**
 * Comprueba si existe un token de sesión.
 * @returns {Promise<boolean>} True si existe el token de sesión, false en caso contrario.
 */
export async function hasSessionToken() {
  try {
    const token = await getCookie("token");
    return token !== null;
  } catch (error) {
    console.error("Error al comprobar el token de sesión:", error);
    return false;
  }
}
