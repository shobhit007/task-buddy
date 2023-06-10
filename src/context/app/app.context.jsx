import React, { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const value = {
    isModalOpen,
    setIsModalOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
