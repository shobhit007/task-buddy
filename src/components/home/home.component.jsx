import { useContext } from "react";
import Button from "../button/button";
import { UserContext } from "../../context/user.context";

function Home() {
  const { logOutUser } = useContext(UserContext);

  const handleLogOutUser = () => logOutUser();

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="py-6 px-8 bg-white">
        <div className="flex justify-end">
          <Button
            style={{ width: "120px", paddingBlock: "0.5rem" }}
            onClick={handleLogOutUser}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
