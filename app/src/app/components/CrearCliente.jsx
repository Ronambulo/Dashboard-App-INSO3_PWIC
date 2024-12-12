"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";

const CrearCliente = ({ onSubmit, onClose }) => {
  const [client, setClient] = useState({
    name: "",
    cif: "",
    address: {
      street: "",
      number: "",
      postal: "",
      city: "",
      province: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setClient((prevClient) => ({
        ...prevClient,
        address: {
          ...prevClient.address,
          [addressField]: value,
        },
      }));
    } else {
      setClient((prevClient) => ({
        ...prevClient,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(client);
  };

  const renderLabel = (label, fieldName) => (
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
      <h1 className="text-3xl font-bold mb-6 text-left">Crear Cliente</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div className="md:col-span-1 lg:col-span-1">
          {renderLabel("Nombre:", "name")}
          <input
            type="text"
            name="name"
            value={client.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          />
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          {renderLabel("CIF:", "cif")}
          <input
            type="text"
            name="cif"
            value={client.cif}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          />
        </div>
        <div className="md:col-span-2 lg:col-span-2">
          {renderLabel("Calle:", "address.street")}
          <input
            type="text"
            name="address.street"
            value={client.address.street}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          />
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          {renderLabel("Número:", "address.number")}
          <input
            type="number"
            name="address.number"
            value={client.address.number}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          />
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          {renderLabel("Código Postal:", "address.postal")}
          <input
            type="number"
            name="address.postal"
            value={client.address.postal}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          />
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          {renderLabel("Ciudad:", "address.city")}
          <input
            type="text"
            name="address.city"
            value={client.address.city}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          />
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          {renderLabel("Provincia:", "address.province")}
          <input
            type="text"
            name="address.province"
            value={client.address.province}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-end mt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Crear Cliente
          </button>
        </div>
      </form>
    </div>
  );
};

CrearCliente.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CrearCliente;
