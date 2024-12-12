import React from "react";

const ClientProjectCard = ({ project }) => {
  return (
    <div className="client-project-card shadow-md rounded-md p-5 bg-zinc-900 text-white">
      <h3 className="text-2xl font-bold mb-3">
        {project.name}{" "}
        <span className="text-gray-300 mb-2 text-base">{project.code}</span>
      </h3>

      <p className="text-gray-100">
        <strong>Activo:</strong> {project.active ? "Sí" : "No"}
      </p>
    </div>
  );
};

const ClientProjects = ({ projects }) => {
  return (
    <div className="client-projects">
      {projects.map((project) => (
        <ClientProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};

export default ClientProjects;
