// Backend
import React, { createContext, useState, useEffect, useContext } from 'react'

export const AuthDataContext = createContext(null)
const localStorage = window.localStorage

// This const is to have an empty object if no login
const INITAUTHDATA = {}

/**
 * Get data from localstorage
 * @returns {} if user is not logged in, user tokens if logged in
 */
export const getAuthData = () => {
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

/**
 * @param {*} props the props that this component inherits
 * @returns A REACT component that has functions to login and logout. Also sets authdata
 */
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

/**
 * @returns Hook to use ReactContext to get login info.
 */
export function useAuth () {
  return useContext(AuthDataContext)
}

export default AuthDataProvider
