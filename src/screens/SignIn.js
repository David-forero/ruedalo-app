import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {  InputField, Button, Mail, Lock } from "../components";
import { SAFEAREAVIEW, FONTS, COLORS, SIZES } from "../constants";

export default function SignIn() {
    const navigation = useNavigation();
    const [remember, setRemember] = useState(false);

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

               <View style={{ justifyContent: 'center', marginBottom: 20}}>
             
                <Text style={{fontSize: 18}}>Inicio de sesión</Text>
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
                    {/* <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={() => setRemember(!remember)}
                    >
                        <View
                            style={{
                                width: 16,
                                height: 16,
                                borderRadius: 3,
                                borderWidth: 1,
                                borderColor: COLORS.black2,
                                marginRight: 8,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {remember && <Check />}
                        </View>
                        <Text
                            style={{
                                ...FONTS.Roboto_400Regular,
                                fontSize: 16,
                                color: COLORS.black,
                            }}
                        >
                            Remember me
                        </Text>
                    </TouchableOpacity> */}
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
