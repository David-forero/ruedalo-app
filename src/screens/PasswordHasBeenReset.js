import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Key, Button } from "../common/components";
import { COLORS, FONTS, SAFEAREAVIEW, SIZES } from "../common/constants";

export default function PasswordHasBeenReset() {
    const navigation = useNavigation();

    function renderCOntent() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 30,
                    paddingVertical: SIZES.paddingVertical,
                }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ marginBottom: 36 }}>
                    <Key />
                </View>
                <Text
                    style={{
                        ...FONTS.H2,
                        marginBottom: 10,
                    }}
                >
                    Su contraseña ha sido reseteada
                </Text>
                <Text
                    style={{
                        ...FONTS.H4,
                    }}
                >
                  Ahora puedes iniciar sesión con la nueva contraseña
                </Text>
                <View style={{ height: SIZES.height / 5 }} />
                <Button
                    title="Listo"
                    onPress={() => navigation.navigate("SignIn")}
                />
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            {renderCOntent()}
        </SafeAreaView>
    );
}
