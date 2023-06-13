// import "./spinner.style.css";

function Spinner() {
  return (
    <div className="fixed inset-0">
      <div className="h-screen flex items-center justify-center">
        <span className="w-12 h-12 border-4 border-[rgba(255, 255, 255, 0.8)] rounded-[50%] border-t-[#abb1b1] animate-spin"></span>
      </div>
    </div>
  );
}

export default Spinner;
