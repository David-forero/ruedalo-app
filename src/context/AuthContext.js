import { useContext, createContext, useState, useCallback } from "react";
import { post } from "../common/functions/http";
import * as GoogleSignIn from 'expo-google-app-auth';

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

  const signInWithGoogleFn = async () => {
    try {
      const { type, user } = await GoogleSignIn.logInAsync({
        androidClientId: 'YOUR_ANDROID_CLIENT_ID',
        iosClientId: 'YOUR_IOS_CLIENT_ID',
        scopes: ['profile', 'email'],
      });
  
      if (type === 'success') {
        // Aquí puedes manejar la respuesta exitosa del inicio de sesión con Google
        console.log(user);
      } else {
        // Aquí puedes manejar el caso en el que el inicio de sesión no fue exitoso
      }
    } catch (error) {
      // Aquí puedes manejar los errores que puedan ocurrir durante el inicio de sesión
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        auth,
        signInFn,
        signUpFn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);