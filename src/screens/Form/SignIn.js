import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { InputField, Button, Mail, Lock, Google as GoogleIcon } from "../../common/components";
import { SAFEAREAVIEW, FONTS, COLORS, SIZES } from "../../common/constants";
import { useAuthContext } from "../../context/AuthContext";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
WebBrowser.maybeCompleteAuthSession();


export default function SignIn() {
    const navigation = useNavigation();
    // const [remember, setRemember] = useState(false);
    const {signWithGoogleFn} = useAuthContext();
  const [accessToken, setAccessToken] = useState(null);

    async function fetchUserInfo() {
        let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const useInfo = await response.json();
        signWithGoogleFn(useInfo)
        // setUser(useInfo);
    }

    useEffect(() => {
      async function init() {
        const value = await AsyncStorage.getItem('user')
        if (value) {
            navigation.navigate('MainLayout')
        }
      }
      init();
    }, [])
    

    const [request, response, promptAsync] = Google.useAuthRequest({
        webClientId: '469688688692-0i7mt0uqbc96hbp0u6jttvrg8lm3c7d8.apps.googleusercontent.com',
        clientSecret: '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',
        expoClientId: '469688688692-0i7mt0uqbc96hbp0u6jttvrg8lm3c7d8.apps.googleusercontent.com',
        androidClientId: '469688688692-jbm36cdotrfies2i9fp9p8d7i3ua2ne9.apps.googleusercontent.com',
        iosClientId: '469688688692-ulr8dlggrkuqhjshnj6f76slm0vv8q66.apps.googleusercontent.com',
    });

    useEffect(() => {
        
        if (response?.type === "success") {
            setAccessToken(response.authentication.accessToken);
            accessToken && fetchUserInfo();
            navigation.navigate('MainLayout')
        }
    }, [response, accessToken])

    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 30,
                    alignItems: "center",
                    paddingTop: SIZES.paddingTop_02,
                    marginTop: 80
                }}
            >

                <View style={{ justifyContent: 'center', marginBottom: 20 }}>

                    <Text style={{ fontSize: 18 }}>Inicio de sesión</Text>
                </View>

                <InputField
                    contaynerStyle={{ marginBottom: 15 }}
                    placeholder="Correo"
                    leftIcon={<Mail />}
                />
                <InputField
                    leftIcon={<Lock />}
                    placeholder="Contraseña"
                    contaynerStyle={{ marginBottom: 37 }}
                    secureTextEntry={true}
                />
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
                    title="Iniciar Sesión"
                    containerStyle={{ backgroundColor: COLORS.black2 }}
                    onPress={() => navigation.navigate("MainLayout")}
                />

                <TouchableOpacity
                    className="flex-row items-center space-x-3 w-full h-[50px] rounded-lg justify-around bg-gray-600 mt-5"
                    onPress={() => promptAsync()}
                >
                    <GoogleIcon width={25} height={25} />
                    <Text
                        style={{
                            textAlign: "center",
                            color: 'white',
                            fontSize: 16,
                            color: COLORS.white,
                            textTransform: "capitalize",
                        }}
                    >
                        Iniciar con Google
                    </Text>

                    <View className="w-4 h-4">

                    </View>
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
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignUp")}
                    >
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
