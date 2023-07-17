import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  InputField,
  Button,
  Mail,
  Lock,
  Google as GoogleIcon,
  LoadingFullScreen,
} from "../../common/components";
import { SAFEAREAVIEW, FONTS, COLORS, SIZES } from "../../common/constants";
import { useAuthContext } from "../../context/AuthContext";
import * as WebBrowser from "expo-web-browser";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Logo from "../../assets/icons/ruedalo2.png";
import * as Google from "expo-auth-session/providers/google";
WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const navigation = useNavigation();
  // const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signWithGoogleFn, signInFn } = useAuthContext();
  const [accessToken, setAccessToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const SignInFormSchema = Yup.object().shape({
    email: Yup.string().required("Campo requerido"),
    password: Yup.string().required("Campo requerido"),
  });

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const useInfo = await response.json();
    setLoadingGoogle(false);
    signWithGoogleFn(useInfo, setLoadingGoogle);
    // navigation.navigate("MainLayout");
  }

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId:
      "553402707258-30nb16fguqjq9a6lvj82hqiutsivb5hv.apps.googleusercontent.com",
    clientSecret: __DEV__ ? "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" : "",
    expoClientId:
      "553402707258-30nb16fguqjq9a6lvj82hqiutsivb5hv.apps.googleusercontent.com",
    androidClientId:
      "553402707258-li8klp1l4geq99n2smn36a056nsvdoog.apps.googleusercontent.com",
    iosClientId:
      "919346816499-j4sh5mjmuog29cmd8qt167fq19ba5t2r.apps.googleusercontent.com"
  });

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response?.authentication?.accessToken);
      accessToken && fetchUserInfo();
    } else {
      setLoadingGoogle(false);
    }
  }, [response, accessToken]);

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <LoadingFullScreen isLoading={loadingGoogle} />
      <View className="flex-row-reverse items-center px-4 py-1">
        <TouchableHighlight onPress={() => navigation.navigate("OnBoarding")}>
          <Entypo name="info-with-circle" size={24} color="#2d2d2d" />
        </TouchableHighlight>
      </View>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 30,
          alignItems: "center",
          paddingTop: SIZES.paddingTop_02,
          marginTop: 80,
        }}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            setLoading(true);
            signInFn(values, navigation, setLoading);
          }}
          validationSchema={SignInFormSchema}
          validateOnMount
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <>
              <View
                style={{
                  justifyContent: "center",
                  marginBottom: 20,
                  alignItems: "center",
                }}
              >
                <Image source={Logo} className="w-16 h-16 mb-3" />
                <Text style={{ fontSize: 18 }}>Inicio de sesión</Text>
              </View>

              <InputField
                contaynerStyle={{ marginBottom: 15 }}
                placeholder="Correo"
                leftIcon={<Mail />}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {/* Contraseña sin el componente por peticion */}
              <View className="mb-3">
                <View
                  className="bg-gray-100"
                  style={{
                    width: "100%",
                    height: 50,
                    borderRadius: 10,
                    alignItems: "center",
                    flexDirection: "row",

                    paddingHorizontal: 20,
                    marginBottom: 15,
                  }}
                >
                  <View style={{ paddingRight: 14 }}>{<Lock />}</View>

                  <TextInput
                    style={{ flex: 1 }}
                    placeholder={"Contraseña"}
                    secureTextEntry={!showPassword}
                    onChangeText={handleChange("password")}
                    value={values.password}
                    textContentType={showPassword ? "none" : "password"}
                  />

                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={24}
                        color="black"
                      />
                    }
                  </TouchableOpacity>
                </View>
              </View>

              {/* ======================= */}
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 20,
                  marginBottom: 18,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  <Text
                    style={{
                      ...FONTS.Roboto_400Regular,
                      fontSize: 16,
                      color: COLORS.carrot,
                      paddingRight: 20,
                    }}
                  >
                    ¿Olvidó su contraseña?
                  </Text>
                </TouchableOpacity>
              </View>
              <Button
                loading={loading}
                valid={isValid}
                title="Iniciar Sesión"
                containerStyle={{ backgroundColor: COLORS.black2 }}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>

        <TouchableOpacity
          className="flex-row items-center space-x-3 w-full h-[50px] rounded-lg justify-around bg-gray-600 mt-5"
          onPress={() => {
            setLoadingGoogle(true);
            promptAsync();
          }}
          disabled={loadingGoogle || loading}
        >
          <GoogleIcon width={25} height={25} />
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 16,
              color: COLORS.white,
              textTransform: "capitalize",
            }}
          >
            Iniciar con Google
          </Text>

          <View className="w-4 h-4"></View>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            flex: 1,
            marginBottom: 34,
          }}
        >
          <Text
            style={{
              ...FONTS.Roboto_400Regular,
              fontSize: 16,
              color: COLORS.black,
            }}
          >
            ¿Aún no tiene cuenta?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text
              style={{
                ...FONTS.Roboto_500Medium,
                fontSize: 16,
                color: COLORS.orange,
              }}
            >
              {" "}
              ¡Registrate!
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
