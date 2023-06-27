import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";

import { SuccessTwo, Button } from "../common/components";
import { COLORS, FONTS, SAFEAREAVIEW } from "../common/constants";
import { useNavigation } from "@react-navigation/native";

export default function CreateCardSuccess() {
    const navigation = useNavigation();
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
                        textTransform: "capitalize",
                        color: COLORS.black2,
                        marginBottom: 10,
                    }}
                >
                    Tu vehículo fue añadido correctamente
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
                   Ahora podremos mostrarte tiendas y servicios recomendados para tu vehículo
                </Text>
               
                <Button
                    title="Volver a mis vehículos"
                    onPress={() => navigation.navigate('MainLayout')}
                    containerStyle={{ backgroundColor: COLORS.orange }}
                    textStyle={{ color: COLORS.white }}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
