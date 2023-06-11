import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { post } from "../common/functions/http";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
    
  return (
    <UserContext.Provider value={{

    }}>
        {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
export const useUserContext = () => useContext(UserContext);
