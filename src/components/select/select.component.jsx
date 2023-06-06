export const Select = ({ children, left = "1/2", x = "1/2", y }) => {
  return (
    <div
      className={`absolute py-4 top-full left-${left} -translate-x-${x} z-[100] ${y}`}
    >
      {children}
    </div>
  );
};

export const SelectContent = ({ children }) => {
  return (
    <div className="min-w-[192px] p-2 bg-white border border-gray-200 rounded shadow-xl shadow-gray-300">
      {children}
    </div>
  );
};

export const SelectLabel = ({ children, label, For, icon }) => {
  return (
    <label htmlFor={For} className="block relative w-full">
      {children}
      <span className="peer-hover:bg-slate-200 relative w-full block text-left text-sm p-2 rounded-sm flex items-center justify-start">
        {icon}
        {label}
      </span>
    </label>
  );
};

export const SelectItem = (props) => {
  return (
    <input
      {...props}
      className="peer absolute z-[1] cursor-pointer inset-0 opacity-0"
    />
  );
};

export const SelectSeperator = ({ children }) => {
  return <div className="border-t pt-2 border-gray-200">{children}</div>;
};
