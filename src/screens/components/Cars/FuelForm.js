import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import { useMyCarsContext } from "../../../context/MyCarsContext";
import { useAuthContext } from "../../../context/AuthContext";

const FuelForm = () => {
  const { getFuelsFn, fuels, setCombustible, combustible } = useMyCarsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    getFuelsFn(user?.token);
  }, []);

  return (
    <View>
      <Text className="font-bold text-2xl mb-6 text-gray-700 mt-2 text-center">
        Tipo de combustible
      </Text>

      <View className="items-center justify-center">
        <FlatList
          className=""
          data={fuels}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                setCombustible(item.id);
              }}
              className={`w-32 h-32 items-center m-3 justify-center shadow-sm ${
                combustible === item.id ? "bg-orange-600" : "bg-gray-800"
              } rounded-md`}
            >
              {/* <MaterialIcons name="local-gas-station" size={35} color="white" /> */}
              <Text className="text-white font-bold text-center mt-2">
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default FuelForm;
