"use client";

import React, { useState } from "react";

const FormularioInfoCliente = ({ cliente, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(cliente);
  const [changedFields, setChangedFields] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length > 1) {
      setFormData((prevData) => {
        let updatedData = { ...prevData };
        let temp = updatedData;
        for (let i = 0; i < keys.length - 1; i++) {
          temp = temp[keys[i]];
        }
        temp[keys[keys.length - 1]] = value;
        return updatedData;
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setChangedFields((prevFields) => ({
      ...prevFields,
      [name]: value !== cliente[name],
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
      "¿Estás seguro de que quieres borrar este cliente?"
    );
    if (confirmed) {
      await onDelete(cliente._id);
    }
  };

  const renderLabel = (label, fieldName) => (
    <label className="block text-gray-300 font-bold mb-2">
      {label}
      {changedFields[fieldName] && <span className="text-red-500">*</span>}
    </label>
  );

  return (
    <div className="w-full mx-auto rounded-lg p-6 relative text-white">
      <h1 className="text-3xl font-bold mb-6 text-left">
        Información del Cliente
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
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
              isEditing
                ? "bg-neutral-700 border-neutral-600"
                : "bg-neutral-800 border-neutral-700 text-gray-300"
            }`}
          />
        </div>
        <div>
          {renderLabel("CIF:", "cif")}
          <input
            type="text"
            name="cif"
            value={formData.cif}
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

export default FormularioInfoCliente;
