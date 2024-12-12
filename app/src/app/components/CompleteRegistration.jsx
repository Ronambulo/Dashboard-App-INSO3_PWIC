"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Importamos useRouter para redirigir
import updateUserInfo from "@/app/lib/updateUserInfo"; // Esta función realiza la actualización del usuario

export default function CompleteRegistration() {
  const [name, setName] = useState("");
  const [surnames, setSurnames] = useState("");
  const [nif, setNif] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter(); // Inicializamos useRouter para redirigir al cliente

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        name,
        surnames,
        nif,
      };

      // Llamar a la función para actualizar la información del usuario
      await updateUserInfo(updatedData);

      // Redirigir a la página de clientes después de completar el registro
      router.push("/dashboard/clients");
    } catch (err) {
      setError("Error updating information. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white/10 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-white">
        Complete Your Registration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-3 text-lg text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Surnames"
            value={surnames}
            onChange={(e) => setSurnames(e.target.value)}
            className="w-full px-5 py-3 text-lg text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="NIF"
            value={nif}
            onChange={(e) => setNif(e.target.value)}
            className="w-full px-5 py-3 text-lg text-gray-900 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 text-lg text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Complete Registration
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
