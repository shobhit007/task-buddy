import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./routes/signin/signin";
import SignUp from "./routes/signup/signup";
import Dashboard from "./routes/dashboard/dashboard";

import Spinner from "./components/spinner/spinner.component";

import { useDispatch, useSelector } from "react-redux";
import { checkUserSession } from "./store/user/user.actions";
import { selectCurrentUser } from "./store/user/user.selector";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Routes>
      <Route index path="/*" element={<Dashboard />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
