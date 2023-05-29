function SearchBox() {
  return (
    <div className="max-w-md">
      <form className="w-full flex bg-gray-200 rounded-md">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-4 focus:outline-none border-none bg-transparent"
        />
        <button className="flex items-center justify-center bg-transparent hover:bg-gray-300 rounded-md  ml-2 px-3 py-2 transition-colors">
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default SearchBox;
