"use client";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchClientList } from "@/app/lib/clients";
import { fetchProjectList } from "@/app/lib/projects";

const CrearAlbaran = ({ onSubmit, onClose }) => {
  const [deliveryNote, setDeliveryNote] = useState({
    clientId: "",
    projectId: "",
    format: "material",
    material: "",
    hours: 0,
    description: "",
    workdate: "",
  });

  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      const clientsData = await fetchClientList();
      setClients(clientsData);
    };

    const getProjects = async () => {
      const projectsData = await fetchProjectList();
      setProjects(projectsData);
    };

    getClients();
    getProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryNote((prevDeliveryNote) => ({
      ...prevDeliveryNote,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(deliveryNote);
  };

  return (
    <div className="w-full max-w-4xl rounded-lg p-6 relative text-white">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-300 hover:text-white focus:outline-none text-2xl"
      >
        &times;
      </button>
      <h1 className="text-3xl font-bold mb-6 text-left">Crear Albarán</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div className="md:col-span-1 lg:col-span-1">
          <label className="block text-gray-300 font-bold mb-2">
            Cliente ID:
          </label>
          <select
            name="clientId"
            value={deliveryNote.clientId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          >
            <option value="">Seleccione un cliente</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          <label className="block text-gray-300 font-bold mb-2">
            Proyecto ID:
          </label>
          <select
            name="projectId"
            value={deliveryNote.projectId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          >
            <option value="">Seleccione un proyecto</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name} ({project.projectCode})
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          <label className="block text-gray-300 font-bold mb-2">Formato:</label>
          <select
            name="format"
            value={deliveryNote.format}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          >
            <option value="material">Material</option>
            <option value="hours">Horas</option>
          </select>
        </div>
        {deliveryNote.format === "material" && (
          <div className="md:col-span-1 lg:col-span-1">
            <label className="block text-gray-300 font-bold mb-2">
              Material:
            </label>
            <input
              type="text"
              name="material"
              value={deliveryNote.material}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
              required
            />
          </div>
        )}
        {deliveryNote.format === "hours" && (
          <div className="md:col-span-1 lg:col-span-1">
            <label className="block text-gray-300 font-bold mb-2">Horas:</label>
            <input
              type="number"
              name="hours"
              value={deliveryNote.hours}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
              required
            />
          </div>
        )}
        <div className="md:col-span-1 lg:col-span-1">
          <label className="block text-gray-300 font-bold mb-2">
            Descripción:
          </label>
          <input
            type="text"
            name="description"
            value={deliveryNote.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 bg-neutral-700 border-neutral-600"
            required
          />
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          <label className="block text-gray-300 font-bold mb-2">
            Fecha de Trabajo:
          </label>
          <input
            type="date"
            name="workdate"
            value={deliveryNote.workdate}
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
            Crear Albarán
          </button>
        </div>
      </form>
    </div>
  );
};

CrearAlbaran.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CrearAlbaran;
