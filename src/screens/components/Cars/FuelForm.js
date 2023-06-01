import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";
import React, { useRef, useState } from "react";
import { InputField, Button } from "../../../common/components";
import { COLORS, SIZES } from "../../../common/constants";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const FuelForm = () => {
  const [combustible, setCombustible] = useState('');

  return (
    <View>
      <Text className='font-bold text-2xl mb-6 text-gray-700 mt-5 text-center'>Tipo de combustible</Text>
      <View className="justify-around flex-wrap flex-row">

        <TouchableOpacity onPress={() => {
          setCombustible('gasolina')
        }} className={`w-32 h-32 items-center justify-center shadow-sm ${combustible === 'gasolina' ? 'bg-orange-600' : 'bg-gray-800'} rounded-md`}>
          <MaterialIcons name="local-gas-station" size={35} color="white" />
          <Text className="text-white font-bold text-center mt-2">Gasolina</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => {
          setCombustible('diesel')
        }} className={`w-32 h-32 items-center justify-center shadow-sm ${combustible === 'diesel' ? 'bg-orange-600' : 'bg-gray-800'} rounded-md`}>
          <MaterialCommunityIcons name="fuel" size={35} color="white" />
          <Text className="text-white font-bold text-center mt-2">Diesel</Text>
        </TouchableOpacity>
      </View>

      <View className="justify-around flex-wrap flex-row mt-5">
        <TouchableOpacity onPress={() => {
          setCombustible('gasolina-e')
        }} className={`w-32 h-32 items-center justify-center shadow-sm ${combustible === 'gasolina-e' ? 'bg-orange-600' : 'bg-gray-800'} rounded-md`}>
          <FontAwesome5 name="charging-station" size={35} color="white" />
          <Text className="text-white font-bold text-center mt-2">Gasolina Eléctrico</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => {
          setCombustible('gas')
        }} className={`w-32 h-32 items-center justify-center shadow-sm ${combustible === 'gas' ? 'bg-orange-600' : 'bg-gray-800'} rounded-md`}>
          <MaterialCommunityIcons name="gas-cylinder" size={35} color="white" />
          <Text className="text-white font-bold text-center mt-2">Gas</Text>
        </TouchableOpacity>

      </View>

      <View className="justify-around flex-wrap flex-row mt-5">
        <TouchableOpacity onPress={() => {
          setCombustible('elect')
        }} className={`w-32 h-32 items-center justify-center shadow-sm ${combustible === 'elect' ? 'bg-orange-600' : 'bg-gray-800'} rounded-md`}>
          <MaterialCommunityIcons name="car-electric" size={35} color="white" />
          <Text className="text-white font-bold text-center mt-2">Eléctrico</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => {
          setCombustible('gasolina-g')
        }} className={`w-32 h-32 items-center justify-center shadow-sm ${combustible === 'gasolina-g' ? 'bg-orange-600' : 'bg-gray-800'} rounded-md`}>
          <MaterialIcons name="local-gas-station" size={35} color="white" />
          <Text className="text-white font-bold text-center mt-2">Gasolina Gas</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default FuelForm