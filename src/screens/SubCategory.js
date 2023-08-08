import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import categoriesIcons from "../assets/icons/categories";

import { COLORS, SAFEAREAVIEW } from "../common/constants";
import { Header } from "../common/components";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useStoreContext } from "../context/StoreContext";
import { ActivityIndicator } from "react-native";

export default function SubCategory() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { id, name, type } = route.params;
  const { user } = useAuthContext();
  const { getCategoryFn, subCategory } = useStoreContext();
  const size = (Dimensions.get("window").width / 2) * 0.75;
  useEffect(() => {
    setLoading(true);
    getCategoryFn(id, user?.token, setLoading);
  }, []);

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title={name} onPress={() => navigation.goBack()} />

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color={COLORS.orange} size={"large"} />
        </View>
      ) : (
        <FlatList
          className="mt-10"
          data={subCategory}
          renderItem={({ item }) => {
            if (item.id === "0") {
              return (
                <View
                  style={{ width: size, height: size }}
                  className="flex-1 opacity-0"
                />
              );
            }
            return (
              <TouchableOpacity
                className="flex-1"
                onPress={() =>
                  navigation.navigate("ListProducts", {
                    titleHeader: item?.name,
                    idSubcategory: item.id,
                    isProduct: type == "product" ? true : false,
                  })
                }
              >
                {/* <Icon name={item.iconName} size={50} color="#000" /> */}
                <View
                  style={{ width: size, height: size }}
                  className="flex-1 items-center justify-center text-center mx-5 my-4 p-5 bg-gray-200 rounded-lg"
                >
                  <Image
                    source={categoriesIcons[item.icon ? item.icon : "notImage"]}
                    style={{
                      height: 50,
                      width: "100%",
                    }}
                    resizeMode="contain"
                  />
                  <Text className="text-center text-xs font-bold text-gray-700 mt-5">
                    {item?.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      )}
    </SafeAreaView>
  );
}
