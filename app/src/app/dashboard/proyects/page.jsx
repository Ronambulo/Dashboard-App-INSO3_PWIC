"use client";

import Header from "@/app/components/Header";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchUserInfo } from "@/app/lib/userInfo";
import {
  fetchProjectList,
  updateProject,
  createProject,
  deleteProject,
} from "@/app/lib/projects";
import ProjectCard from "@/app/components/ProjectCard";
import dibujoProyecto from "@/../public/proyectos-dibujo.svg";
import CrearProyecto from "@/app/components/CrearProyecto";
import FormularioInfoProyectos from "@/app/components/FormularioInfoProyectos";

export default function Home() {
  const [activeAcount, setActiveAcount] = useState(null);
  const [projectList, setProjectList] = useState([]);
  const searchParams = useSearchParams();
  const selectedProject = searchParams.get("selectedProject");
  const [selectedProjectKey, setSelectedProjectKey] = useState(null);
  const [showCreateProject, setShowCreateProject] = useState(false);

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await fetchUserInfo();
      setActiveAcount(userInfo);
    }
    getUserInfo();
  }, []);

  async function getProjects() {
    try {
      const projects = await fetchProjectList();
      setProjectList(projects);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  }

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    if (selectedProject && projectList.length > 0) {
      setSelectedProjectKey(selectedProject);
    }
  }, [selectedProject, projectList]);

  const handleProjectClick = (key) => {
    setSelectedProjectKey(key);
  };

  const handleProjectUpdate = async (updatedProject) => {
    const { name, description, projectCode, email, address, code, clientId } =
      updatedProject;
    const projectToUpdate = {
      name,
      description,
      projectCode,
      email,
      address,
      code,
      clientId,
    };
    try {
      await updateProject(updatedProject._id, projectToUpdate);
      console.log("Project updated successfully");
      await getProjects();
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const handleCreateProject = async (newProject) => {
    try {
      await createProject(newProject);
      await getProjects();
      setShowCreateProject(false);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  const handleCloseCreateProject = () => {
    setShowCreateProject(false);
  };

  const handleProjectDelete = async (projectId) => {
    try {
      await deleteProject(projectId);
      await getProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <div className="flex flex-col" style={{ width: "-webkit-fill-available" }}>
      <Header
        title="Proyectos"
        description="Todos tus proyectos en un solo lugar"
        activeAcount={activeAcount}
      />
      <div className="flex flex-row h-full">
        <div className="flex flex-col p-3 w-[395px] h-full gap-1 bg-secundary-bg flex-shrink-0">
          <div className="flex flex-col gap-1 scrollbar-custom overflow-y-scroll h-[742px] pr-2">
            {projectList.map((project) => (
              <div
                key={project._id}
                className={`${
                  project._id === selectedProjectKey
                    ? "border-accent border-2 rounded-lg transition-colors duration-300 w-min"
                    : "border-secundary-bg border-2 rounded-lg transition-colors duration-300 w-min"
                }`}
              >
                <ProjectCard
                  project={project}
                  handleClick={() => handleProjectClick(project._id)}
                />
              </div>
            ))}
          </div>
          <div className="mt-auto flex justify-center">
            <div
              className="flex items-center gap-4 px-6 py-3 mx-5 bg-zinc-800 shadow-md rounded-lg hover:shadow-lg transition-shadow w-80 cursor-pointer hover:bg-zinc-700 border-secundary-bg border-2"
              onClick={() => setShowCreateProject(!showCreateProject)}
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white text-2xl font-bold font-mono leading-none">
                +
              </div>
              <div>
                <p className="text-xl font-semibold text-primary-text">
                  Crear Proyecto
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex flex-col">
          <div
            className="flex flex-col bg-zinc-800 mx-10 mt-10 rounded-lg shadow-md scrollbar-custom h-[775px]"
            style={{ width: "-webkit-fill-available" }}
          >
            {selectedProjectKey ? (
              <FormularioInfoProyectos
                key={selectedProjectKey}
                proyecto={projectList.find(
                  (project) => project._id === selectedProjectKey
                )}
                onUpdate={handleProjectUpdate}
                onDelete={handleProjectDelete}
              />
            ) : (
              <div className="flex flex-col gap-6 items-center justify-center h-full">
                <Image
                  src={dibujoProyecto}
                  alt="Dibujo de un proyecto"
                  width={300}
                />
                <p className="text-xl font-semibold pb-6">
                  Selecciona un proyecto para ver los detalles
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {showCreateProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
            <CrearProyecto
              onSubmit={handleCreateProject}
              onClose={handleCloseCreateProject}
            />
          </div>
        </div>
      )}
    </div>
  );
}
