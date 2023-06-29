import { View, Text, ScrollView } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button } from "../../common/components";
import { FONTS, SAFEAREAVIEW, SIZES } from "../../common/constants";

export default function NewPassword() {
    const navigation = useNavigation();

    function renderContent() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 30,
                    alignItems: "center",
                    paddingVertical: SIZES.paddingVertical,
                }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={{ ...FONTS.H2, marginBottom: 10 }}>
                    New Password
                </Text>
                <Text
                    style={{
                        ...FONTS.H4,
                        marginBottom: 18,
                        paddingHorizontal: 20,
                    }}
                >
                    Hemos enviando un correo a david.forero1813@gmail.com
                </Text>
                <InputField
                    placeholder="New Password"
                    contaynerStyle={{ marginBottom: 15 }}
                />
                <InputField
                    placeholder="Confirm Password"
                    contaynerStyle={{ marginBottom: 30 }}
                />
                <Button
                    title="Change Password"
                    onPress={() => navigation.navigate("PasswordHasBeenReset")}
                />
            </KeyboardAwareScrollView>
        );
    }

    return (
        <View style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <Header
                title="Resetear Contraseña"
                onPress={() => navigation.goBack()}
            />
            {renderContent()}
        </View>
    );
}
