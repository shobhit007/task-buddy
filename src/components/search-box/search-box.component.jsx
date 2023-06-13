function SearchBox({ search, onChange }) {
  return (
    <div className="w-full lg:max-w-sm px-2 rounded-3xl bg-gray-200 overflow-hidden">
      <input
        type="text"
        placeholder="Search by title"
        className="w-full px-3 py-2 text-sm text-gray-600 focus:outline-none border-none bg-transparent"
        value={search}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBox;
