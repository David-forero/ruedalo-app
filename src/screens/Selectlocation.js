import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

import { Header, Button, ModalPermitions, LoadingFullScreen } from "../common/components";
import { COLORS, FONTS, SAFEAREAVIEW, SIZES } from "../common/constants";
import { useAuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, SafeAreaView, Image, Text } from "react-native";
import { useStoreContext } from "../context/StoreContext";

export default function Selectlocation() {
  const navigation = useNavigation();
  const { setCoordenatesPermitions } = useAuthContext();
  const {initPlaceFn} = useStoreContext()
  const [showModalPermition, setShowModalPermition] = useState(false);
  const [loading, setLoading] = useState(false);

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setShowModalPermition(true)
      return;
    }
    // Permiso de ubicación concedido
    try {
      setLoading(false);
      await AsyncStorage.setItem("coordenatesPermitions", JSON.stringify(true));
      await initPlaceFn()
      setCoordenatesPermitions(true);
      setLoading(true);
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
          containerStyle={{
            backgroundColor: COLORS.orange,
            marginVertical: 20,
          }}
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
      <ModalPermitions
        showModal={showModalPermition}
        setShowModal={setShowModalPermition}
        title={"Permisos requeridos"}
        description={
          "Necesitamos su permiso para la ubicación. Por favor, vaya a la configuración de la aplicación y conceda el permiso."
        }
      />
      <LoadingFullScreen isLoading={loading} />
    </SafeAreaView>
  );
}
