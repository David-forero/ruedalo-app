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

import { Header, Button } from "../common/components";
import { COLORS, FONTS, SAFEAREAVIEW, dummyData } from "../common/constants";
import { Picker } from "@react-native-picker/picker";
import { Rating } from "react-native-ratings";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Fade, Placeholder, PlaceholderLine } from "rn-placeholder";
import { useServicesContext } from "../context/ServicesContext";

export default function ServicesDetails() {
  const navigation = useNavigation();
  const { service, getServiceFn } = useServicesContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { id } = route.params;

  const [amount, setAmount] = useState(null);

  useEffect(() => {
    setLoading(true);
    getServiceFn(id, user?.token, setLoading);
  }, []);

  useEffect(() => {
    setAmount(service?.price);
  }, [service?.price]);

  function renderDetails() {
    return (
      <View
        style={{
          marginHorizontal: 30,
          // marginBottom: 20,
        }}
      >
        <View>
          {loading ? (
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
                uri: "https://backend.dev.ruedalo.app/api/avatar/" + service?.commerce.avatar[0],
              }}
              style={{
                height: 206,
                borderRadius: 14,
                marginBottom: 21,
              }}
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
              {service?.description}
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
                marginBottom: 10,
              }}
            >
              {/* {description} */}
              {service?.description}
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
              ${service?.price}
            </Text>
          </View>

          {loading ? (
            <Placeholder Animation={Fade} style={{ marginTop: 10 }}>
              <PlaceholderLine width={30} />
            </Placeholder>
          ) : (
            <Text className="font-bold text-md mb-1 text-left text-gray-700 mt-5">
              Ofrecido por
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
                  id: service?.commerce.id,
                  typeCommerce: "service"
                })
              }
              className=" flex-row space-x-3 mt-2"
            >
              <Image
                source={{
                  uri:
                    "https://backend.dev.ruedalo.app/api/avatar/" +
                    service?.commerce.avatar[0],
                }}
                className="h-10 w-10 rounded-full"
                resizeMode="stretch"
              />

              <View>
                <Text>{service?.commerce.registered_name}</Text>
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
                    startingValue={service?.commerce.rating}
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
                    ({service?.commerce.rating})
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <Button
          title={loading ? "Cargando..." : `Adquirir servicio por $${amount}`}
          containerStyle={{ marginBottom: 20, marginTop: 60 }}
          onPress={() => {
            navigation.navigate("PaymentMethodTwo", {
              amount: service?.price,
              product: service,
            });
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header
        title="Detalles del servicio"
        onPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderDetails()}
      </ScrollView>
    </SafeAreaView>
  );
}
