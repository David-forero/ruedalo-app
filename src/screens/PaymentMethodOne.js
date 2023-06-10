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
} from "../common/components";
import { COLORS, FONTS, SAFEAREAVIEW } from "../common/constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect } from "react";

const methods = [
  {
    id: "1",
    method: "Efectivo",
    icon: <Cash />,
  },
  {
    id: "2",
    method: "Transferencia",
    icon: <Bank />,
  },
];

const entrega = [
  {
    id: "3",
    method: "Pick up",
    icon: <FontAwesome5 name="hand-holding" size={20} color={COLORS.orange} />,
  },
  {
    id: "4",
    method: "Delivery",
    icon: <FontAwesome5 name="motorcycle" size={20} color={COLORS.orange} />,
  },
];

export default function PaymentMethodOne() {
  const [selectedMethod, setSelectedMethod] = useState("1");
  const [selectedMethod2, setSelectedMethod2] = useState("1");
  const navigation = useNavigation();
  const route = useRoute();
  const { amount, product } = route.params;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (selectedMethod2 === "4") {
        setTotal(amount + Number(product?.commerce?.shippings[0]?.price))
    }else{
        setTotal(amount);
    }
    
  }, [amount, product, selectedMethod2]);
  

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
        <View style={{ marginBottom: 9 }}>
          {methods.map((item, index) => {
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
                {item.icon}
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
                  {item.method}
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

        <Text clasName="mb-3 font-bold text-lg">Método de entrega</Text>
        <View style={{ marginBottom: 9 }}>
          {entrega.map((item, index) => {
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
                onPress={() => setSelectedMethod2(item.id)}
              >
                {item.icon}
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
                  {item.method}
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
              ${amount}
            </Text>
          </View>

          {selectedMethod2 === "4" && (
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
                  color: COLORS.gray2,
                  textTransform: "capitalize",
                }}
              >
                Delivery
              </Text>
              <Text
                style={{
                  ...FONTS.Roboto_400Regular,
                  fontSize: 14,
                  color: COLORS.gray2,
                }}
              >
                ${product?.commerce?.shippings[0]?.price}
              </Text>
            </View>
          )}

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
              ${total}
            </Text>
          </View>
        </View>
        <Button
          title="Proceder al pago"
          onPress={() => navigation.navigate("OrderSuccessful")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
