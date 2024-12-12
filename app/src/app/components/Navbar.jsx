"use client";

import Image from "next/image";
import ClientSVG from "@/../public/user.svg";
import ProjectSVG from "@/../public/pie-chart.svg";
import AlbaranSVG from "@/../public/albaran.svg";
import LogoSVG from "@/../public/Logo.svg";
import { useState } from "react";

export default function NavBar({}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`${
        isCollapsed ? "w-28" : "w-60"
      } bg-terciary-bg h-screen p-5 relative transition-all duration-300`}
    >
      {/* Botón para expandir/colapsar */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-[68px] -right-3 font-extrabold font-mono bg-gray-700 text-primary-text rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-gray-600 z-10"
      >
        {isCollapsed ? ">" : "<"}
      </button>

      {/* Contenido de la navbar */}
      <div className="flex flex-col space-y-10">
        {/* Logo */}
        <a href="/">
          <div className={`flex items-center space-x-3`}>
            <Image src={LogoSVG} alt="Client" width={64} height={64} />
            <span
              className={`text-primary-text text-4xl font-bold whitespace-nowrap transition-all duration-300 ${
                isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
              }`}
            >
              Bildy
            </span>
          </div>
        </a>

        {/* Opciones del menú */}
        <nav
          className={`flex flex-col ${
            isCollapsed ? "items-center" : ""
          } space-y-5 font-medium`}
        >
          {/* Opción 1 */}
          <a href="/dashboard/clients">
            <div
              className={`flex items-center space-x-3 cursor-pointer hover:bg-white/5 p-3 rounded-xl ${
                isCollapsed ? "bg-white/10 rounded-3xl" : ""
              }`}
            >
              <Image src={ClientSVG} alt="Client" width={32} height={32} />
              <span
                className={`text-primary-text whitespace-nowrap transition-all duration-300 ${
                  isCollapsed ? "hidden" : "opacity-100 w-auto"
                }`}
              >
                Clientes
              </span>
            </div>
          </a>
          {/* Opción 2 */}
          <a href="/dashboard/proyects">
            <div
              className={`flex items-center space-x-3 cursor-pointer hover:bg-white/5 p-3 rounded-xl ${
                isCollapsed ? "" : ""
              }`}
            >
              <Image src={ProjectSVG} alt="Proyect" width={32} height={32} />
              <span
                className={`text-secundary-text whitespace-nowrap transition-all duration-300 ${
                  isCollapsed ? "hidden" : "opacity-100 w-auto"
                }`}
              >
                Proyectos
              </span>
            </div>
          </a>
          {/* Opción 3 */}
          <a href="/dashboard/albaran">
            <div
              className={`flex items-center space-x-3 cursor-pointer hover:bg-white/5 p-3 rounded-xl ${
                isCollapsed ? "" : ""
              }`}
            >
              <Image src={AlbaranSVG} alt="Albaran" width={32} height={32} />
              <span
                className={`text-secundary-text whitespace-nowrap transition-all duration-300 ${
                  isCollapsed ? "hidden" : "opacity-100 w-auto"
                }`}
              >
                Albaranes
              </span>
            </div>
          </a>
        </nav>
      </div>
    </div>
  );
}
