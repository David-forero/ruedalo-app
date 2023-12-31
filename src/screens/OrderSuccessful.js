import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";

import { SuccessTwo, Button } from "../common/components";
import { COLORS, FONTS, SAFEAREAVIEW } from "../common/constants";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function OrderSuccessful() {
    const navigation = useNavigation();
    const route = useRoute();
    const { data } = route.params;
    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 30,
                    flexGrow: 1,
                    justifyContent: "center",
                }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ alignSelf: "center", marginBottom: 36 }}>
                    <SuccessTwo />
                </View>
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.Roboto_700Bold,
                        fontSize: 22,
                        color: COLORS.black,
                        marginBottom: 10,
                    }}
                >
                    Se ha creado la orden correctamente
                </Text>
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.Roboto_400Regular,
                        fontSize: 16,
                        color: COLORS.gray2,
                        marginBottom: 21,
                    }}
                >
                    Conversa con tu vendedor para mas detalles de tu orden
                </Text>
                <Button
                    title="Detalles de la compra"
                    containerStyle={{ marginBottom: 15 }}
                    onPress={() => navigation.navigate('Order', {id: data.data.data.id, goHome: true})}
                />
                <Button
                    title="Continuar comprando"
                    containerStyle={{ backgroundColor: COLORS.orange }}
                    textStyle={{ color: COLORS.white }}
                    onPress={() => navigation.navigate('MainLayout')}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
