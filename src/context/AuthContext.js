import { useContext, createContext, useState, useCallback, useEffect } from "react";
import { post } from "../common/functions/http";
import AsyncStorage from '@react-native-async-storage/async-storage';
//Web==
//Secret: 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
//ID:469688688692-0i7mt0uqbc96hbp0u6jttvrg8lm3c7d8.apps.googleusercontent.com
//Android==
//ID: 469688688692-jbm36cdotrfies2i9fp9p8d7i3ua2ne9.apps.googleusercontent.com
//Ios==
//Client ID: 469688688692-ulr8dlggrkuqhjshnj6f76slm0vv8q66.apps.googleusercontent.com

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  const signInFn = useCallback(async (formData, navigation, setLoading) => {
    const { data } = await post("/signin", formData);
    if (data.status === 200) {
      setUser(data.data);
      setAuth(true)
      return navigation.navigate('HomeScreen')
    }

    alert(data.message);
    setLoading(false);
  }, []);

  const signUpFn = useCallback(async (formData, navigation, setLoading) => {
    const { data } = await post("/signup", formData);
    if (data.status === 200) {
      setAuth(true)
      setUser(data.data);
      return navigation.navigate('HomeScreen')
    }
    alert(data.message);
    setLoading(false);
  }, []);

  const signWithGoogleFn = async (data) => {
    setUser(data)
    await AsyncStorage.setItem('user', value)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        auth,
        signInFn,
        signUpFn,
        signWithGoogleFn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);