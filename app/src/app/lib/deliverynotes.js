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

export async function fetchDeliveryNoteList() {
  const token = await getCookie();

  const response = await fetch(
    "https://bildy-rpmaya.koyeb.app/api/deliverynote",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch delivery note list");
  }

  const deliveryNoteList = await response.json();
  return deliveryNoteList;
}

export async function createDeliveryNote(deliveryNoteData) {
  const token = await getCookie();

  const response = await fetch(
    "https://bildy-rpmaya.koyeb.app/api/deliverynote",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deliveryNoteData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create delivery note");
  }

  const newDeliveryNote = await response.json();
  return newDeliveryNote;
}

export async function deleteDeliveryNote(id) {
  const token = await getCookie();

  const response = await fetch(
    `https://bildy-rpmaya.koyeb.app/api/deliverynote/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete delivery note");
  }

  return { message: "Delivery note deleted successfully" };
}

export async function fetchDeliveryNotePDF(id) {
  const token = await getCookie();

  const response = await fetch(
    `https://bildy-rpmaya.koyeb.app/api/deliverynote/pdf/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch delivery note PDF");
  }

  const pdfBlob = await response.blob();
  return pdfBlob;
}
