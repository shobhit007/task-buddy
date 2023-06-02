import React, { useState } from "react";

function FilterCardRow({ children, label, icon, buttonlabel }) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="relative flex justify-start items-center py-2">
      <span className="text-sm font-medium mr-3">{label}</span>
      <button
        className="relative flex items-center justify-between border border-gray-400 py-0.5 px-3 w-[200px] rounded text-gray-700"
        onClick={() => setShowOptions((p) => !p)}
      >
        {icon}
        {buttonlabel}
      </button>
      {showOptions && children}
    </div>
  );
}

export default FilterCardRow;
