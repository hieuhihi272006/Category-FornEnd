import { createContext, useState, useEffect } from "react";
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    roles: [],
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payLoad = JSON.parse(atob(token.split(".")[1]));
        if (payLoad.exp * 1000 > Date.now()) {
          setAuth({ token, roles: payLoad.roles || [] });
        } else {
          localStorage.removeItem("token");
          setAuth({ token: null, roles: [] });
        }
      } catch {
        localStorage.removeItem("token");
        setAuth({ token: null, roles: [] });
      }
    }
  }, []);
  const login = (token) => {
    localStorage.setItem("token", token);
    const payload = JSON.parse(atob(token.split(".")[1]));
    setAuth({ token, roles: payload.roles || [] });
  };
  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, roles: [] });
  };
  const isLoggedIn = !!auth.token;
  const hasRole = (role) => {
    return auth.roles.includes(role);
  };
  return (
    <AuthContext.Provider value={{ auth, login, logout, isLoggedIn, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
