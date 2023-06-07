export const Overlay = ({ children, open }) => {
  if (!open) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[1000]">{children}</div>
  );
};

export const OverlayHandler = ({ onClose }) => {
  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 w-full h-full z-[1000]"
      onClick={onClose}
    ></div>
  );
};
