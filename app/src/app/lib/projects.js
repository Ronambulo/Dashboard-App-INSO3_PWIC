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

export async function fetchProjectList() {
  const token = await getCookie();

  const response = await fetch("https://bildy-rpmaya.koyeb.app/api/project", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch project list");
  }

  const projectList = await response.json();
  return projectList;
}

export async function createProject(projectData) {
  const token = await getCookie();

  const response = await fetch("https://bildy-rpmaya.koyeb.app/api/project", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error("Failed to create project");
  }

  const newProject = await response.json();
  return newProject;
}

export async function updateProject(id, projectData) {
  const token = await getCookie();

  const response = await fetch(
    `https://bildy-rpmaya.koyeb.app/api/project/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update project");
  }

  const updatedProject = await response.json();
  return updatedProject;
}

export async function deleteProject(id) {
  const token = await getCookie();

  const response = await fetch(
    `https://bildy-rpmaya.koyeb.app/api/project/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete project");
  }

  return { message: "Project deleted successfully" };
}
