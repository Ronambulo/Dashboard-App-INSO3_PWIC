"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import searchSVG from "@/../public/search.svg";
import bellSVG from "@/../public/bell.svg";
import userSVG from "@/../public/user-avatar.svg";
import "../styles/inputIcon.css";
import { deleteCookie } from "@/app/lib/cookiesMiddleware"; // Adjust the import path accordingly
import React, { useState, useEffect } from "react";
import { fetchClientList } from "@/app/lib/clients";
import { fetchProjectList } from "@/app/lib/projects";

export default function Header({ title, description, activeAcount }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadSuggestions() {
      let clients = [];
      let projects = [];
      if (searchTerm.startsWith("/cliente") || searchTerm === "") {
        clients = await fetchClientList();
      }
      if (searchTerm.startsWith("/proyecto") || searchTerm === "") {
        projects = await fetchProjectList();
      }

      const filteredClients = clients
        .filter((client) =>
          client.name
            .toLowerCase()
            .includes(searchTerm.replace("/cliente", "").trim().toLowerCase())
        )
        .map((client) => ({
          id: client._id,
          name: client.name,
          type: "cliente",
        }));

      const filteredProjects = projects
        .filter((project) =>
          project.name
            .toLowerCase()
            .includes(searchTerm.replace("/proyecto", "").trim().toLowerCase())
        )
        .map((project) => ({
          id: project._id,
          name: project.name,
          type: "proyecto",
        }));

      setSuggestions([...filteredClients, ...filteredProjects].slice(0, 5));
    }
    loadSuggestions();
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === "cliente") {
      router.push(`/dashboard/clients?selectedClient=${suggestion.id}`);
    } else if (suggestion.type === "proyecto") {
      router.push(`/dashboard/proyects?selectedProject=${suggestion.id}`);
    }
  };

  const handleLogout = () => {
    deleteCookie("token");
    deleteCookie("email");
    router.push("/");
  };

  const highlightMatch = (text, match) => {
    const parts = text.split(new RegExp(`(${match})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === match.toLowerCase() ? (
        <strong key={index}>{part}</strong>
      ) : (
        part
      )
    );
  };

  return (
    <div>
      <header className="bg-secundary-bg text-primary-text text-center px-14 h-24 flex flex-row justify-between items-center w-">
        <div className="flex flex-col gap-2 text-left">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-secundary-text">{description}</p>
        </div>
        <div className="relative">
          <form className="search-container">
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-zinc-800 text-primary-text rounded-md p-2 w-96 bg-no-repeat pl-9 focus:outline-none focus:ring-2 focus:ring-accent"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            />
            <Image src={searchSVG} alt="Buscar" className="search-icon" />
          </form>
          {isFocused && suggestions.length > 0 && (
            <ul className="absolute bg-zinc-800 text-primary-text rounded-md mt-1 w-96 max-h-60 overflow-y-auto z-10">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-2 cursor-pointer hover:bg-zinc-700 text-left"
                >
                  {highlightMatch(
                    `${
                      suggestion.type === "cliente" ? "/cliente " : "/proyecto "
                    }${suggestion.name}`,
                    searchTerm
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-row gap-10 items-center">
          <Image src={bellSVG} alt="Bell" />
          <button onClick={handleLogout} className="text-primary-text">
            Log Out
          </button>
          <div className="flex flex-row gap-2 items-center">
            <a className="cursor-pointer">
              <Image src={userSVG} alt="User" />
            </a>
            <div className="flex flex-col text-left">
              <p className="font-medium">
                {activeAcount?.name + " " + activeAcount?.surnames ||
                  "Nombre del usuario"}
              </p>
              <p className="text-sm text-secundary-text">
                {activeAcount?.email || "correo@ejemplo.com"}
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
