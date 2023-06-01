import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";
import React, { useRef, useState } from "react";
import { InputField, Button } from "../../../common/components";
import { COLORS, SIZES } from "../../../common/constants";

const BoxForm = () => {
  const [selectCaja, setSelectCaja] = useState('');

  return (
    <View
      style={{
        paddingHorizontal: 30,
      }}
    >
      <Text className='font-bold text-2xl mb-6 text-gray-700 mt-5 text-center'>Tipo de caja</Text>
      <View className="justify-around flex-wrap flex-row">

        <TouchableOpacity onPress={() => {
          setSelectCaja('gasolina')
        }} className={`w-32 h-32 items-center justify-center shadow-sm ${selectCaja === 'gasolina' ? 'bg-orange-600' : 'bg-gray-800'} rounded-md`}>
          {/* <MaterialIcons name="local-gas-station" size={35} color="white" /> */}
          <Text className="text-white font-bold text-center">Sincrónico</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => {
          setSelectCaja('diesel')
        }} className={`w-32 h-32 items-center justify-center shadow-sm ${selectCaja === 'diesel' ? 'bg-orange-600' : 'bg-gray-800'} rounded-md`}>
          {/* <MaterialCommunityIcons name="fuel" size={35} color="white" /> */}
          <Text className="text-white font-bold text-center">Automático</Text>
        </TouchableOpacity>
      </View>

      <View className="justify-around flex-wrap flex-row mt-5">
        <TouchableOpacity onPress={() => {
          setSelectCaja('gasolina-e')
        }} className={`w-32 h-32 items-center justify-center shadow-sm ${selectCaja === 'gasolina-e' ? 'bg-orange-600' : 'bg-gray-800'} rounded-md`}>
          {/* <FontAwesome5 name="charging-station" size={35} color="white" /> */}
          <Text className="text-white font-bold text-center">Caja dual</Text>
        </TouchableOpacity>


        <View className={`w-32 h-32`}>
          {/* <MaterialCommunityIcons name="gas-cylinder" size={35} color="white" /> */}
        </View>

      </View>
    </View>
  )
}

export default BoxForm