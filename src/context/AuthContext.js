import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { get, post } from "../common/functions/http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { useNavigationCustom } from "../common/hooks";

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

  // Proporciona una función para navegar que puedes usar en todo tu código
  const navigate = (name, params) => {
    useNavigationCustom.current?.navigate(name, params);
  };

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true, // Configurado para mostrar la notificación incluso cuando la app está en primer plano
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const {
          notification: {
            request: {
              content: { data },
            },
          },
        } = response;
        console.log("data ---> ", data);
        
        // Aquí se puede verificar el tipo de notificación y redirigir al usuario según sea necesario
        // Asegúrate de tener este nombre en tu stack de navegación
        if (data.objective === "order") {
          console.log("🔎 a buscar la orden...");
          navigate("Order", { id: data.id_objective });
        }
      }
    );

    return () => {
      // limpieza al desmontar
      subscription.remove();
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      console.warn(
        "Debe usar un dispositivo físico para las notificaciones automáticas"
      );
      // alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const loadingApp = async (setLoading, SplashScreen) => {
    console.log("🔥 cargando app...");
    try {
      //Obteniendo datos almacenados
      const [userValue, onboarding, coordenateEnable] = await Promise.all([
        AsyncStorage.getItem("user"),
        AsyncStorage.getItem("onboarding"),
        AsyncStorage.getItem("coordenatesPermitions"),
      ]);

      // Parse JSON values
      const parsedUserValue = await JSON.parse(userValue);
      const parsedOnboarding = JSON.parse(onboarding);
      const parsedCoordenateEnable = JSON.parse(coordenateEnable);

      //Prueba de token
      const { data } = await get("/list_cars", parsedUserValue?.token);
      if (data.message === "Token Invalido" && data.status === 302) {
        await AsyncStorage.removeItem("user");
        return;
      }

      // Set state
      setEnableBoarding(parsedOnboarding);
      setUser(parsedUserValue);
      setCoordenatesPermitions(parsedCoordenateEnable);

      //Habilitar auth
      if (userValue) {
        setAuth(true);
      }
    } catch (error) {
      console.error("⭕️", error);
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

      const tokenNotify = await registerForPushNotificationsAsync();
      console.log(tokenNotify);

      setUser(data.data);
      let dataString = JSON.stringify(data.data);
      await AsyncStorage.setItem("user", dataString);
      setAuth(true);
    } catch (error) {
      console.error(error);
      showMessage({
        message: "Error al iniciar sessión",
        description: "Error desconocido...",
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
