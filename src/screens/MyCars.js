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
import { FontAwesome } from "@expo/vector-icons";
import { Header } from "../common/components";
import { SAFEAREAVIEW, COLORS, SIZES, FONTS } from "../common/constants";
import { useMyCarsContext } from "../context/MyCarsContext";
import { useAuthContext } from "../context/AuthContext";
import dayjs from "dayjs";

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
          marginTop: 10,
          paddingBottom: 150
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
        {loading ? null : (
          <>
            {listCars?.length > 0 ? (
              listCars.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: "100%",
                      backgroundColor: COLORS.gray1,
                      borderRadius: 5,
                      marginBottom: 20
                    }}
                    onPress={() => navigation.navigate('EditVehicle', {myVehicle: item})}
                  >
                   <View className="flex-row items-center justify-center">
                   <Image
                      source={require("../assets/icons/mycar.png")}
                      style={{
                        width: 100,
                        height: 100,
                      }}
                    />
                   </View>

                   <View className='flex-row items-center justify-center my-2'>
                   <Text
                          style={{
                            ...FONTS.Roboto_500Medium,
                            fontSize: 16,
                            textTransform: "capitalize",
                            marginBottom: 2,
                            lineHeight: 16 * 1.2,
                          }}
                          className="text-center text-orange-600 font-bold"
                          numberOfLines={1}
                        >
                          {item.make} {item.model} {item.year}
                        </Text>
                   </View>

                    <View className="px-5 py-2">
                      <Text className="font-bold text-gray-800">
                        Último cambio de aceite:
                      </Text>

                      <Text className="text-gray-500 mb-1">
                        {dayjs(item.oil_date).format("DD/MM/YYYY")}
                      </Text>

                      <Text className="font-bold text-gray-800">
                        Último cambios de neumáticos:
                      </Text>

                      <Text className="text-gray-500 mb-1">
                        {dayjs(item.tire_date).format("DD/MM/YYYY")}
                      </Text>

                      <Text className="font-bold text-gray-800">
                        Último cambio de batería:
                      </Text>

                      <Text className="text-gray-500 mb-1">
                        {dayjs(item.battery_date).format("DD/MM/YYYY")}
                      </Text>
                    </View>
                    <TouchableOpacity
                      className="bg-red-600 p-2 m-5 items-center justify-center rounded-md"
                      onPress={() => {
                        setShowModal(!false);
                        setCarId(item.id);
                      }}
                      style={{
                        paddingHorizontal: 15,
                        paddingVertical: 2,
                      }}
                    >
                      <Text className="text-white text-lg">Eliminar Vehículo</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
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
                await deleteCarFn(
                  carId,
                  user?.token,
                  setLoadingDelete,
                  setShowModal,
                  navigation
                );
                getListCarsFn(user?.token, setLoading);
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.Roboto_700Bold,
                  fontSize: 16,
                }}
              >
                {loadingDelete ? (
                  <ActivityIndicator size={"small"} color={"white"} />
                ) : (
                  "Seguro"
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title={`Mis Vehículos`} onPress={() => navigation.goBack()} />

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
          opacity: user?.plan == 1 && listCars?.length == 2 ? 0.50 : 1
        }}
        onPress={() => {
          if (user?.plan == 1 && listCars?.length == 2) {
            return
          }else{
            navigation.navigate("AddCarForm")
          }
        }}
      >
        <Text className="text-white text-3xl">+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
