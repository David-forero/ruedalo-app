import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { Header, InputField, Button } from "../../common/components";
import { COLORS, FONTS, SAFEAREAVIEW, SIZES } from "../../common/constants";

export default function SignUp() {
    const navigation = useNavigation();

    function renderContent() {
        return (
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    alignItems: "center",
                    paddingHorizontal: 30,
                    paddingVertical: SIZES.paddingVertical,
                }}
            >
                
                <InputField
                    placeholder="Nombre y Apellido"
                    contaynerStyle={{ marginBottom: 13 }}
                />

                {/* <Picker
                    style={{
                        width: "100%",
                        height: 50,
                        backgroundColor: COLORS.lightGray,
                        borderRadius: 20,
                        alignItems: "center",
                        flexDirection: "row",
                        paddingHorizontal: 20,
                        marginBottom: 13
                    }}
                    mode="dropdown"
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item style={{color: COLORS.gray2, marginLeft: 10}} label="Venezuela" value="ve" />
                    <Picker.Item style={{color: COLORS.gray2, marginLeft: 10}} label="Colombia" value="co" />
                    <Picker.Item style={{color: COLORS.gray2, marginLeft: 10}} label="Ecuador" value="ec" />
                    <Picker.Item style={{color: COLORS.gray2, marginLeft: 10}} label="Perú" value="pe" />
                    <Picker.Item style={{color: COLORS.gray2, marginLeft: 10}} label="Chile" value="ch" />
                </Picker> */}


                <InputField
                    placeholder="Correo"
                    contaynerStyle={{ marginBottom: 13 }}
                />

                <InputField
                    placeholder="Contraseña"
                    contaynerStyle={{ marginBottom: 13 }}
                />
                <InputField
                    placeholder="Confirmar Contraseña"
                    contaynerStyle={{ marginBottom: 37 }}
                />
                <View
                    style={{
                        width: "100%",
                    }}
                >
                    {/* <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            marginBottom: 18,
                            alignItems: "center",
                        }}
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
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{
                                    ...FONTS.Roboto_400Regular,
                                    fontSize: 16,
                                    marginLeft: 3,
                                    color: COLORS.gray2,
                                    lineHeight: 16 * 1.3,
                                }}
                            >
                                You agree to our Terms of Service
                            </Text>
                        </View>
                    </TouchableOpacity> */}
                </View>

                <Button
                    title="Crear Cuenta"
                    containerStyle={{
                        backgroundColor: COLORS.black2,
                        marginBottom: 28,
                    }}
                    onPress={() => navigation.navigate("OtpCodeEmail")}
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
                        ¿Ya tienes cuenta?
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignIn")}
                    >
                        <Text
                            style={{
                                ...FONTS.Roboto_700Bold,
                                fontSize: 16,
                                color: COLORS.orange,
                            }}
                        >
                            {" "}
                            ¡Entra aquí!
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <Header title="Registro" onPress={() => navigation.goBack()} />
            <View className="mt-10">
            {renderContent()}
            </View>
        </SafeAreaView>
    );
}
