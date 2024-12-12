import React from "react";

const ClientCard = ({ client, handleClick }) => {
  const placeholderLogo =
    "https://aguacatec.es/wp-content/uploads/2023/10/e5a978b8-6772-4c85-a50e-15581af7d483.png"; // Reemplaza con la URL de tu imagen placeholder

  return (
    <div
      className="flex items-center gap-4 px-6 py-3 bg-zinc-800 shadow-md rounded-lg hover:shadow-lg transition-shadow w-[350px] cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={client.logo || placeholderLogo}
        alt={`${client.name} logo`}
        className="h-12 w-12 rounded-full object-cover"
        onError={(e) => (e.target.src = placeholderLogo)}
      />
      <div>
        <p className="text-lg text-primary-text font-semibold whitespace-nowrap overflow-hidden text-ellipsis min-w-0 max-w-full w-fit">
          {client.name}
        </p>
        <p className="text-sm text-primary-text">
          Active projects:{" "}
          <span className="text-secundary-text">{client.activeProjects}</span>
        </p>
      </div>
    </div>
  );
};

export default ClientCard;
