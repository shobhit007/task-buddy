import { Link } from "react-router-dom";

function Sidebar({ onOpenModal }) {
  return (
    <div className="w-full lg:w-1/4 bg-white relative">
      <header className="py-4  border-b-2 border-gray-100 lg:border-none lg:h-20">
        <nav className="flex justify-between items-stretch px-4 lg:px-8 lg:block">
          <h2 className="text-lg font-semibold">TaskBuddy</h2>
          <button className="lg:hidden lg:invisible p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </nav>
      </header>
      <ul className="w-full list-none flex lg:flex-col lg:px-8 lg:pb-20 lg:pt-4 lg:sidebar lg:overflow-y-scroll no-scrollbar">
        <li className="flex-1 lg:flex-initial text-center lg:text-left py-2 lg:p-4 lg:flex lg:gap-3 lg:font-bold lg:hover:bg-gray-200 lg:rounded lg:transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 hidden invisible lg:block lg:visible"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <Link to="/" className="block w-full">
            Home
          </Link>
        </li>
        <li className="flex-1 lg:flex-initial text-center lg:text-left py-2 lg:p-4 lg:flex lg:gap-3 lg:font-bold lg:hover:bg-gray-200 lg:rounded lg:transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 hidden invisible lg:block lg:visible"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <Link to="/pending" className="block w-full">
            Pending
          </Link>
        </li>
        <li className="flex-1 lg:flex-initial text-center lg:text-left py-2 lg:p-4 lg:flex lg:gap-3 lg:font-bold lg:hover:bg-gray-200 lg:rounded lg:transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 hidden invisible lg:block lg:visible"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>

          <Link to="/completed" className="block w-full">
            Completed
          </Link>
        </li>
      </ul>
      <footer className="hidden invisible lg:block lg:visible pt-1 px-4 absolute bottom-0 w-full h-20">
        <button
          onClick={onOpenModal}
          className="hidden invisible lg:inline-flex lg:visible w-full text-white text-base bg-blue-500 gap-2 py-4 justify-center rounded-md transition-colors hover:bg-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Create task
        </button>
      </footer>
    </div>
  );
}

export default Sidebar;
