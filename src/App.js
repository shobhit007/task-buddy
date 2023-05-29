import { Routes, Route } from "react-router-dom";

import SignIn from "./routes/signin/signin";
import SignUp from "./routes/signup/signup";
import Dashboard from "./routes/dashboard/dashboard";
import { useContext } from "react";
import { UserContext } from "./context/user.context";

function App() {
  const { loading } = useContext(UserContext);
  if (loading) return <h1>Loading...</h1>;
  return (
    <Routes>
      <Route path="/*" element={<Dashboard />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
