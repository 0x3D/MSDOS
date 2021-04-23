// Backend
import React, { createContext, useState, useEffect, useMemo, useContext } from "react";
import { localStorageAvailable } from '@material-ui/data-grid'

export const AuthDataContext = createContext(null)

const INITAUTHDATA = {}

export const getAuthData = () => {
  // Save cookie if browser allows.
  if (localStorageAvailable) {
    const existingTokens = JSON.parse(localStorage.getItem("tokens"));
    return existingTokens
  }
  return INITAUTHDATA
}

export const authenticateUser = (username, password) => {
  return { username, password };
}

const AuthDataProvider = (props) => {
  const [authData, setAuthData] = useState(INITAUTHDATA)

  useEffect(() => {
    const currentAuthData = getAuthData();
    if (currentAuthData) {
      setAuthData(currentAuthData);
    }
  }, [])

  const basicLogout = () => {
    setAuthData(INITAUTHDATA)
    localStorage.removeItem("tokens")
  }

  const basicLogin = (newAuthData) => {
    setAuthData(newAuthData)
    localStorage.setItem("tokens", JSON.stringify(newAuthData));
  }

  //This will cache for speed
  //const authDataValue = useMemo({ ...authData, basicLogin, basicLogout }, [authData]);

  return <AuthDataContext.Provider value={{ authData, basicLogin, basicLogout }} {...props} />;
};

// Hook to get Authenticated
export function useAuth() {
  return useContext(AuthDataContext);
}

export default AuthDataProvider
