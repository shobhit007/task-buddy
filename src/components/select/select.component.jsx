import React, { createContext, forwardRef, useContext, useState } from "react";
import {
  useFloating,
  useClick,
  useInteractions,
  useMergeRefs,
  offset,
  autoUpdate,
} from "@floating-ui/react";
import Portal from "../portal/portal.component";
import { Overlay, OverlayHandler } from "../overlay/overlay.component";

const SelectContext = createContext();

const useSelectContext = () => useContext(SelectContext);

export const Select = ({ children, placement = "bottom", offsetY = 14 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(offsetY)],
    whileElementsMounted: autoUpdate,
    placement,
  });

  const click = useClick(context);

  const interactions = useInteractions([click]);

  const options = { refs, floatingStyles, ...interactions, isOpen, setIsOpen };

  return (
    <SelectContext.Provider value={options}>{children}</SelectContext.Provider>
  );
};

export const SelectTrigger = forwardRef(({ children, ...props }, parentRef) => {
  const { refs, getReferenceProps } = useSelectContext();

  const ref = useMergeRefs([refs.setReference, children.ref, parentRef]);

  return React.cloneElement(
    children,
    getReferenceProps({ ref, ...children.props, ...props })
  );
});

export const SelectContent = ({ renderItem = () => {} }) => {
  const { refs, getFloatingProps, floatingStyles, isOpen, setIsOpen } =
    useSelectContext();
  const ref = refs.setFloating;

  const onClose = () => setIsOpen(false);

  return (
    <Portal>
      <Overlay open={isOpen}>
        <OverlayHandler onClose={onClose}></OverlayHandler>
        <div
          ref={ref}
          {...getFloatingProps()}
          style={floatingStyles}
          className="absolute z-[1000] min-w-[192px] rounded overflow-hidden bg-white shadow-md border border-gray-100"
        >
          {renderItem(onClose)}
        </div>
      </Overlay>
    </Portal>
  );
};
