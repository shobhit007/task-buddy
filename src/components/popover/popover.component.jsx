import React, { createContext, useContext, useMemo, useState } from "react";

import {
  autoUpdate,
  offset,
  useFloating,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";

import Portal from "../portal/portal.component";

export const useTooltip = ({ isOpen, setIsOpen }) => {
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    middleware: [offset(10)],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context);
  const role = useRole(context, { role: "tooltip" });

  const interactions = useInteractions([hover, role]);

  return useMemo(
    () => ({
      refs,
      floatingStyles,
      ...interactions,
      isOpen,
      setIsOpen,
    }),
    [refs, floatingStyles, interactions, isOpen, setIsOpen]
  );
};

export const TooltipContext = createContext();

export const useTooltipContext = () => useContext(TooltipContext);

export const Tooltip = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = useTooltip({ isOpen, setIsOpen });
  return (
    <TooltipContext.Provider value={options}>
      {children}
    </TooltipContext.Provider>
  );
};

export const TooltipTrigger = ({ children, ...props }) => {
  const context = useTooltipContext();
  const hoverRef = context.refs.setReference;
  const ref = useMergeRefs([hoverRef, props.ref]);

  return React.cloneElement(children, context.getReferenceProps({ ref }));
};

export const TooltipContent = ({ children }) => {
  const {
    refs: { setFloating },
    floatingStyles,
    isOpen,
    getFloatingProps,
  } = useTooltipContext();

  if (!isOpen) return null;

  return (
    <Portal>
      <span
        className="relative
            block w-max text-xs font-medium text-white
            bg-gray-600 rounded p-2 min-w-[94px] text-center
            after:absolute after:left-1/2 after:-translate-x-1/2 after:top-full
            after:border-0 after:border-transparent after:border-t-4 after:border-x-4 after:border-b-0
            after:border-t-gray-600
            "
        ref={setFloating}
        style={floatingStyles}
        {...getFloatingProps}
      >
        {children}
      </span>
    </Portal>
  );
};
