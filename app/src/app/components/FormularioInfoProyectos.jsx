"use client";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchClientList } from "@/app/lib/clients";

const FormularioInfoProyecto = ({ proyecto, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ...proyecto,
    address: {
      street: "",
      number: "",
      postal: "",
      city: "",
      province: "",
      ...(proyecto.address || {}),
    },
  });
  const [changedFields, setChangedFields] = useState({});
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
    const keys = name.split(".");
    setFormData((prevData) => {
      let updatedData = { ...prevData };
      let temp = updatedData;
      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = value;
      return updatedData;
    });
    setChangedFields((prevFields) => ({
      ...prevFields,
      [name]: value !== proyecto[keys[0]]?.[keys[1]] ?? proyecto[name],
    }));
  };

  const handleEditClick = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await onUpdate(formData);
    }
    setIsEditing(!isEditing);
    if (!isEditing) {
      setChangedFields({});
    }
  };

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "¿Estás seguro de que quieres borrar este proyecto?"
    );
    if (confirmed) {
      await onDelete(proyecto._id);
    }
  };

  const renderLabel = (label, fieldName) => (
    <label className="block text-gray-300 font-bold mb-2">
      {label}
      {changedFields[fieldName] && <span className="text-red-500">*</span>}
    </label>
  );

  return (
    <div className="w-full h-full mx-auto rounded-lg p-6 relative text-white">
      <h1 className="text-3xl font-bold mb-6 text-left">
        Información del Proyecto
      </h1>
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          {renderLabel("Nombre:", "name")}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 pr-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              isEditing
                ? "bg-neutral-700 border-neutral-600"
                : "bg-neutral-800 border-neutral-700 text-gray-300"
            }`}
          />
        </div>
        <div>
          {renderLabel("Código:", "code")}
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              isEditing
                ? "bg-neutral-700 border-neutral-600"
                : "bg-neutral-800 border-neutral-700 text-gray-300"
            }`}
          />
        </div>
        <div>
          {renderLabel("Código de Proyecto:", "projectCode")}
          <input
            type="text"
            name="projectCode"
            value={formData.projectCode}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              isEditing
                ? "bg-neutral-700 border-neutral-600"
                : "bg-neutral-800 border-neutral-700 text-gray-300"
            }`}
          />
        </div>
        <div>
          {renderLabel("Email:", "email")}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              isEditing
                ? "bg-neutral-700 border-neutral-600"
                : "bg-neutral-800 border-neutral-700 text-gray-300"
            }`}
          />
        </div>
        <div>
          {renderLabel("ID del Cliente:", "clientId")}
          <select
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              isEditing
                ? "bg-neutral-700 border-neutral-600"
                : "bg-neutral-800 border-neutral-700 text-gray-300"
            }`}
          >
            <option value="">Selecciona un cliente</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          {renderLabel("Calle:", "address.street")}
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              isEditing
                ? "bg-neutral-700 border-neutral-600"
                : "bg-neutral-800 border-neutral-700 text-gray-300"
            }`}
          />
        </div>
        <div>
          {renderLabel("Número:", "address.number")}
          <input
            type="number"
            name="address.number"
            value={formData.address.number}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              isEditing
                ? "bg-neutral-700 border-neutral-600"
                : "bg-neutral-800 border-neutral-700 text-gray-300"
            }`}
          />
        </div>
        <div>
          {renderLabel("Código Postal:", "address.postal")}
          <input
            type="number"
            name="address.postal"
            value={formData.address.postal}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              isEditing
                ? "bg-neutral-700 border-neutral-600"
                : "bg-neutral-800 border-neutral-700 text-gray-300"
            }`}
          />
        </div>
        <div>
          {renderLabel("Ciudad:", "address.city")}
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              isEditing
                ? "bg-neutral-700 border-neutral-600"
                : "bg-neutral-800 border-neutral-700 text-gray-300"
            }`}
          />
        </div>
        <div>
          {renderLabel("Provincia:", "address.province")}
          <input
            type="text"
            name="address.province"
            value={formData.address.province}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              isEditing
                ? "bg-neutral-700 border-neutral-600"
                : "bg-neutral-800 border-neutral-700 text-gray-300"
            }`}
          />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          {renderLabel("Notas:", "notes")}
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              isEditing
                ? "bg-neutral-700 border-neutral-600"
                : "bg-neutral-800 border-neutral-700 text-gray-300"
            }`}
          />
        </div>
      </form>
      <div className="absolute bottom-4 right-4 flex space-x-4">
        <button
          type="button"
          onClick={handleEditClick}
          className="px-6 py-3 bg-accent hover:bg-accent/80 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
        >
          {isEditing ? "Confirmar" : "Editar"}
        </button>
        <button
          type="button"
          onClick={handleDeleteClick}
          className="px-6 py-3 bg-red-600 hover:bg-red-600/80 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
        >
          Borrar
        </button>
      </div>
    </div>
  );
};

FormularioInfoProyecto.propTypes = {
  proyecto: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FormularioInfoProyecto;
