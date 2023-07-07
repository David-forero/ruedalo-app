import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { COLORS, FONTS, SAFEAREAVIEW } from "../common/constants";
import { Header, NotificationCategory, Wallet } from "../common/components";
import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import dayjs from "dayjs";
import { formatDollar } from "../common/functions/formatCurrency";

export default function TransactionsView() {
  const navigation = useNavigation();
  const { getTransactionsAppFn, transactions } = useUserContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    getTransactionsAppFn(setLoading, user?.token);
  }, []);


  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title="Transacciones" onPress={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 30,
          flexGrow: 1,
          paddingTop: 37,
          paddingBottom: 80,
        }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={async () => {
              setLoading(true);
              getTransactionsAppFn(setLoading, user?.token);
            }}
          />
        }
      >
        {transactions
          ? transactions.map((item) => (
              <View
                key={item}
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  borderColor: COLORS.lightGray,
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingHorizontal: 16,
                  paddingVertical: 19,
                }}
              >
                <Wallet />
                <View style={{ marginLeft: 15 }}>
                  <Text
                    style={{
                      ...FONTS.Roboto_700Bold,
                      fontSize: 16,
                      color: COLORS.black,
                      textTransform: "capitalize",
                      marginBottom: 3,
                    }}
                  >
                    {item.description}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.Roboto_400Regular,
                      fontSize: 14,
                      color: COLORS.gray2,
                    }}
                  >
                    Se ha hecho un cobro de {formatDollar(Number(item.amount) / 100)}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.Roboto_400Regular,
                      fontSize: 14,
                      color: COLORS.gray2,
                    }}
                  >
                   {dayjs(item.createdAt).format("DD/MM/YYYY")}
                  </Text>
                </View>
              </View>
            ))
          : (
            <View className="flex-1 items-center justify-center mb-24">
            <Text>De momento no hay transacciones</Text>
          </View>
          )}
      </ScrollView>
    </SafeAreaView>
  );
}
