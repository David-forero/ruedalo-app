import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useUserContext } from "../../context/UserContext";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { COLORS, FONTS, SAFEAREAVIEW, SIZES } from "../../common/constants";
import { Button, Header } from "../../common/components";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";

const MemberShip = () => {
  let plan1 = {
    id: 1,
    title: "Plan Básico",
    items: [
      {
        b: "Registra hasta 1 vehículo",
      },
      {
        b: "Obtén notificaciones de repuestos y servicios cercanos a ti ",
      },
    ],
  };

  let plan2 = {
    id: 2,
    title: "Plan Premium",
    items: [
      {
        b: "Registra vehículo ilimitados",
      },
      {
        b: "Obtén notificaciones en tiempo real de ofertas y promociones",
      },
      {
        b: "Obtén recordatorios de vencimiento de documentos legales ",
      },
      {
        b: "Obtén descuentos especiales para tu vehículo",
      },
    ],
  };
  const { paySubscriptionFn, unsubscribeFn } = useUserContext();
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setselectedPlan] = useState(plan1);
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  function ModalCancelMembership() {
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
              marginBottom: 12,
              color: 'red'
            }}
          >
            Atención!
          </Text>

          <Text
            style={{
              textAlign: "center",
              ...FONTS.Roboto_700Bold,
              fontSize: 16,
              marginBottom: 26,
            }}
          >
            Si cancelas tu membresia no se hará devolución
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
              onPress={() => {
                setLoadingModal(true)
                unsubscribeFn(setLoadingModal, setShowModal, user?.token, setUser);
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.Roboto_700Bold,
                  fontSize: 16,
                  color: COLORS.red,
                }}
              >
                {loadingModal ? <ActivityIndicator size={'small'} color="#fff" /> : 'Continuar'}
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
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.Roboto_700Bold,
                  fontSize: 16,
                }}
              >
                Mejor no 
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title="Membresia" onPress={() => navigation.goBack()} />

      <View className="flex-1 justify-between">
        <View>
          <View className="flex-row flex-wrap justify-center items-center space-x-5 mt-10">
            <TouchableOpacity
              className={`shadow-md rounded-lg bg-white overflow-hidden ${
                selectedPlan.id === 1 ? "border-orange-500 border-[2px]" : "border-orange-100"
              }`}
              onPress={() => setselectedPlan(plan1)}
            >
              <View className="w-100 items-center text-center bg-gray-800 px-6 py-2">
                <Text className="text-gray-100 text-md ">Plan Gratis</Text>
              </View>

              <View className="p-3 py-6 bg-gray-300">
                <Text className="text-center text-orange-600 font-bold">
                  Gratis
                </Text>
              </View>

            </TouchableOpacity>

            <TouchableOpacity
              className={`shadow-md rounded-md bg-white overflow-hidden ${
                selectedPlan.id === 2 ? "border-orange-500 border-[2px]" : "border-orange-100"
              }`}
              onPress={() => setselectedPlan(plan2)}
            >
              <View className="w-100 items-center text-center bg-gray-800 px-5 py-2">
                <Text className="text-gray-100 text-md ">Plan Premium</Text>
              </View>

              <View className="p-3 py-6 bg-gray-300">
                <Text className="text-center text-orange-600 font-bold">
                  5.00$/Mes
                </Text>
              </View>

            </TouchableOpacity>
          </View>

          <View className="space-y-3">
            <Text className="font-bold text-lg pl-10 mt-16 mb-5">
              Beneficios del{" "}
              <Text className="text-orange-600">{selectedPlan.title}</Text>:
            </Text>

            {selectedPlan.items.map((item, i) => (
              <View
                key={i}
                className="flex-row items-center justify-around mb-2"
              >
                <Text className="text-orange-600 font-semibold w-[250px]">{item.b}</Text>
                <AntDesign
                  name="checksquareo"
                  size={20}
                  color={COLORS.orange}
                />
              </View>
            ))}
          </View>
        </View>

        <View className="px-5 mt-12 mb-10">
          {selectedPlan.id === 2 ? (
            <>
              {user?.plan === 2 ? (
                <Button
                  title="volver a suscripción gratuita"
                  loading={loading}
                  onPress={() => {
                    setShowModal(true);
                  }}
                />
              ) : (
                <Button
                  title="Subscribirse a este plan"
                  loading={loading}
                  onPress={() => {
                    setLoading(true);
                    paySubscriptionFn(
                      "price_1NLqqLGFUPnOrSP5iiNHqQnP",
                      navigation,
                      setLoading,
                      user?.token,
                      setUser
                    );
                  }}
                />
              )}
            </>
          ) : null}
        </View>
      </View>
      {<ModalCancelMembership />}
    </SafeAreaView>
  );
};

export default MemberShip;
