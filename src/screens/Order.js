import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { Header, Button } from "../common/components";
import { COLORS, FONTS, SAFEAREAVIEW, dummyData } from "../common/constants";
import { Picker } from "@react-native-picker/picker";
import { Rating, AirbnbRating } from "react-native-ratings";
import { useEffect } from "react";
import { useOrdersContext } from "../context/OrdersContext";
import { useAuthContext } from "../context/AuthContext";
import { Fade, Placeholder, PlaceholderLine } from "rn-placeholder";
import * as Linking from "expo-linking";
import statusOrder from "../common/functions/statusOrder";

export default function Order() {
  const navigation = useNavigation();
  const { order, getOneOrder, sendStarFn } = useOrdersContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { id, goHome } = route.params;
  const [rating, setRating] = useState(3);
  const [loadingRating, setLoadingRating] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOneOrder(id, user?.token, setLoading);
    console.log(order);
  }, []);

  const openWhatsAppChat = (phoneNumber) => {
    const url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(url).catch(() => {
      console.log("No se pudo abrir WhatsApp");
    });
  };

  function renderDetails() {
    return (
      <View
        style={{
          marginHorizontal: 30,
          // marginBottom: 20,
        }}
      >
        <View>
          {loading && order?.type ? (
            <View
              style={{
                height: 206,
                width: "100%",
                borderRadius: 14,
                marginBottom: 21,
              }}
              className="shadow-lg bg-gray-300"
              resizeMode="stretch"
            ></View>
          ) : (
            <Image
              source={{
                uri:
                  `https://backend.ruedalo.app/api/${order?.type === 'product' ? 'product' : 'avatar'}/${order?.type === 'product' ? order?.product?.image[0] : order?.commerce?.avatar[0]}`
              }}
              style={{
                height: 206,
                width: "100%",
                borderRadius: 14,
                marginBottom: 21,
              }}
              className="shadow-lg"
              resizeMode="stretch"
            />
          )}
          {loading ? (
            <Placeholder Animation={Fade}>
              <PlaceholderLine width={80} />
            </Placeholder>
          ) : (
            <Text
              style={{
                marginBottom: 8,
                ...FONTS.Roboto_500Medium,
                fontSize: 18,
                textTransform: "capitalize",
                color: COLORS.black,
              }}
            >
              {order?.product?.title || order?.service?.description}
            </Text>
          )}

          {loading ? (
            <Placeholder Animation={Fade} style={{ marginTop: 30 }}>
              <PlaceholderLine width={50} />
              <PlaceholderLine width={76} />
              <PlaceholderLine width={43} />
              <PlaceholderLine width={78} />
              <PlaceholderLine width={50} />
            </Placeholder>
          ) : (
            <Text
              style={{
                marginBottom: 12,
                ...FONTS.Roboto_400Regular,
                fontSize: 14,
                color: COLORS.gray2,
                lineHeight: 14 * 1.4,
                marginBottom: order?.product?.description ? 10 : 0,
              }}
            >
              {/* {description} */}
              {order?.product?.description}
            </Text>
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                ...FONTS.Roboto_700Bold,
                fontSize: 20,
                color: COLORS.carrot,
              }}
            >
              ${order?.product?.price || order?.amount}
            </Text>
          </View>

          {loading ? (
            <Placeholder Animation={Fade} style={{ marginTop: 10 }}>
              <PlaceholderLine width={30} />
            </Placeholder>
          ) : (
            <Text className="font-bold text-md mb-1 text-left text-gray-700 mt-5">
              Vendido por
            </Text>
          )}

          {loading ? (
            <View className=" flex-row space-x-3 mt-2">
              <View
                className="h-10 w-10 rounded-full bg-gray-300"
                resizeMode="stretch"
              ></View>

              <View>
                <Placeholder Animation={Fade}>
                  <PlaceholderLine width={50} />
                </Placeholder>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Placeholder Animation={Fade}>
                    <PlaceholderLine width={40} />
                  </Placeholder>
                  <Placeholder Animation={Fade}>
                    <PlaceholderLine width={10} />
                  </Placeholder>
                </View>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantMenu", {
                  restaurant: dummyData[0],
                })
              }
              className=" flex-row space-x-3 mt-2"
            >
              <Image
                source={{
                  uri:
                    "https://backend.ruedalo.app/api/avatar/" +
                    order?.commerce.avatar[0],
                }}
                className="h-10 w-10 rounded-full"
                resizeMode="stretch"
              />

              <View>
                <Text>{order?.commerce.registered_name}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    type="star"
                    count={5}
                    defaultRating={14}
                    imageSize={12}
                    showRating={false}
                    isDisabled={false}
                    readonly={true}
                  />
                  <Text
                    style={{
                      ...FONTS.Roboto_400Regular,
                      fontSize: 12,
                      color: COLORS.gray2,
                      marginLeft: 10,
                      lineHeight: 12 * 1.2,
                    }}
                  >
                    ({Number(order?.commerce?.rating)})
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {loading ? (
          <Placeholder Animation={Fade} style={{ marginTop: 10 }}>
            <PlaceholderLine width={30} />
          </Placeholder>
        ) : (
          <Text className="font-bold text-md mb-3 text-left text-gray-700 mt-5">
            Detalles del pedido
          </Text>
        )}

        <View className="bg-gray-200 p-4 w-100 rounded-lg">
          {order?.unit ? (
            <View className="mb-3 flex flex-row space-x-2">
              <Text className="text-orange-600 font-bold">Cantidad:</Text>

              <Text>{order?.unit}</Text>
            </View>
          ) : null}

          <View className="mb-3 flex flex-row space-x-2">
            <Text className="text-orange-600 font-bold">Método de pago:</Text>

            <Text>{order?.paycommerce?.paymethod.name}</Text>
          </View>

          {order?.shiping_amount && (
            <View className="mb-3 flex flex-row space-x-2">
              <Text className="text-orange-600 font-bold">
                Costo del Delivery:
              </Text>

              <Text>${order?.shiping_amount}</Text>
            </View>
          )}

          <View className="mb-3 flex flex-row space-x-2">
            <Text className="text-orange-600 font-bold">Monto Total:</Text>

            <Text>${order?.total}</Text>
          </View>

          <View className="mb-3 flex flex-row space-x-2">
            <Text className="text-orange-600 font-bold">
              Estado de la compra:
            </Text>

            <Text>{statusOrder(order?.status)}</Text>
          </View>
        </View>

        {/* Calificar vendedor */}

        {order?.status === "completed" ? (
          <>
            {order?.rate_to_c > 0 ? (
              <View className="mt-5 mb-12" >
                <Text className="text-orange-500 text-center font-bold text-lg mb-3">
                  Tu Calificación
                </Text>

                <Rating
                  type="star"
                  count={5}
                  startingValue={order?.rate_to_c}
                  imageSize={15}
                  showRating={false}
                  readonly
                />

                <Text className="text-center">{order?.rate_to_c}</Text>
              </View>
            ) : (
              <View className="my-12">
                <Text className="text-orange-500 text-center font-bold text-lg">
                  Califica la compra
                </Text>
                <View>
                  <AirbnbRating
                    count={5}
                    reviews={[
                      "Terrible",
                      "Malo",
                      "Normal",
                      "Bueno",
                      "Excelente",
                    ]}
                    defaultRating={rating}
                    size={20}
                    onFinishRating={setRating}
                  />
                </View>
                <Button
                  title={"Enviar mi calificación"}
                  loading={loadingRating}
                  containerStyle={{ marginBottom: 20, marginTop: 60 }}
                  onPress={() =>
                    sendStarFn(
                      { id: order?.id, rate: rating },
                      user?.token,
                      setLoadingRating
                    )
                  }
                />
              </View>
            )}
          </>
        ) : (
          <Button
            title={`Chatear con el vendedor`}
            containerStyle={{ marginBottom: 20, marginTop: 60 }}
            onPress={() => openWhatsAppChat(order?.commerce.phone)}
            icon={<FontAwesome name="whatsapp" size={20} color="white" />}
          />
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header
        title="Detalles del producto"
        onPress={() => {
          if (goHome) return navigation.navigate("MainLayout");
          navigation.goBack();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderDetails()}
      </ScrollView>
    </SafeAreaView>
  );
}
