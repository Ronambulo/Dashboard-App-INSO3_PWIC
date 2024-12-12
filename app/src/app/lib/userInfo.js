"use server";

import { cookies } from "next/headers";

export async function fetchUserInfo() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("token")?.value;

  const response = await fetch("https://bildy-rpmaya.koyeb.app/api/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookie}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }

  const userInfo = await response.json();
  return userInfo;
}
