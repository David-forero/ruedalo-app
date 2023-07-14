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
import { FontAwesome } from "@expo/vector-icons";
import { ProfileCategory } from "../common/components";
import { SAFEAREAVIEW, FONTS, COLORS, SIZES } from "../common/constants";
import { useAuthContext } from "../context/AuthContext";


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
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile")}
          className="mb-4"
        >
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

          {user?.plan == 2 ? (
            <View className="flex items-center justify-center mt-1">
              <View className="p-1 w-28 rounded-full bg-gray-800 flex-row items-center justify-center space-x-2 ">
                <Text className="text-orange-600 font-bold text-xs">
                  {" "}
                  Premium
                </Text>
                <FontAwesome name="diamond" size={13} color={COLORS.orange} />
              </View>
            </View>
          ) : null}

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
          title="Transacciones"
          subtitle="Revisa los últimos pagos en la app"
          iconBgColor={COLORS.lightLilac}
          onPress={() => navigation.navigate("TransactionsView")}
        /> */}
        
        <ProfileCategory
          icon={require("../assets/icons/notification.png")}
          title="Notificaciones"
          subtitle="Tus Notificaciones"
          iconBgColor={COLORS.lightLilac}
          onPress={() => navigation.navigate("Notifications")}
        />

        {user?.plan != 2 ? (
          <ProfileCategory
            icon={require("../assets/icons/coupon.png")}
            title="Membresia"
            subtitle="Obtenga beneficios"
            onPress={() => navigation.navigate("MemberShip")}
            iconBgColor={COLORS.lightLilac}
          />
        ) : null}

        {/* <ProfileCategory
          icon={require("../assets/icons/faq.png")}
          title="FAQ"
          subtitle="Preguntas frecuentes"
          onPress={() => navigation.navigate("FAQ")}
          iconBgColor={COLORS.lightLilac}
        /> */}

        <ProfileCategory
          icon={require("../assets/icons/exit.png")}
          title="Cerrar sesión"
          iconBgColor={COLORS.lightPink}
          onPress={() => setShowModal(true)}
        />

        {/* <ProfileCategory
          icon={require("../assets/icons/exit.png")}
          title="Resetear permisos"
          iconBgColor={COLORS.lightPink}
          onPress={async () => {
            // await Permissions.askAsync(Permissions.);
            // await Permissions.askAsync(Permissions.LOCATION_BACKGROUND);
            // await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
          }}
        /> */}
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
