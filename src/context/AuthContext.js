import { useContext, createContext, useState, useCallback, useEffect } from "react";
import { post } from "../common/functions/http";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";

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
  const [enableBoarding, setEnableBoarding] = useState(true);

  const loadingApp = useCallback(async (setLoading) => {
    let userValue = await AsyncStorage.getItem('user');
    let onboarding = await AsyncStorage.getItem('onboarding');
    userValue = JSON.parse(userValue);
    onboarding = JSON.parse(onboarding);
    setEnableBoarding(onboarding)
    if (userValue) {
      setUser(userValue);
    }
    setLoading(false)
  }, [])



  const signInFn = useCallback(async (formData, navigation, setLoading) => {
    const { data } = await post("/login", formData);
    setLoading(false);

    if (data.status === true) {
      setUser(data.data);
      setAuth(true)
      let dataString = JSON.stringify(data.data);
      await AsyncStorage.setItem('user', dataString)
      return navigation.navigate('MainLayout')
    } else {
      showMessage({
        message: "Error al iniciar sessión",
        description: data.message,
        type: "danger",
      });
    }

  }, []);

  const signUpFn = useCallback(async (formData, navigation, setLoading) => {
    const { data } = await post("/register_user", formData);
    setLoading(false);

    if (data.status === true) {
      setAuth(true)
      setUser(data.data);
      let dataString = JSON.stringify(data.data);
      await AsyncStorage.setItem('user', dataString)
      return navigation.navigate('OtpCodeEmail')
    } else {
      showMessage({
        message: "Error al registrar",
        description: data.message,
        type: "danger",
      });
    }
  }, []);

  const logOutFn = useCallback(async (navigation) => {
    console.log('cerrando...')
    await post("/login", '');
    await AsyncStorage.removeItem('user');
    setUser(null);
    navigation.navigate("SignIn");
  },[]);

  const signWithGoogleFn = async (data) => {
    setUser(data)
    let dataString = JSON.stringify(data);
    await AsyncStorage.setItem('user', dataString)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        auth,
        enableBoarding,
        signInFn,
        signUpFn,
        signWithGoogleFn,
        loadingApp,
        logOutFn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);