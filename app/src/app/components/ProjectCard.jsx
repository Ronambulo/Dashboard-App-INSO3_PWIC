"use client";

import React from "react";
import PropTypes from "prop-types";

const ProjectCard = ({ project, handleClick }) => {
  return (
    <div
      className="flex items-center gap-4 px-6 py-3 bg-zinc-800 shadow-md rounded-lg hover:shadow-lg transition-shadow w-[350px] cursor-pointer"
      onClick={handleClick}
    >
      <div>
        <p className="text-lg text-primary-text font-semibold whitespace-nowrap overflow-hidden text-ellipsis min-w-0 max-w-full w-fit">
          {project.name}
        </p>
        <p className="text-sm text-primary-text">
          Active tasks:{" "}
          <span className="text-secundary-text">{project.activeTasks}</span>
        </p>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ProjectCard;
