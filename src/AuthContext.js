import React from 'react';
import { Authenticator } from './auth';

let AuthContext = React.createContext(null);

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let login = (newUser, callback) => {
    return Authenticator.login(() => {
      setUser(newUser);
      callback();
    });
  };

  let logout = (callback) => {
    return Authenticator.logout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
