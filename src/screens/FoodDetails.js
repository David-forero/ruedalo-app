import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

import { Header, Button, CustomImageCarousal } from "../common/components";
import { COLORS, FONTS, SAFEAREAVIEW } from "../common/constants";
import { Picker } from "@react-native-picker/picker";
import { Rating } from "react-native-ratings";
import { useEffect } from "react";
import { useStoreContext } from "../context/StoreContext";
import { useAuthContext } from "../context/AuthContext";
import { Fade, Placeholder, PlaceholderLine } from "rn-placeholder";

export default function FoodDetails() {
  const navigation = useNavigation();
  const { product, getProductFn } = useStoreContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const [selectAcount, setSelectAcount] = useState(1);
  const { id, commerceGoBack } = route.params;

  const [amount, setAmount] = useState(null);

  useEffect(() => {
    setLoading(true);
    getProductFn(id, user?.token, setLoading);
  }, [id]);

  useEffect(() => {
    setAmount(product?.price);
  }, [product?.price]);

  function renderDetails() {
    return (
      <>
        {loading ? (
          <View style={{marginHorizontal: 30}}>
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
          </View>
        ) : (
          <CustomImageCarousal data={product?.images} />
        )}
        <View
          style={{
            marginHorizontal: 30,
            // marginBottom: 20,
          }}
        >
          <View>
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
                {product?.title}
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
                {product?.description}
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
                ${product?.price}
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
                    id: product?.commerce.id,
                    typeCommerce: "product",
                  })
                }
                className=" flex-row space-x-3 mt-2"
              >
                <Image
                  source={{
                    uri:
                      "https://backend.dev.ruedalo.app/api/avatar/" +
                      product?.commerce.avatar[0],
                  }}
                  className="h-10 w-10 rounded-full"
                  resizeMode="stretch"
                />

                <View>
                  <Text>{product?.commerce.registered_name}</Text>
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
                      startingValue={product?.commerce.rating}
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
                      ({product?.commerce.rating})
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {loading ? (
            <View className="mt-10">
              <Placeholder Animation={Fade}>
                <PlaceholderLine width={40} />
              </Placeholder>
            </View>
          ) : (
            <View className="mt-10">
              <Text className="font-bold text-md mb-3 text-left text-gray-700">
                Cantidad ({product?.stock} Disponibles)
              </Text>

              <Picker
                style={{
                  width: "100%",
                  height: 10,
                  backgroundColor: COLORS.lightGray,
                  borderRadius: 10,
                  alignItems: "center",
                  flexDirection: "row",
                  marginBottom: 30,
                }}
                mode="dropdown"
                selectedValue={selectAcount}
                onValueChange={(itemValue, itemIndex) => {
                  setAmount(Number(itemValue) * Number(product?.price));
                  setSelectAcount(itemValue);
                }}
              >
                <Picker.Item
                  style={{ color: COLORS.gray2, marginLeft: 10 }}
                  label="1 Unidad"
                  value="1"
                />
                <Picker.Item
                  style={{ color: COLORS.gray2, marginLeft: 10 }}
                  label="2 Unidades"
                  value="2"
                />
                <Picker.Item
                  style={{ color: COLORS.gray2, marginLeft: 10 }}
                  label="3 Unidades"
                  value="3"
                />
                <Picker.Item
                  style={{ color: COLORS.gray2, marginLeft: 10 }}
                  label="4 Unidades"
                  value="4s"
                />
                <Picker.Item
                  style={{ color: COLORS.gray2, marginLeft: 10 }}
                  label="5 Unidades"
                  value="5"
                />
                <Picker.Item
                  style={{ color: COLORS.gray2, marginLeft: 10 }}
                  label="6 Unidades"
                  value="6"
                />
                <Picker.Item
                  style={{ color: COLORS.gray2, marginLeft: 10 }}
                  label="7 Unidades"
                  value="7"
                />
                <Picker.Item
                  style={{ color: COLORS.gray2, marginLeft: 10 }}
                  label="8 Unidades"
                  value="8"
                />
              </Picker>
            </View>
          )}

          <Button
            title={loading ? "Cargando..." : `Comprar por $${amount}`}
            containerStyle={{ marginBottom: 20, marginTop: 60 }}
            onPress={() => {
              navigation.navigate("PaymentMethodOne", {
                amount: Number(product?.price),
                product,
                unit: selectAcount,
              });
            }}
          />
        </View>
      </>
    );
  }

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header
        title="Detalles del producto"
        onPress={() => {
          if (commerceGoBack === true) {
            return navigation.navigate("RestaurantMenu", {
              id: product?.commerce.id,
              typeCommerce: "product",
            });
          }
          navigation.goBack();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderDetails()}
      </ScrollView>
    </SafeAreaView>
  );
}
