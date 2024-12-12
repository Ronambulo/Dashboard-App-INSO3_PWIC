"use client";

import Header from "@/app/components/Header";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchUserInfo } from "@/app/lib/userInfo";
import {
  fetchClientList,
  updateClient,
  createClient,
  deleteClient,
  fetchClientProjects,
} from "@/app/lib/clients"; // Import createClient
import ClientCard from "@/app/components/ClientCard";
import dibujoCliente from "@/../public/clientes-dibujo.svg";
import dibujoProyecto from "@/../public/proyectos-dibujo.svg";
import FormularioInfoCliente from "@/app/components/FormularioInfoCliente";
import CrearCliente from "@/app/components/CrearCliente";
import ClientProjects from "@/app/components/ClientProjects";

export default function Home() {
  const [activeAcount, setActiveAcount] = useState(null);
  const [clientList, setClientList] = useState([]);
  const searchParams = useSearchParams();
  const selectedClient = searchParams.get("selectedClient");
  const [selectedClientKey, setSelectedClientKey] = useState(null);
  const [showCreateClient, setShowCreateClient] = useState(false); // State to control the visibility of the create client form
  const [clientProjects, setClientProjects] = useState([]); // State to store client projects

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await fetchUserInfo();
      setActiveAcount(userInfo);
    }
    getUserInfo();
  }, []);

  useEffect(() => {
    async function getClients() {
      try {
        const clients = await fetchClientList();
        setClientList(clients);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      }
    }
    getClients();
  }, []);

  useEffect(() => {
    if (selectedClient && clientList.length > 0) {
      setSelectedClientKey(selectedClient);
      async function loadClientProjects() {
        try {
          const projects = await fetchClientProjects(selectedClient);
          setClientProjects(projects);
        } catch (error) {
          console.error("Failed to fetch client projects:", error);
        }
      }
      loadClientProjects();
    }
  }, [selectedClient, clientList]);

  const handleClientClick = async (key) => {
    setSelectedClientKey(key);
    try {
      const projects = await fetchClientProjects(key);
      setClientProjects(projects);
    } catch (error) {
      console.error("Failed to fetch client projects:", error);
    }
  };

  const handleClientUpdate = async (updatedClient) => {
    const { name, cif, address } = updatedClient;
    const clientToUpdate = { name, cif, address };
    await updateClient(updatedClient._id, clientToUpdate);
    console.log("Client updated successfully");
    await getClients();
  };

  const handleCreateClient = async (newClient) => {
    try {
      await createClient(newClient); // Call createClient with the new client data
      await getClients(); // Refresh the client list
      setShowCreateClient(false); // Close the pop-up after submit
    } catch (error) {
      console.error("Failed to create client:", error);
    }
  };

  const handleCloseCreateClient = () => {
    setShowCreateClient(false); // Close the pop-up
  };

  const handleClientDelete = async (clientId) => {
    try {
      await deleteClient(clientId); // Asegúrate de tener una función deleteClient definida en tu API
      await getClients(); // Refresca la lista de clientes después de eliminar
    } catch (error) {
      console.error("Failed to delete client:", error);
    }
  };

  return (
    <div className="flex flex-col" style={{ width: "-webkit-fill-available" }}>
      <Header
        title="Clientes"
        description="Todos tus clientes en un solo lugar"
        activeAcount={activeAcount}
      />
      <div className="flex flex-row h-full">
        <div className="flex flex-col p-3 w-[395px] h-full gap-1 bg-secundary-bg flex-shrink-0">
          <div className="flex flex-col gap-1 scrollbar-custom overflow-y-scroll h-[742px] pr-2">
            {clientList.length > 0 ? (
              clientList.map((client) => (
                <div
                  key={client._id}
                  className={`${
                    client._id === selectedClientKey
                      ? "border-accent border-2 rounded-lg transition-colors duration-300 w-min"
                      : "border-secundary-bg border-2 rounded-lg transition-colors duration-300 w-min"
                  }`}
                >
                  <ClientCard
                    client={client}
                    handleClick={() => handleClientClick(client._id)}
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-xl font-semibold">
                No hay clientes disponibles
              </p>
            )}
          </div>
          <div className="mt-auto flex justify-center">
            <div
              className="flex items-center gap-4 px-6 py-3 mx-5 bg-zinc-800 shadow-md rounded-lg hover:shadow-lg transition-shadow w-80 cursor-pointer hover:bg-zinc-700 border-secundary-bg border-2"
              onClick={() => setShowCreateClient(!showCreateClient)}
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white text-2xl font-bold font-mono leading-none">
                +
              </div>
              <div>
                <p className="text-xl font-semibold text-primary-text">
                  Crear Cliente
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex flex-col">
          <div
            className="flex flex-col bg-zinc-800 mx-10 mt-10 rounded-lg shadow-md scrollbar-custom h-[380px]"
            style={{ width: "-webkit-fill-available" }}
          >
            {selectedClientKey ? (
              <div>
                <FormularioInfoCliente
                  key={selectedClientKey}
                  cliente={clientList.find(
                    (client) => client._id === selectedClientKey
                  )}
                  onUpdate={handleClientUpdate}
                  onDelete={handleClientDelete}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-6 items-center justify-center h-full">
                <Image
                  src={dibujoCliente}
                  alt="Dibujo de un cliente"
                  width={300}
                />
                <p className="text-xl font-semibold pb-6">
                  Selecciona un cliente para ver los detalles
                </p>
              </div>
            )}
          </div>
          <div
            className="flex flex-col p-5 bg-zinc-800 mx-10 mt-5 rounded-lg shadow-md scrollbar-custom h-[380px]"
            style={{ width: "-webkit-fill-available" }}
          >
            {selectedClientKey ? (
              clientProjects.length > 0 ? (
                <ClientProjects projects={clientProjects} />
              ) : (
                <p className="text-center text-xl font-semibold">
                  No hay proyectos disponibles para este cliente
                </p>
              )
            ) : (
              <div className="flex flex-col gap-6 items-center justify-center">
                <Image
                  src={dibujoProyecto}
                  alt="Dibujo de un proyecto"
                  width={300}
                />
                <p className="text-xl font-semibold pb-6">
                  Selecciona un cliente para ver los proyectos
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {showCreateClient && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
            <CrearCliente
              onSubmit={handleCreateClient}
              onClose={handleCloseCreateClient}
            />
          </div>
        </div>
      )}
    </div>
  );
}
