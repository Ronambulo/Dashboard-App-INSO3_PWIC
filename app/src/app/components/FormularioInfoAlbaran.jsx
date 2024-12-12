"use client";

import React, { useEffect, useState } from "react";
import {
  fetchDeliveryNotePDF,
  deleteDeliveryNote,
} from "@/app/lib/deliverynotes";

const FormularioInfoAlbaran = ({ albaran, onDelete }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const pdfBlob = await fetchDeliveryNotePDF(albaran._id);
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
      } catch (error) {
        console.error("Failed to fetch delivery note PDF", error);
      }
    };

    fetchPDF();
  }, [albaran._id]);

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "¿Estás seguro de que quieres borrar este albarán?"
    );
    if (confirmed) {
      try {
        await deleteDeliveryNote(albaran._id);
        alert("Delivery note deleted successfully");
        if (onDelete) {
          onDelete(albaran._id);
        }
      } catch (error) {
        alert("Failed to delete delivery note");
      }
    }
  };

  return (
    <div className="w-full mx-auto rounded-lg p-6 relative text-white">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-left">
          Información del Albarán
        </h1>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleDeleteClick}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Delete
          </button>
          {pdfUrl && (
            <a
              href={pdfUrl}
              download={`albaran_${albaran._id}.pdf`}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Descargar PDF
            </a>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="mb-4">
          <span className="block text-gray-300 font-bold mb-2">Código:</span>
          <span className="block w-full px-4 py-2 border rounded-md bg-neutral-800 border-neutral-700 text-gray-300">
            {albaran._id}
          </span>
        </div>
        <div className="mb-4">
          <span className="block text-gray-300 font-bold mb-2">Fecha:</span>
          <span className="block w-full px-4 py-2 border rounded-md bg-neutral-800 border-neutral-700 text-gray-300">
            {albaran.workdate ? albaran.workdate.split("T")[0] : ""}
          </span>
        </div>
        <div className="mb-4">
          <span className="block text-gray-300 font-bold mb-2">Nombre:</span>
          <span className="block w-full px-4 py-2 border rounded-md bg-neutral-800 border-neutral-700 text-gray-300">
            {albaran.projectId?.name || ""}
          </span>
        </div>
        <div className="mb-4">
          <span className="block text-gray-300 font-bold mb-2">Email:</span>
          <span className="block w-full px-4 py-2 border rounded-md bg-neutral-800 border-neutral-700 text-gray-300">
            {albaran.projectId.email || ""}
          </span>
        </div>
        <div className="mb-4">
          <span className="block text-gray-300 font-bold mb-2">
            Código del Proyecto:
          </span>
          <span className="block w-full px-4 py-2 border rounded-md bg-neutral-800 border-neutral-700 text-gray-300">
            {albaran.projectId?.code || ""}
          </span>
        </div>
        <div className="flex items-center mb-4">
          <span className="block text-gray-300 font-bold mb-2">Pendiente:</span>
          <input
            type="checkbox"
            checked={albaran.pending}
            readOnly
            className="ml-2 h-5 w-5 text-gray-300 border-neutral-700 rounded bg-neutral-800"
          />
        </div>
      </div>
    </div>
  );
};

export default FormularioInfoAlbaran;
