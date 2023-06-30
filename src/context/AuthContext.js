import { useContext, createContext, useState, useCallback } from "react";
import { post } from "../common/functions/http";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [coordenatesPermitions, setCoordenatesPermitions] = useState(false);

  const loadingApp = async (setLoading, SplashScreen) => {
    console.log("🔥 cargando app...");
    //Obteniendo datos almacenados
    let userValue = await AsyncStorage.getItem("user");
    let onboarding = await AsyncStorage.getItem("onboarding");
    let coordenateEnable = await AsyncStorage.getItem("coordenatesPermitions");

    //Transformando con json parse
    coordenateEnable = JSON.parse(coordenateEnable);
    userValue = JSON.parse(userValue);
    onboarding = JSON.parse(onboarding);

    //Seteando informacion
    setEnableBoarding(onboarding);
    setUser(userValue);
    setCoordenatesPermitions(coordenateEnable);

    //Habilitar auth
    if (userValue) {
      setAuth(true);
    }
    setLoading(false);
    SplashScreen.hideAsync();
  };

  const sendVerifyEmailFn = useCallback(async (myToken) => {
    await post("/verify-email", {}, myToken);
  }, []);

  const confirmVerifyEmailFn = useCallback(
    async (otp, navigation, setLoading, myToken) => {
      //Transformacion del otp
      let keys = Object.keys(otp).sort();
      let otpString = "";
      for (const key of keys) {
        otpString += otp[key];
      }
      otp = otpString;
      //Se verifica el token ✅
      const { data } = await post("/verify-email", { otp }, myToken);
      setLoading(false);
      if (!data.status) {
        return showMessage({
          message: "Error al confirmar correo",
          description: data.message,
          type: "danger",
        });
      }
      navigation.navigate("AccountCreated");

      //En caso de que funcione, obtengo los datos del usuario y actualizo el status ✍️
      let userValue = await AsyncStorage.getItem("user");
      userValue = JSON.parse(userValue);
      userValue.status = "confirmed";
      setUser(userValue);
      await AsyncStorage.setItem("user", JSON.stringify(userValue));
    },
    []
  );

  const signInFn = async (formData, navigation, setLoading) => {
    try {
      const { data } = await post("/login", formData);
      setLoading(false);
      if (data.status == 400 || data.status === false) {
        return showMessage({
          message: "Error al iniciar sessión",
          description: data.message,
          type: "danger",
        });
      }
      setUser(data.data);
      let dataString = JSON.stringify(data.data);
      await AsyncStorage.setItem("user", dataString);
      setAuth(true);
    } catch (error) {
      showMessage({
        message: "Error al iniciar sessión",
        description: data.message,
        type: "danger",
      });
    }
      setLoading(false);

  };

  const signUpFn = useCallback(async (formData, navigation, setLoading) => {
    try {
      delete formData.confirmPassword;
      const { data } = await post("/register_user", formData);
      setLoading(false);

      if (data.status === true) {
        data.data.status = "pending";
        setAuth(true);
        await setUser(data.data);
        let dataString = JSON.stringify(data.data);
        await AsyncStorage.setItem("user", dataString);
        return navigation.navigate("OtpCodeEmail");
      } else {
        showMessage({
          message: "Error al registrar",
          description: data.message,
          type: "danger",
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      showMessage({
        message: "Error al registrar",
        description: "Algo salió mal, intenta mas tarde",
        type: "danger",
      });
    }
  }, []);

  const logOutFn = useCallback(async (navigation) => {
    // await post("/login", {}, token);
    setAuth(false);
    setUser(null);
    await AsyncStorage.removeItem("user");
    navigation.navigate("SignIn");
  }, []);

  const signWithGoogleFn = async (googleData) => {
    const { data } = await post("/login-google", { email: googleData.email });
    setUser(data.data);
    setAuth(true);
    let dataString = JSON.stringify(data?.data);
    await AsyncStorage.setItem("user", dataString);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        auth,
        enableBoarding,
        coordenatesPermitions,
        setCoordenatesPermitions,
        //Functions
        signInFn,
        signUpFn,
        signWithGoogleFn,
        loadingApp,
        logOutFn,
        sendVerifyEmailFn,
        confirmVerifyEmailFn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);
