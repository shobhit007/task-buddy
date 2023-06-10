import React, { useState, forwardRef } from "react";
import {
  useFloating,
  useHover,
  useInteractions,
  useMergeRefs,
  offset,
  autoUpdate,
} from "@floating-ui/react";

const Tooltip = forwardRef(function (
  { children, content, offsetY, ...props },
  parentRef
) {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "top",
    middleware: [offset(offsetY || 10)],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context);

  const { getFloatingProps, getReferenceProps } = useInteractions([hover]);

  const ref = useMergeRefs([refs.setReference, parentRef]);

  return (
    <>
      {React.cloneElement(
        children,
        getReferenceProps({ ref, ...props, ...children.props })
      )}
      {open && (
        <span
          className="relative
            block w-max text-xs font-medium text-white
            bg-gray-600 rounded p-2 px-3 text-center
            after:absolute after:left-1/2 after:-translate-x-1/2 after:top-full
            after:border-0 after:border-transparent after:border-t-4 after:border-x-4 after:border-b-0
            after:border-t-gray-600
            "
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {content}
        </span>
      )}
    </>
  );
});

export default Tooltip;
