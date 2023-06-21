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
    CheckThree,
    Button,
  } from "../common/components";
  import { COLORS, FONTS, SAFEAREAVIEW } from "../common/constants";
  import { useEffect } from "react";
  
  export default function PaymentMethodOne() {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();
    const { amount, product, unit } = route.params;
    const [total, setTotal] = useState(0);
  
    useEffect(() => {
        console.log(product);
        setTotal(Number(amount));
    }, [amount, product]);
    
  
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
            {product?.commerce?.paycommerces?.map((item, index) => {
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
                  onPress={() => setSelectedMethod(item.id)}
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
                ${Number(amount).toFixed(2)}
              </Text>
            </View>
  
            <DashedLine
              dashLength={7}
              dashThickness={1}
              dashGap={5}
              dashColor="#C8C8D3"
              style={{ marginTop: 23,}}
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
                ${total.toFixed(2)}
              </Text>
            </View>
          </View>
          <Button
            title="Proceder al pago"
            valid={selectedMethod}
            onPress={() => navigation.navigate("CreateOrderLoading", {amount, product, unit: 1, id_shipping: 0, id_paycommerce: selectedMethod, type: "service"})}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
  