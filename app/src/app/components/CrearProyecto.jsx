"use client";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchClientList } from "@/app/lib/clients"; // Importa la función para obtener la lista de clientes

const CrearProyecto = ({ onSubmit, onClose }) => {
  const [project, setProject] = useState({
    name: "",
    projectCode: "",
    email: "",
    address: {
      street: "",
      number: "",
      postal: "",
      city: "",
      province: "",
    },
    code: "",
    clientId: "",
  });

  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function loadClients() {
      try {
        const clientList = await fetchClientList();
        setClients(clientList);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      }
    }
    loadClients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setProject((prevProject) => ({
        ...prevProject,
        address: {
          ...prevProject.address,
          [addressField]: value,
        },
      }));
    } else {
      setProject((prevProject) => ({
        ...prevProject,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(project);
  };

  const renderLabel = (label) => (
    <label className="block text-gray-300 font-bold mb-2">{label}</label>
  );

  return (
    <div className="w-full max-w-4xl rounded-lg p-6 relative text-white">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-300 hover:text-white focus:outline-none text-2xl"
      >
        &times;
      </button>
      <h1 className="text-3xl font-bold mb-6 text-left">Crear Proyecto</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div className="md:col-span-1 lg:col-span-1">
          {renderLabel("Nombre del proyecto:")}
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          />
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          {renderLabel("Identificador de proyecto:")}
          <input
            type="text"
            name="projectCode"
            value={project.projectCode}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          />
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          {renderLabel("Email:")}
          <input
            type="email"
            name="email"
            value={project.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          />
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          {renderLabel("Calle:")}
          <input
            type="text"
            name="address.street"
            value={project.address.street}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          />
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          {renderLabel("Número:")}
          <input
            type="number"
            name="address.number"
            value={project.address.number}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          />
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          {renderLabel("Código Postal:")}
          <input
            type="number"
            name="address.postal"
            value={project.address.postal}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          />
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          {renderLabel("Ciudad:")}
          <input
            type="text"
            name="address.city"
            value={project.address.city}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          />
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          {renderLabel("Provincia:")}
          <input
            type="text"
            name="address.province"
            value={project.address.province}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          />
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          {renderLabel("Código interno del proyecto:")}
          <input
            type="text"
            name="code"
            value={project.code}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          />
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          {renderLabel("ID del cliente:")}
          <select
            name="clientId"
            value={project.clientId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          >
            <option value="">Selecciona un cliente</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-end mt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Crear Proyecto
          </button>
        </div>
      </form>
    </div>
  );
};

CrearProyecto.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CrearProyecto;
