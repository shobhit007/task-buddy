import React, { useContext } from "react";

import SearchBox from "../search-box/search-box.component";
import Button from "../button/button";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import FilterBar from "../filter-bar/filter-bar.component";

function Header() {
  const { logOutUser } = useContext(UserContext);

  const handleLogOutUser = () => logOutUser();

  return (
    <div className="w-full">
      <div className="hidden invisible lg:flex lg:justify-between lg:visible px-8 py-4 bg-white">
        <SearchBox />
        <Button
          style={{ width: "120px", paddingBlock: "0.5rem" }}
          onClick={handleLogOutUser}
        >
          Log out
        </Button>
      </div>
      <FilterBar />
      <Outlet />
    </div>
  );
}

export default Header;
