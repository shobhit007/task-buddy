import React, { createContext, useContext, useReducer } from "react";

import { reducer } from "./app.reducer";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const INITIAL_STATE = {
  filters: new Map(),
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const { filters } = state;

  const value = {
    filters,
    dispatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
