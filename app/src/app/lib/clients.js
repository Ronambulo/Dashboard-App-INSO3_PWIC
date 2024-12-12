"use server";

import { cookies } from "next/headers";

let cookie;

async function getCookie() {
  if (!cookie) {
    const cookieStore = await cookies();
    cookie = cookieStore.get("token")?.value;
  }
  return cookie;
}

export async function fetchClientList() {
  const token = await getCookie();

  const response = await fetch("https://bildy-rpmaya.koyeb.app/api/client", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch client list");
  }

  const clientList = await response.json();
  //console.log(clientList); // Agrega este console.log para ver la lista de clientes
  return clientList;
}

export async function createClient(clientData) {
  const token = await getCookie();

  const response = await fetch("https://bildy-rpmaya.koyeb.app/api/client", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clientData),
  });

  if (!response.ok) {
    throw new Error("Failed to create client");
  }

  const newClient = await response.json();
  return newClient;
}

export async function updateClient(id, clientData) {
  const token = await getCookie();

  const response = await fetch(
    `https://bildy-rpmaya.koyeb.app/api/client/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update client");
  }

  const updatedClient = await response.json();
  return updatedClient;
}

export async function deleteClient(id) {
  const token = await getCookie();

  const response = await fetch(
    `https://bildy-rpmaya.koyeb.app/api/client/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete client");
  }

  return { message: "Client deleted successfully" };
}
export async function fetchClientProjects(clientId) {
  const token = await getCookie();

  const response = await fetch(
    `https://bildy-rpmaya.koyeb.app/api/project/${clientId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch client projects");
  }

  const projects = await response.json();
  return projects;
}
