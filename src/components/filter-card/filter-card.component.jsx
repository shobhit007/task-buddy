import React, { useState } from "react";

function FilterCard() {
  const [showOptions, setShowOptions] = useState(false);
  const [showPriorities, setShowPriorities] = useState(false);
  const [status, setStatus] = useState("");
  const [priorities, setPriorities] = useState(new Set());

  const isSelected = (value) => value === status;

  const handlePriorities = (e) => {
    const { value } = e.target;
    const updatedPriorities = new Set(priorities);

    if (updatedPriorities.has(value)) {
      updatedPriorities.delete(value);
    } else {
      updatedPriorities.add(value);
    }

    setPriorities(updatedPriorities);
  };

  const isChecked = (value) => priorities.has(value);

  return (
    <div className="absolute top-full right-10 py-4 z-20">
      <div className="relative bg-white px-6 pb-8 w-full md:w-[512px] min-h-[140px] rounded-md shadow-lg">
        <div className="flex justify-end pt-2">
          <button className="w-8 h-8 hover:bg-slate-200">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
        <h2 className="text-xl text-gray-800 font-medium">Filters</h2>
        {/* Filter Row */}
        <div className="flex justify-start items-center py-3">
          <span className="text-sm font-medium mr-6">Status:</span>
          <button
            className="relative flex items-center justify-between border border-gray-400 py-0.5 px-2 w-[200px] rounded"
            onClick={() => setShowOptions((p) => !p)}
          >
            <span className="text-sm font-medium text-gray-800">
              {status ? status : "Select status"}
            </span>
            <span className="material-symbols-outlined text-lg">
              {showOptions ? "expand_less" : "expand_more"}
            </span>
            {/* options */}
            {showOptions && (
              <div className="absolute top-full left-0 w-full py-2 z-[10]">
                <div className="p-2 bg-gray-100 rounded shadow-xl shadow-gray-300">
                  <label htmlFor="pending" className="block relative w-full">
                    <input
                      id="pending"
                      type="radio"
                      name="status"
                      className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                      value="pending"
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                      Pending
                      {isSelected("pending") && (
                        <span className="material-symbols-outlined text-xl font-semibold text-blue-600">
                          check
                        </span>
                      )}
                    </span>
                  </label>
                  <label htmlFor="complete" className="block relative w-full">
                    <input
                      id="complete"
                      type="radio"
                      name="status"
                      className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                      value="complete"
                      onChange={(e) => setStatus(e.target.value)}
                    />
                    <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                      Complete
                      {isSelected("complete") && (
                        <span className="material-symbols-outlined text-xl font-semibold text-blue-600">
                          check
                        </span>
                      )}
                    </span>
                  </label>
                </div>
              </div>
            )}
          </button>
        </div>

        {/* Filter Row */}
        <div className="flex justify-start items-center py-2">
          <span className="text-sm font-medium mr-2">Priorities:</span>
          <button
            className="relative flex items-center justify-between border border-gray-400 py-2 px-3 w-[200px] rounded"
            onClick={() => setShowPriorities((p) => !p)}
          >
            <span className="text-sm font-medium text-gray-800">
              {"Select priorities"}
            </span>
            {/* options */}
            {showPriorities && (
              <div className="absolute top-full left-0 w-full py-3 z-[10]">
                <div className="p-2 bg-gray-100 rounded-md shadow-lg">
                  <label htmlFor="urgent" className="block relative w-full">
                    <input
                      id="urgent"
                      type="checkbox"
                      name="priority"
                      className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                      value="urgent"
                      onChange={handlePriorities}
                    />
                    <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                      Urgent
                      {isChecked("urgent") && (
                        <span className="material-symbols-outlined text-xl font-semibold text-blue-600">
                          check
                        </span>
                      )}
                    </span>
                  </label>
                  <label htmlFor="high" className="block relative w-full">
                    <input
                      id="high"
                      type="checkbox"
                      name="priority"
                      className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                      value="high"
                      onChange={handlePriorities}
                    />
                    <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                      High
                      {isChecked("high") && (
                        <span className="material-symbols-outlined text-xl font-semibold text-blue-600">
                          check
                        </span>
                      )}
                    </span>
                  </label>
                  <label htmlFor="normal" className="block relative w-full">
                    <input
                      id="normal"
                      type="checkbox"
                      name="priority"
                      className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                      value="normal"
                      onChange={handlePriorities}
                    />
                    <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                      Normal
                      {isChecked("normal") && (
                        <span className="material-symbols-outlined text-xl font-semibold text-blue-600">
                          check
                        </span>
                      )}
                    </span>
                  </label>
                  <label htmlFor="low" className="block relative w-full">
                    <input
                      id="low"
                      type="checkbox"
                      name="priority"
                      className="peer absolute inset-0 z-[2] opacity-0 cursor-pointer"
                      value="low"
                      onChange={handlePriorities}
                    />
                    <span className="peer-hover:bg-slate-200 relative z-[1] w-full block text-left text-sm font-medium p-2 rounded-sm flex items-center justify-between">
                      Low
                      {isChecked("low") && (
                        <span className="material-symbols-outlined text-xl font-semibold text-blue-600">
                          check
                        </span>
                      )}
                    </span>
                  </label>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterCard;
