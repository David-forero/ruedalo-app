import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";
import React, { useRef, useState } from "react";
import { InputField, Button } from "../../../common/components";
import { COLORS, SIZES } from "../../../common/constants";
const OilForm = () => {
  const [selectAceite, setSelectAceite] = useState(null);


  return (
    <View
      style={{
        paddingHorizontal: 30,
      }}
    >
      <Text className='font-bold text-2xl mb-6 text-gray-700 mt-5 text-center'>Tipo de Aceite</Text>
      <View className="justify-around flex-wrap flex-row">

        <TouchableOpacity onPress={() => {
          setSelectAceite('gasolina')
        }} className={`w-32 h-32 items-center justify-center shadow-sm ${selectAceite === 'gasolina' ? 'bg-orange-600' : 'bg-gray-800'} rounded-md`}>
          {/* <MaterialIcons name="local-gas-station" size={35} color="white" /> */}
          <Text className="text-white font-bold text-center">Mineral</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => {
          setSelectAceite('diesel')
        }} className={`w-32 h-32 items-center justify-center shadow-sm ${selectAceite === 'diesel' ? 'bg-orange-600' : 'bg-gray-800'} rounded-md`}>
          {/* <MaterialCommunityIcons name="fuel" size={35} color="white" /> */}
          <Text className="text-white font-bold text-center">Semi-sintético</Text>
        </TouchableOpacity>
      </View>

      <View className="justify-around flex-wrap flex-row mt-5">
        <TouchableOpacity onPress={() => {
          setSelectAceite('gasolina-e')
        }} className={`w-32 h-32 items-center justify-center shadow-sm ${selectAceite === 'gasolina-e' ? 'bg-orange-600' : 'bg-gray-800'} rounded-md`}>
          {/* <FontAwesome5 name="charging-station" size={35} color="white" /> */}
          <Text className="text-white font-bold text-center">Sintético</Text>
        </TouchableOpacity>


        <View className={`w-32 h-32`}>
          {/* <MaterialCommunityIcons name="gas-cylinder" size={35} color="white" /> */}
        </View>

      </View>
    </View>
  )
}

export default OilForm