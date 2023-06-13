import React from "react";

function FloatingButton(props) {
  return (
    <button
      {...props}
      className="fixed right-4 md:right-8 bottom-6 z-[100] flex items-center px-3 py-1 bg-blue-400 text-white text-xs font-medium rounded shadow-lg shadow-blue-300 hover:bg-blue-600"
    >
      <span className="material-symbols-outlined text-xl">add</span>
      Add
    </button>
  );
}

export default FloatingButton;
