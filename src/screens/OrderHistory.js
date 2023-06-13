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
import { Header, OrderHistoryCategory } from "../common/components";
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

export default function OrderHistory() {
  const [category, setCategory] = useState("upcoming");
  const navigation = useNavigation();
  const { orders, getOrders } = useOrdersContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
            height: 50,
            width: "48%",
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
              fontSize: 16,
              color: category == "upcoming" ? COLORS.white : COLORS.black2,
            }}
          >
            En proceso
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 50,
            width: "48%",
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
              fontSize: 16,
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
    return orders.rows.map((item, index) => {
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
    return orders.rows.map((item, index) => {
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

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title="Compras realizadas" onPress={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 30,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => {
            setLoading(true);
            getOrders(user?.token, setLoading);
          }} />
        }
      >
        {loading ? (
          <Text>Cargando...</Text>
        ) : (
          <>
            {orders ? (
              <>
                {renderCategory()}
                {category === "upcoming" ? renderUpcoming() : renderHistory()}
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
