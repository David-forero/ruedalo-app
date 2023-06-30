import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import DashedLine from "react-native-dashed-line";

import {
  Header,
  Cash,
  Bank,
  CheckTwo,
  CheckThree,
  Button,
  InputField,
} from "../common/components";
import { COLORS, FONTS, SAFEAREAVIEW } from "../common/constants";
import { useEffect } from "react";
import { useOrdersContext } from "../context/OrdersContext";
import { useAuthContext } from "../context/AuthContext";

export default function PaymentMethodOne() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedMethod2, setSelectedMethod2] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { amount, product, unit } = route.params;
  const [isDelivery, setIsDelivery] = useState(false);
  const [isAmount, setIsAmount] = useState(false);
  const [cash, setCash] = useState(null);
  const { calculateOrderFn, detailsOrder } = useOrdersContext();
  const { user } = useAuthContext();
  const [loadingCalculate, setLoadingCalculate] = useState(false);

  useEffect(() => {
    setLoadingCalculate(true);

    if (isDelivery) {
      // setTotal(Number(amount) + Number(product?.commerce?.shippings[0]?.price));
      calculateOrderFn(
        amount,
        product?.commerce?.shippings[0]?.price,
        unit,
        isAmount,
        user?.token,
        setLoadingCalculate
      );
    } else {
      calculateOrderFn(
        amount,
        0,
        unit,
        isAmount,
        user?.token,
        setLoadingCalculate
      );
    }
  }, [amount, product, selectedMethod2, selectedMethod, isAmount]);

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title="Métodos de pago" onPress={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 30,
          paddingTop: 44,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text clasName="mb-3 font-bold text-lg">Método de pago</Text>
        <View style={{ marginBottom: 9, marginTop: 5 }}>
          {product?.commerce.paycommerces?.map((item, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 50,
                    borderColor: COLORS.lightGray,
                    borderWidth: 1,
                    marginBottom: 12,
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 13,
                  }}
                  onPress={() => {
                    setSelectedMethod(item.id);
                    if (item.paymethod.name === "Efectivo")
                      return setIsAmount(true);
                    setIsAmount(false);
                    setCash(null);
                  }}
                >
                  {/* {item.icon} */}
                  <Text
                    style={{
                      marginLeft: 10,
                      ...FONTS.Roboto_400Regular,
                      fontSize: 16,
                      textTransform: "capitalize",
                      color: COLORS.black,
                      flex: 1,
                    }}
                  >
                    {item.paymethod.name}
                  </Text>

                  {selectedMethod == item.id ? (
                    <CheckThree />
                  ) : (
                    <View
                      style={{
                        width: 16.5,
                        height: 16.5,
                        backgroundColor: "#F0F1F5",
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    ></View>
                  )}
                </TouchableOpacity>

                {isAmount && item.paymethod.name === "Efectivo" ? (
                  <View>
                    <InputField
                      placeholder="¿Cuanto efectivo pagarás?"
                      value={cash}
                      onChangeText={setCash}
                      keyboardType="numeric"
                    />
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>

        {/* SECTION DELIVERY */}
        <Text clasName="mb-5 font-bold text-lg">Método de entrega</Text>
        <View style={{ marginBottom: 9, marginTop: 5 }}>
          {product?.commerce.shippings?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  width: "100%",
                  height: 50,
                  borderColor: COLORS.lightGray,
                  borderWidth: 1,
                  marginBottom: 12,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 13,
                }}
                onPress={() => {
                  setSelectedMethod2(item.id);
                  if (item.type === "delivery") return setIsDelivery(true);
                  setIsDelivery(false);
                }}
              >
                {/* {item.icon} */}
                <Text
                  style={{
                    marginLeft: 10,
                    ...FONTS.Roboto_400Regular,
                    fontSize: 16,
                    textTransform: "capitalize",
                    color: COLORS.black,
                    flex: 1,
                  }}
                >
                  {item.type}
                </Text>

                {selectedMethod2 == item.id ? (
                  <CheckThree />
                ) : (
                  <View
                    style={{
                      width: 16.5,
                      height: 16.5,
                      backgroundColor: "#F0F1F5",
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View
          style={{
            width: "100%",
            borderWidth: 1,
            borderRadius: 10,
            borderColor: COLORS.lightGray,
            paddingVertical: 19,
            paddingHorizontal: 20,
            marginBottom: 30,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                ...FONTS.Roboto_500Medium,
                fontSize: 14,
                textTransform: "capitalize",
                color: COLORS.black,
              }}
            >
              Precio neto
            </Text>
            <Text
              style={{
                ...FONTS.Roboto_700Bold,
                fontSize: 16,
                color: COLORS.black2,
                marginBottom: 9,
              }}
            >
              ${detailsOrder && detailsOrder?.productprice}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                ...FONTS.Roboto_500Medium,
                fontSize: 14,
                textTransform: "capitalize",
                color: COLORS.black,
              }}
            >
              Comisión del servicio
            </Text>
            <Text
              style={{
                ...FONTS.Roboto_700Bold,
                fontSize: 16,
                color: COLORS.black2,
                marginBottom: 9,
              }}
            >
              ${detailsOrder && detailsOrder?.tax}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                ...FONTS.Roboto_500Medium,
                fontSize: 14,
                color: COLORS.black,
              }}
            >
              IVA
            </Text>
            <Text
              style={{
                ...FONTS.Roboto_700Bold,
                fontSize: 16,
                color: COLORS.black2,
                marginBottom: 9,
              }}
            >
              ${detailsOrder && detailsOrder?.iva}
            </Text>
          </View>

          {isAmount ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  ...FONTS.Roboto_500Medium,
                  fontSize: 14,
                  color: COLORS.black,
                }}
              >
                IGTF
              </Text>
              <Text
                style={{
                  ...FONTS.Roboto_700Bold,
                  fontSize: 16,
                  color: COLORS.black2,
                  marginBottom: 9,
                }}
              >
                ${detailsOrder && detailsOrder?.igtf}
              </Text>
            </View>
          ) : null}

          {isDelivery && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  ...FONTS.Roboto_500Medium,
                  fontSize: 14,
                  color: COLORS.black,
                  textTransform: "capitalize",
                }}
              >
                Delivery
              </Text>
              <Text
                style={{
                  ...FONTS.Roboto_700Bold,
                  fontSize: 14,
                  color: COLORS.black,
                }}
              >
                ${detailsOrder && detailsOrder?.shippingprice}
              </Text>
            </View>
          )}

          <DashedLine
            dashLength={7}
            dashThickness={1}
            dashGap={5}
            dashColor="#C8C8D3"
            style={{ marginTop: 23 }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 23,
            }}
          >
            <Text
              style={{
                ...FONTS.Roboto_500Medium,
                fontSize: 18,
                textTransform: "capitalize",
                color: COLORS.black,
              }}
            >
              Precio total
            </Text>
            <Text
              style={{
                ...FONTS.Roboto_700Bold,
                fontSize: 18,
                textTransform: "capitalize",
                color: COLORS.carrot,
              }}
            >
              ${detailsOrder && detailsOrder?.total}
            </Text>
          </View>
        </View>
        <Button
          title="Proceder al pago"
          valid={selectedMethod && selectedMethod2 && Number(cash) >= detailsOrder?.total}
          onPress={() =>
            navigation.navigate("CreateOrderLoading", {
              amount,
              product,
              unit,
              id_shipping: selectedMethod2,
              id_paycommerce: selectedMethod,
              amount_cash: cash,
            })
          }
        />
        <View className="mb-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
