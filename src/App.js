import { Routes, Route } from "react-router-dom";

import SignIn from "./routes/signin/signin";
import SignUp from "./routes/signup/signup";
import Dashboard from "./routes/dashboard/dashboard";
import Private from "./routes/private/private-route";

import { useContext } from "react";
import { UserContext } from "./context/user.context";
import Spinner from "./components/spinner/spinner.component";

function App() {
  const { loading } = useContext(UserContext);
  if (loading) {
    return <Spinner />;
  }
  return (
    <Routes>
      <Route element={<Private />}>
        <Route path="/*" element={<Dashboard />} />
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
