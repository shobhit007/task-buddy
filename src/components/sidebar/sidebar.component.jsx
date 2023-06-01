import { Link } from "react-router-dom";

function Sidebar({ onOpenModal }) {
  return (
    <div className="w-full lg:w-1/4 bg-white relative border-r border-r-gray-300 border-solid">
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
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
            />
          </svg>

          <Link to="/tasks" className="block w-full">
            Tasks
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
