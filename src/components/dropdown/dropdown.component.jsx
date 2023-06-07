import React from "react";

export const DropDown = ({ children, ...otherProps }) => {
  console.log(otherProps);
  return <div {...otherProps}>{children}</div>;
};

export const DropDownContent = ({ children }) => {
  return (
    <div className="relative min-w-[192px] py-3 px-2 bg-white rounded shadow-md border border border-gray-300">
      {children}
    </div>
  );
};

export const DropDownItem = ({ children }) => {
  return <div className="flex items-center justify-start">{children}</div>;
};

export const DropDownFooter = ({ children }) => {
  return (
    <div className="py-[3px] mt-2 border-t border-gray-200">{children}</div>
  );
};
