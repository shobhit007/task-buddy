function Button({ children, style, ...otherProps }) {
  return (
    <button
      {...otherProps}
      style={{ ...style }}
      className="w-full py-4 bg-blue-500 text-white text-lg font-semibold tracking-wide rounded hover:bg-blue-600 transition-colors duration-200"
    >
      {children}
    </button>
  );
}

export default Button;
