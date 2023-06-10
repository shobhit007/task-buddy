import { useContext, useState } from "react";

import { Search } from "lucide-react";
import { UserContext } from "../../context/user.context";

import { searchTaskAsync } from "../../context/tasks/tasks.action";

function SearchBox() {
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState("");

  const handleOnChange = (e) => setSearch(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    searchTaskAsync(user.$id, search);
  };

  return (
    <div className="w-4/5 max-w-sm pl-2 rounded-3xl bg-gray-200 overflow-hidden">
      <form className="w-full flex" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-4 focus:outline-none border-none bg-transparent"
          value={search}
          onChange={handleOnChange}
        />
        <button className="flex items-center justify-center bg-transparent hover:bg-gray-300 ml-2 py-3 px-6 transition-colors">
          <Search size={16} />
        </button>
      </form>
    </div>
  );
}

export default SearchBox;
