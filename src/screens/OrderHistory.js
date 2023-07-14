import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Header, OrderHistoryCategory, Wallet } from "../common/components";
import {
  COLORS,
  FONTS,
  SAFEAREAVIEW,
  history,
  SIZES,
} from "../common/constants";
import { useEffect } from "react";
import { useOrdersContext } from "../context/OrdersContext";
import { useAuthContext } from "../context/AuthContext";
import { useUserContext } from "../context/UserContext";
import { formatDollar } from "../common/functions/formatCurrency";
import dayjs from "dayjs";

export default function OrderHistory() {
  const [category, setCategory] = useState("upcoming");
  const navigation = useNavigation();
  const { orders, getOrders } = useOrdersContext();
  const { user } = useAuthContext();
  const { getTransactionsAppFn, transactions } = useUserContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTransactionsAppFn(setLoading, user?.token)
    getOrders(user?.token, setLoading);
  }, []);

  function renderCategory() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: SIZES.paddingTop_01,
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          style={{
            height: 30,
            width: "30%",
            backgroundColor:
              category == "upcoming" ? COLORS.black2 : COLORS.lightOrange,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => setCategory("upcoming")}
        >
          <Text
            style={{
              ...FONTS.Roboto_700Bold,
              fontSize: 12,
              color: category == "upcoming" ? COLORS.white : COLORS.black2,
            }}
          >
            En proceso
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 30,
            width: "30%",
            backgroundColor:
              category == "pays" ? COLORS.black2 : COLORS.lightOrange,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => setCategory("pays")}
        >
          <Text
            style={{
              ...FONTS.Roboto_700Bold,
              fontSize: 12,
              color: category == "pays" ? COLORS.white : COLORS.black2,
            }}
          >
            Pagos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 30,
            width: "30%",
            backgroundColor:
              category == "history" ? COLORS.orange : COLORS.lightYellow,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => setCategory("history")}
        >
          <Text
            style={{
              ...FONTS.Roboto_700Bold,
              fontSize: 12,
              color: category == "history" ? COLORS.white : COLORS.orange,
            }}
          >
            Historial
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderUpcoming() {
    return orders?.rows?.map((item, index) => {
      return (
        item.status !== "completed" && (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate("Order", { id: item.id })}
          >
            <OrderHistoryCategory item={item} type={"upcoming"} />
          </TouchableOpacity>
        )
      );
    });
  }

  function renderHistory() {
    return orders?.rows?.map((item, index) => {
      return (
        item.status === "completed" && (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate("Order", { id: item.id })}
          >
            <OrderHistoryCategory item={item} type={"completed"} />
          </TouchableOpacity>
        )
      );
    });
  }

  function renderPays() {
    return transactions?.map((item, index) => {
      return (
        <View
            key={index}
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
                Se ha hecho un cobro de{" "}
                {formatDollar(Number(item.amount) / 100)}
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
      );
    });
  }

  const SelectedCatalog = (category) => {
    if (category === "upcoming") return renderUpcoming();
    if (category === "history") return renderHistory();
    if (category === "pays") return renderPays();
  };

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title="Compras realizadas" onPress={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 30,
          flexGrow: 1,
          paddingBottom: 80,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setLoading(true);
              getOrders(user?.token, setLoading);
            }}
          />
        }
      >
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-center">
              Cargando ordenes... espere un momento
            </Text>
          </View>
        ) : (
          <>
            {orders ? (
              <>
                {renderCategory()}
                {SelectedCatalog(category)}
              </>
            ) : (
              <View className="flex-1 items-center justify-center">
                <AntDesign name="frowno" size={24} color={"#2d2d2d"} />
                <Text className="text-center mt-5">
                  De momento no tienes ninguna orden, ¡Haz tu primera compra!
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
