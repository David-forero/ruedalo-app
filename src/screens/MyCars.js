import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import { Shadow } from "react-native-shadow-2";
import { FontAwesome } from "@expo/vector-icons";
import { Header, Remove } from "../common/components";
import { SAFEAREAVIEW, COLORS, SIZES, FONTS } from "../common/constants";
import { useMyCarsContext } from "../context/MyCarsContext";
import { useAuthContext } from "../context/AuthContext";

export default function MyCars() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { listCars, getListCarsFn, deleteCarFn } = useMyCarsContext();
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [carId, setCarId] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    setLoading(true);
    getListCarsFn(user?.token, setLoading);
  }, []);

  function renderMyCarsList() {
    return (
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 30,
          flexGrow: 1,
          paddingVertical: SIZES.paddingVertical,
          marginTop: 10
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={async () => {
              setLoading(true);
              getListCarsFn(user?.token, setLoading);
            }}
          />
        }
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={COLORS.orange} />
        ) : (
          <>
            {listCars.length > 0 ? (
              listCars.map((item, index) => {
                return (
                  <Shadow
                    startColor={COLORS.shadowStartColor}
                    finalColor={COLORS.shadowFinalColor}
                    distance={COLORS.shadowDistance}
                    key={index}
                    viewStyle={{
                      marginBottom: 30,
                      width: "100%",
                    }}
                  >
                    <TouchableOpacity
                      key={index}
                      style={{
                        width: "100%",
                        height: 100,
                        backgroundColor: COLORS.white,
                        borderRadius: 5,
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 50
                      }}
                    >
                      <Image
                        source={require("../assets/icons/mycar.png")}
                        style={{
                          width: 130,
                          height: "100%",
                          resizeMode: "cover",
                          borderTopLeftRadius: 5,
                          borderBottomLeftRadius: 5,
                          marginRight: 16,
                        }}
                      />
                      <View>
                        <View
                          style={{
                            width: 200,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              ...FONTS.Roboto_500Medium,
                              fontSize: 16,
                              color: COLORS.black,
                              textTransform: "capitalize",
                              marginBottom: 2,
                              lineHeight: 16 * 1.2,
                            }}
                            numberOfLines={1}
                          >
                            {item.make} {item.model} {item.year}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              setShowModal(!false)
                              setCarId(item.id)
                            }}
                            style={{
                              paddingHorizontal: 15,
                              paddingVertical: 2,
                            }}
                          >
                            <Remove
                              width={30}
                              height={30}
                              strokeColor="red"
                              fillColor="red"
                            />
                          </TouchableOpacity>
                        </View>

                        <Text className="font-bold text-gray-700">
                          Ultimo cambio de ceite:
                        </Text>

                        <Text className="text-red-950 font-bold mb-1">
                          {item.oil_date}
                        </Text>

                        <Text className="font-bold text-gray-700">
                          Ultimo cambios de neumáticos:
                        </Text>

                        <Text className="text-green-900 font-bold mb-1">
                          {item.tire_date}
                        </Text>

                        <Text className="font-bold text-gray-700">
                          Ultimo cambio de batería:
                        </Text>

                        <Text className="text-yellow-600 mb-1">
                          {item.battery_date}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Shadow>
                );
              })
            ) : (
              <View className="mb-5 flex-1 justify-center items-center">
                <FontAwesome
                  name="car"
                  size={50}
                  color="#2d2d2d"
                  style={{ marginBottom: 10 }}
                />

                <Text className="text-gray-900 font-semibold text-2xl text-center">
                  Añade tu vehículo aquí
                </Text>
                <Text className="text-gray-700 text-md mt-3 mb-12 text-center">
                  Esto te permitirá a que nosotros busquemos tiendas y servicios
                  más cercanos para tu vehículo
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    );
  }

  function DeleteModal() {
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
              marginBottom: 35,
            }}
          >
            ¿Estás seguro de eliminar este vehículo?
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
                No
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
              onPress={async () => {
                setLoadingDelete(true)
                await deleteCarFn(carId, user?.token, setLoadingDelete, setShowModal);
                getListCarsFn(user?.token, setLoading)
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.Roboto_700Bold,
                  fontSize: 16,
                }}
              >
                {loadingDelete ? <ActivityIndicator size={'small'} color={'white'} /> : "Seguro"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title="Mis Vehículos" onPress={() => navigation.goBack()} />

      {renderMyCarsList()}
      {<DeleteModal />}
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.2)",
          backgroundColor: COLORS.orange,
          alignItems: "center",
          justifyContent: "center",
          width: 60,
          height: 60,
          position: "absolute",
          bottom: 90,
          right: 20,
          borderRadius: 100,
        }}
        onPress={() => navigation.navigate("AddCarForm")}
      >
        <Text className="text-white text-3xl ">+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
