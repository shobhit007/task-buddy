import React, { createContext, useEffect, useReducer } from "react";

import {
  getUserAccount,
  createUserSession,
  createUserAccount,
  deleteCurrentSession,
} from "../utils/api/appwrite.api";
import { useNavigate } from "react-router-dom";

const INITIAL_STATE = {
  user: null,
  showTaskModal: false,
  loading: true,
  errorMessage: "",
};

export const UserContext = createContext({
  ...INITIAL_STATE,
  setShowTaskModal: () => {},
  signInUser: () => {},
  createNewUser: () => {},
  logOutUser: () => {},
});

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "set_user":
      return { ...state, loading: false, user: payload };
    case "set_task_modal":
      return { ...state, showTaskModal: !state.showTaskModal };
    case "set_error":
      return { ...state, loading: false, errorMessage: payload };
    case "stop_loading":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const { user, showTaskModal, loading, errorMessage } = state;

  const navigate = useNavigate();

  useEffect(() => {
    const getUserCurrentAccount = async () => {
      try {
        const user = await getUserAccount();
        if (user) setUser(user);
      } catch (error) {
        console.log(error.message);
        dispatch({ type: "stop_loading" });
      }
    };

    getUserCurrentAccount();
  }, []);

  const setUser = (user) => dispatch({ type: "set_user", payload: user });

  const setTaskModal = () => dispatch({ type: "set_task_modal" });

  const setErrorMessage = (error) =>
    dispatch({ type: "set_error", payload: error });

  // Sign in user (basically create new user session)
  const signInUser = async (email, password) => {
    try {
      const user = await createUserSession(email, password);
      setUser(user);
      navigate("/", { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Create a user account
  const createNewUser = async (email, password, name) => {
    try {
      const user = await createUserAccount(email, password, name);
      await createUserSession(email, password);
      if (user) navigate("/", { replace: true });
    } catch (error) {
      if (error.type === "user_already_exists") {
        setErrorMessage("Email has already been taken.");
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  // Logout user
  const logOutUser = async () => {
    try {
      await deleteCurrentSession();
      setUser(null);
      navigate("/signin", { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const value = {
    user,
    showTaskModal,
    loading,
    errorMessage,
    setTaskModal,
    signInUser,
    createNewUser,
    logOutUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
