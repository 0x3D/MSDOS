// Backend
import React, { createContext, useState, useEffect, useMemo, useContext } from 'react'

export const AuthDataContext = createContext(null)

// This const is to have an empty object if no login
const INITAUTHDATA = {}
const localStorage = window.localStorage

// If a login already exists, get it from localstorage
export const getAuthData = () => {
  // Save cookie if browser allows.
  if (localStorage.getItem('tokens')) {
    const existingTokens = JSON.parse(localStorage.getItem('tokens'))
    return existingTokens
  }
  return INITAUTHDATA
}

// TODO: This should GET fetch('http://localhost:8000/users?' + apartmentNo)
export const authenticateUser = (username, password) => {
  return { username, password }
}

// This is a REACT component that should give functions to logout and login
const AuthDataProvider = (props) => {
  const [authData, setAuthData] = useState(INITAUTHDATA)

  useEffect(() => {
    const currentAuthData = getAuthData()
    if (currentAuthData) {
      setAuthData(currentAuthData)
    }
  }, [])

  const basicLogout = () => {
    setAuthData(INITAUTHDATA)
    localStorage.removeItem('tokens')
  }

  const basicLogin = (newAuthData) => {
    setAuthData(newAuthData)
    localStorage.setItem('tokens', JSON.stringify(newAuthData))
  }

  // This will cache for speed
  // const authDataValue = useMemo({ ...authData, basicLogin, basicLogout }, [authData]);

  return <AuthDataContext.Provider value={{ authData, basicLogin, basicLogout }} {...props} />
}

// Hook to get Authenticated
export function useAuth () {
  return useContext(AuthDataContext)
}

export default AuthDataProvider
