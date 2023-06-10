import { View, Text, ScrollView, SafeAreaView, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

import { Header, Button } from "../common/components";
import { COLORS, FONTS, SAFEAREAVIEW, SIZES } from "../common/constants";

export default function Selectlocation() {
  const navigation = useNavigation();

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permiso de ubicación denegado");
      return;
    }
    // Permiso de ubicación concedido
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      console.log("Ubicación actual:", latitude, longitude);
      navigation.navigate("MainLayout");
    } catch (error) {
      console.log("Error al obtener la ubicación:", error);
    }
  };

  function renderContent() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 30,
          paddingVertical: SIZES.paddingVertical,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/map.png")}
          style={{
            height: 192,
            width: "100%",
            borderRadius: 20,
            marginBottom: 23,
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            textAlign: "center",
            marginBottom: 21,
            color: COLORS.gray2,
            paddingHorizontal: 20,
            ...FONTS.Roboto_400Regular,
            fontSize: 16,
          }}
        >
          Activa tu modo localización para que puedas ver las tiendas mas
          cercanas
        </Text>

        <Button
          title="Dar permiso"
          containerStyle={{ backgroundColor: COLORS.orange, marginVertical: 20 }}
          onPress={getLocationPermission}
          // onPress={() => navigation.navigate("VerifyYourPhoneNumber")}
        />

        <Button
          title="Quizás en otro momento"
          containerStyle={{ backgroundColor: COLORS.black2 }}
          onPress={() => navigation.navigate("MainLayout")}
        />
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title="Geolocalización" onPress={() => navigation.goBack()} />
      {renderContent()}
    </SafeAreaView>
  );
}
