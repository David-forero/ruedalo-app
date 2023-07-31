import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, FlatList } from "react-native";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { useMyCarsContext } from "../../../context/MyCarsContext";

const BoxForm = () => {
  const { getBoxesFn, boxes, setSelectCaja, selectCaja } = useMyCarsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    getBoxesFn(user?.token);
  }, []);

  return (
    <View>
      <Text className='font-bold text-2xl mb-6 text-gray-700 mt-5 text-center'>Tipo de caja</Text>

      <View className="justify-between items-center">
         <FlatList
          className=""
          data={boxes}
          renderItem={({ item }) => (
            <TouchableOpacity
            key={item.id}
              onPress={() => {
                setSelectCaja(item.id);
              }}
              className={`w-32 h-32 items-center m-5 justify-center shadow-sm ${
                selectCaja === item.id ? "bg-orange-600" : "bg-gray-800"
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
  )
}

export default BoxForm