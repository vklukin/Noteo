import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ auth: false });

  const login = async (userObj) => {
    await axios
      .post(
        "http://localhost:2000/auth/login",
        { userObj },
        {
          withCredentials: true,
        }
      )
      .then((data) => setUser(data));

    return user;
  };

  const logout = () => setUser({ auth: false });
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
