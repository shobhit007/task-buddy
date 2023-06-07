import ReactDOM from "react-dom";

function Portal({ children }) {
  return ReactDOM.createPortal(
    children,
    document.getElementById("react-portal")
  );
}

export default Portal;
