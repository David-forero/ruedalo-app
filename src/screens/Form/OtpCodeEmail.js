import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    StatusBar,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { Header, Button } from "../../common/components";
import { SAFEAREAVIEW, SIZES, COLORS, FONTS } from "../../common/constants";
import { useAuthContext } from "../../context/AuthContext";
import useCountdownTimer from "../../common/hooks/useCountdownTimer";

export default function OtpCode() {
    const navigation = useNavigation();
    const { sendVerifyEmailFn, user, confirmVerifyEmailFn, logOutFn } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const { timer, resetTimer, formatTime } = useCountdownTimer(10 * 60); // 10 minutes in seconds

    const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "" });

    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();
    const fiveInput = useRef();

    useEffect(() => {
        sendVerifyEmailFn(user?.token);
    }, [user?.token])


    function renderContent() {
        return (
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 30,
                    alignItems: "center",
                }}
            >
                <StatusBar translucent={false} backgroundColor={'#fff'} barStyle={"dark-content"} />

                <View style={{ height: SIZES.height / 18 }} />
                <Text style={{ ...FONTS.H2, marginBottom: 12 }}>
                    Verificación de OTP
                </Text>
                <Text
                    style={{
                        ...FONTS.Roboto_400Regular,
                        fontSize: 16,
                        color: COLORS.gray2,
                        marginBottom: 5,
                    }}
                >
                    Se ha enviado un código de autenticación a
                </Text>
                <Text
                    style={{ color: COLORS.carrot, ...FONTS.Roboto_400Regular }}
                >
                    {user?.email}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        marginVertical: 24,
                    }}
                >
                    <TextInput
                        keyboardType="number-pad"
                        maxLength={1}
                        ref={secondInput}
                        onChangeText={(text) => {
                            setOtp({ ...otp, 2: text });
                            text
                                ? thirdInput.current.focus()
                                : firstInput.current.focus();
                        }}
                        style={{
                            textAlign: "center",
                            paddingHorizontal: 22,
                            paddingVertical: 14.5,
                            textAlign: "center",
                            fontSize: 24,
                            color: COLORS.black,
                            width: 59,
                            borderRadius: 5,
                            backgroundColor: "white",
                            backgroundColor: COLORS.lightGray,
                            borderRadius: 30,
                            ...FONTS.Roboto_700Bold,
                        }}
                    />
                    <View
                        style={{
                            borderRadius: 5,
                            backgroundColor: "white",
                        }}
                    >
                        <TextInput
                            style={{
                                textAlign: "center",
                                paddingHorizontal: 22,
                                paddingVertical: 14.5,
                                textAlign: "center",
                                fontSize: 24,
                                color: COLORS.black,
                                width: 59,
                                backgroundColor: COLORS.lightGray,
                                borderRadius: 30,
                                ...FONTS.Roboto_700Bold,
                            }}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={thirdInput}
                            onChangeText={(text) => {
                                setOtp({ ...otp, 3: text });
                                text
                                    ? fourthInput.current.focus()
                                    : secondInput.current.focus();
                            }}
                        />
                    </View>
                    <View
                        style={{
                            borderRadius: 5,
                            backgroundColor: "white",
                        }}
                    >
                        <TextInput
                            style={{
                                textAlign: "center",
                                paddingHorizontal: 22,
                                paddingVertical: 14.5,
                                textAlign: "center",
                                fontSize: 24,
                                color: COLORS.black,
                                width: 59,
                                backgroundColor: COLORS.lightGray,
                                borderRadius: 30,
                                ...FONTS.Roboto_700Bold,
                            }}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={fourthInput}
                            onChangeText={(text) => {
                                setOtp({ ...otp, 4: text });
                                text
                                    ? fiveInput.current.focus()
                                    : thirdInput.current.focus();
                            }}
                        />
                    </View>
                    <View
                        style={{
                            borderRadius: 5,
                            backgroundColor: "white",
                        }}
                    >
                        <TextInput
                            style={{
                                textAlign: "center",
                                paddingHorizontal: 22,
                                paddingVertical: 14.5,
                                textAlign: "center",
                                fontSize: 24,
                                color: COLORS.black,
                                width: 59,
                                backgroundColor: COLORS.lightGray,
                                borderRadius: 30,
                                ...FONTS.Roboto_700Bold,
                            }}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={fiveInput}
                            onChangeText={(text) => {
                                setOtp({ ...otp, 5: text });
                                !text && fourthInput.current.focus();
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.Roboto_400Regular,
                            fontSize: 16,
                            color: COLORS.black,
                        }}
                    >
                        No recibí ningún código
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            sendVerifyEmailFn(user?.token)
                            resetTimer()
                            showMessage({
                                message: 'Código enviado al correo',
                                type: "success",
                              });
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.Roboto_700Bold,
                                fontSize: 16,
                                color: COLORS.carrot,
                            }}
                        >
                            {" "}
                            Reenviar Código
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text
                    style={{
                        color: COLORS.red,
                        ...FONTS.Roboto_500Medium,
                        fontSize: 16,
                        marginBottom: 20,
                    }}
                >
                    Se vence en {formatTime()} minutos
                </Text>

                <Button
                    valid={otp[5]}
                    loading={loading}
                    title="Verificar Ahora"
                    containerStyle={{ backgroundColor: COLORS.black2 }}
                    onPress={() => {
                        setLoading(true)
                        confirmVerifyEmailFn(otp, navigation, setLoading, user?.token)
                    }}
                />
            </KeyboardAwareScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <Header
                title="Verificación del correo"
                onPress={() => logOutFn()}
            />
            {renderContent()}
          
        </SafeAreaView>
    );
}
