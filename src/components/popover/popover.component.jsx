import React from "react";

function Popover({ children, y = "4" }) {
  return (
    <span
      className={`absolute z-[100]
            -top-full left-1/2 -translate-x-1/2 -translate-y-${y}
            block text-xs text-white
            font-medium rounded bg-gray-700
            w-max px-3 py-2 
            invisible opacity-0 group-hover/button:opacity-100 group-hover/button:visible
            after:content-[''] after:absolute after:border-solid after:border-transparent after:border-t-gray-700 after:top-full after:border-t-4 after:border-x-4
            after:-translate-x-1/2 after:left-1/2`}
    >
      {children}
    </span>
  );
}

export default Popover;
