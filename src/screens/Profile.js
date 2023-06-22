import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

import {
  ProfileCategory,
} from "../common/components";
import { SAFEAREAVIEW, FONTS, COLORS, SIZES } from "../common/constants";
import { useAuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const navigation = useNavigation();
  const { user, logOutFn } = useAuthContext();

  useEffect(() => {
    console.log("🔥 user:", user);
  }, []);

  const [showModal, setShowModal] = useState(false);

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 42,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            ...FONTS.Roboto_500Medium,
            color: COLORS.black,
            textTransform: "capitalize",
          }}
        >
          Perfil
        </Text>
      </View>
    );
  }

  function renderProfile() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 30,
          paddingBottom: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          {user?.avatar ? (
            <Image
              source={{
                uri: "https://backend.ruedalo.app/api/avatar/" + user.avatar[0],
              }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                alignSelf: "center",
                marginTop: 30,
                marginBottom: 10,
              }}
            />
          ) : (
            <Image
              source={require("../assets/images/user.png")}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                alignSelf: "center",
                marginTop: 30,
                marginBottom: 10,
              }}
            />
          )}
          <Text
            style={{
              textAlign: "center",
              ...FONTS.Roboto_700Bold,
              fontSize: 16,
              color: COLORS.black2,
              marginBottom: 3,
            }}
          >
            {user?.name} {user?.lastname}
          </Text>
          {!user?.name && (
            <Text
              style={{
                textAlign: "center",
                ...FONTS.Roboto_400Regular,
                fontSize: 14,
                color: COLORS.gray2,
                marginBottom: 20,
              }}
            >
              Confirma tu Cuenta acá
            </Text>
          )}
        </TouchableOpacity>

        <ProfileCategory
          icon={require("../assets/icons/car.png")}
          title="Mis documentos"
          subtitle="Documentos de mi vehículo"
          onPress={() => navigation.navigate("MyDocuments")}
          iconBgColor={COLORS.lightLilac}
        />
        {/* <ProfileCategory
                    icon={require("../assets/icons/payment.png")}
                    title="Métodos de pagos"
                    subtitle="Selecciona tu metodo de pago por defecto"
                    iconBgColor={COLORS.lightLilac}
                    onPress={() => navigation.navigate("PaymentMethodTwo")}
                />
                <ProfileCategory
                    icon={require("../assets/icons/notification.png")}
                    title="Notificaciones"
                    subtitle="Tus Notificaciones"
                    iconBgColor={COLORS.lightLilac}
                    onPress={() => navigation.navigate("Notifications")}
                /> */}
        <ProfileCategory
          icon={require("../assets/icons/coupon.png")}
          title="Membresia"
          subtitle="Obtenga beneficios"
          onPress={() => navigation.navigate("MemberShip")}
          iconBgColor={COLORS.lightLilac}
        />
        <ProfileCategory
          icon={require("../assets/icons/faq.png")}
          title="FAQ"
          subtitle="Preguntas frecuentes"
          onPress={() => navigation.navigate("FAQ")}
          iconBgColor={COLORS.lightLilac}
        />

        <ProfileCategory
          icon={require("../assets/icons/exit.png")}
          title="Cerrar sesión"
          iconBgColor={COLORS.lightPink}
          onPress={() => setShowModal(true)}
        />

        <ProfileCategory
          icon={require("../assets/icons/exit.png")}
          title="Limpiar Cache"
          iconBgColor={COLORS.lightPink}
          onPress={() => AsyncStorage.removeItem('coordenatesPermitions')}
        />
      </ScrollView>
    );
  }

  function SignOutModal() {
    return (
      <Modal
        isVisible={showModal}
        onBackdropPress={setShowModal}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        style={{ margin: 0 }}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <View
          style={{
            width: SIZES.width - 60,
            backgroundColor: COLORS.white,
            marginHorizontal: 30,
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 34,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              ...FONTS.Roboto_700Bold,
              fontSize: 16,
              marginBottom: 26,
            }}
          >
            ¿Estás seguro de cerrar sesión?
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: 130,
                height: 40,
                backgroundColor: COLORS.lightRed,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 7.5,
              }}
              onPress={() => setShowModal(false)}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.Roboto_700Bold,
                  fontSize: 16,
                  color: COLORS.red,
                }}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 130,
                height: 40,
                backgroundColor: COLORS.black2,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 7.5,
              }}
              onPress={() => {
                setShowModal(false);
                logOutFn(navigation);
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.Roboto_700Bold,
                  fontSize: 16,
                }}
              >
                Si
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      {renderHeader()}
      {renderProfile()}
      {<SignOutModal />}
    </SafeAreaView>
  );
}
