import React from "react";

import { useResolvedPath, useMatch, Link } from "react-router-dom";

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Link
      to={to}
      className={`block w-full rounded p-2 text-sm font-medium text-gray-600 ${
        isActive && "bg-slate-200"
      }`}
      {...props}
    >
      {children}
    </Link>
  );
}

export default CustomLink;
