import React, { useContext, useEffect, useState } from "react";
import { getUserData } from "./ServerConnections";

export const InfoContext = React.createContext();

export const InfoProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginCheck = () => {
    if (localStorage.getItem("token")) {
      getUserData().then((data) => {
        setName(data.username);
      });
      setIsLoggedIn(true);
      return true;
    } else return false;
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData().then((data) => {
        setName(data.username);
      });
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <InfoContext.Provider
      value={{ name, setName, isLoggedIn, setIsLoggedIn, loginCheck }}
    >
      {children}
    </InfoContext.Provider>
  );
};

export const useInfoContext = () => {
  return useContext(InfoContext);
};
