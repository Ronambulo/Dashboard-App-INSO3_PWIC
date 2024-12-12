import React from "react";
import { useEffect } from "react";

const DeliveryNoteCard = ({ deliveryNote, handleClick }) => {
  useEffect(() => {
    console.log(deliveryNote);
  }, []);
  return (
    <div
      className="flex items-center gap-4 px-6 py-3 bg-zinc-800 shadow-md rounded-lg hover:shadow-lg transition-shadow w-[350px] cursor-pointer"
      onClick={handleClick}
    >
      <div>
        <p className="text-lg text-primary-text font-semibold whitespace-nowrap overflow-hidden text-ellipsis min-w-0 max-w-full w-fit">
          {deliveryNote._id}
        </p>
        <p className="text-sm text-primary-text">
          PCode:{" "}
          <span className="text-secundary-text">
            {deliveryNote.projectId?.projectCode}
          </span>
        </p>
        <p className="text-sm text-primary-text">
          WorkDate:{" "}
          <span className="text-secundary-text">
            {deliveryNote.workdate ? deliveryNote.workdate.split("T")[0] : ""}
          </span>
        </p>
      </div>
    </div>
  );
};

export default DeliveryNoteCard;
