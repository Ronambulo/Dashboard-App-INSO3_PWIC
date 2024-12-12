"use client";

import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import { fetchUserInfo } from "@/app/lib/userInfo";
import {
  fetchDeliveryNoteList,
  createDeliveryNote,
  deleteDeliveryNote,
} from "@/app/lib/deliverynotes";
import DeliveryNoteCard from "@/app/components/DeliveryNoteCard";
import CrearAlbaran from "@/app/components/CrearAlbaran";
import FormularioInfoAlbaran from "@/app/components/FormularioInfoAlbaran";

export default function AlbaranPage() {
  const [activeAcount, setActiveAcount] = useState(null);
  const [deliveryNoteList, setDeliveryNoteList] = useState([]);
  const [selectedDeliveryNoteKey, setSelectedDeliveryNoteKey] = useState(null);
  const [showCreateDeliveryNote, setShowCreateDeliveryNote] = useState(false);

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await fetchUserInfo();
      setActiveAcount(userInfo);
    }
    getUserInfo();
  }, []);

  async function getDeliveryNotes() {
    try {
      const deliveryNotes = await fetchDeliveryNoteList();
      setDeliveryNoteList(deliveryNotes);
    } catch (error) {
      console.error("Failed to fetch delivery notes:", error);
    }
  }

  useEffect(() => {
    getDeliveryNotes();
  }, []);

  const handleDeliveryNoteClick = (key) => {
    setSelectedDeliveryNoteKey(key);
  };

  const handleCreateDeliveryNote = async (newDeliveryNote) => {
    try {
      await createDeliveryNote(newDeliveryNote);
      await getDeliveryNotes();
      setShowCreateDeliveryNote(false);
    } catch (error) {
      console.error("Failed to create delivery note:", error);
    }
  };

  const handleCloseCreateDeliveryNote = () => {
    setShowCreateDeliveryNote(false);
  };

  const handleDeliveryNoteDelete = async (deliveryNoteId) => {
    try {
      await deleteDeliveryNote(deliveryNoteId);
      await getDeliveryNotes();
    } catch (error) {
      console.error("Failed to delete delivery note:", error);
    }
  };

  return (
    <div className="flex flex-col" style={{ width: "-webkit-fill-available" }}>
      <Header
        title="Albaranes"
        description="Todos tus albaranes en un solo lugar"
        activeAcount={activeAcount}
      />
      <div className="flex flex-row h-full">
        <div className="flex flex-col p-3 w-[395px] h-full gap-1 bg-secundary-bg flex-shrink-0">
          <div className="flex flex-col gap-1 scrollbar-custom overflow-y-scroll h-[742px] pr-2">
            {deliveryNoteList.length === 0 ? (
              <p className="text-center text-xl font-semibold">
                No hay albaranes disponibles
              </p>
            ) : (
              deliveryNoteList.map((deliveryNote) => (
                <div
                  key={deliveryNote._id}
                  className={`${
                    deliveryNote._id === selectedDeliveryNoteKey
                      ? "border-accent border-2 rounded-lg transition-colors duration-300 w-min"
                      : "border-secundary-bg border-2 rounded-lg transition-colors duration-300 w-min"
                  }`}
                >
                  <DeliveryNoteCard
                    deliveryNote={deliveryNote}
                    handleClick={() =>
                      handleDeliveryNoteClick(deliveryNote._id)
                    }
                  />
                </div>
              ))
            )}
          </div>
          <div className="mt-auto flex justify-center">
            <div
              className="flex items-center gap-4 px-6 py-3 mx-5 bg-zinc-800 shadow-md rounded-lg hover:shadow-lg transition-shadow w-80 cursor-pointer hover:bg-zinc-700 border-secundary-bg border-2"
              onClick={() => setShowCreateDeliveryNote(!showCreateDeliveryNote)}
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white text-2xl font-bold font-mono leading-none">
                +
              </div>
              <div>
                <p className="text-xl font-semibold text-primary-text">
                  Crear Albarán
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex flex-col">
          <div
            className="flex flex-col bg-zinc-800 mx-10 mt-10 rounded-lg shadow-md scrollbar-custom h-[775px] overflow-y-scroll"
            style={{ width: "-webkit-fill-available" }}
          >
            {selectedDeliveryNoteKey ? (
              <FormularioInfoAlbaran
                key={selectedDeliveryNoteKey}
                albaran={deliveryNoteList.find(
                  (deliveryNote) => deliveryNote._id === selectedDeliveryNoteKey
                )}
                onDelete={handleDeliveryNoteDelete}
              />
            ) : (
              <div className="flex flex-col gap-6 items-center justify-center h-full">
                <p className="text-xl font-semibold pb-6">
                  Selecciona un albarán para ver los detalles
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {showCreateDeliveryNote && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
            <CrearAlbaran
              onSubmit={handleCreateDeliveryNote}
              onClose={handleCloseCreateDeliveryNote}
            />
          </div>
        </div>
      )}
    </div>
  );
}
