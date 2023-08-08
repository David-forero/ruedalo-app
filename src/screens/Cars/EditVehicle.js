import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SAFEAREAVIEW } from "../../common/constants";
import { Button, Header, InputField } from "../../common/components";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { useMyCarsContext } from "../../context/MyCarsContext";
import { useAuthContext } from "../../context/AuthContext";

export default function EditVehicle() {
    const {updateCarFn} = useMyCarsContext();
    const {user} = useAuthContext();
  const route = useRoute();
  const { myVehicle } = route.params;
  const navigation = useNavigation();
  const [showAceite, setShowAceite] = useState(false);
  const [showNeumatico, setShowNeumatico] = useState(false);
  const [showBateria, setShowBateria] = useState(false);

  const [kilometraje, setKilometraje] = useState(null);
  const [dateAceite, setDateAceite] = useState(new Date());
  const [dateCauchos, setDateCauchos] = useState(new Date());
  const [dateBateria, setDateBateria] = useState(new Date());
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setKilometraje(myVehicle.odometro);
    setDateAceite(myVehicle.oil_date);
    setDateBateria(myVehicle.battery_date);
    setDateCauchos(myVehicle.tire_date)
  }, [myVehicle]);

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header
        title={`${myVehicle.make} ${myVehicle.model} ${myVehicle.year}`}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View className="flex-row items-center justify-center mt-5">
          <Image
            source={require("../../assets/icons/mycar.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </View>

        <View className="flex-row justify-center flex-wrap">
          <View className="items-center flex-row justify-center m-2 space-x-2 bg-gray-700 rounded-full p-2">
            <Text className="text-orange-600 font-bold text-xs">
              Tipo de Gasolina: {myVehicle.fuel.title}
            </Text>
          </View>

          <View className="items-center flex-row justify-center space-x-2 bg-gray-700 rounded-full m-2 p-2">
            <Text className="text-orange-600 font-bold text-xs">
              Tipo de Caja: {myVehicle.box.title}
            </Text>
          </View>

          <View className="items-center flex-row justify-center space-x-2 bg-gray-700 rounded-full m-2 p-2">
            <Text className="text-orange-600 font-bold text-xs">
              Tipo de Aceite: {myVehicle.oil.title}
            </Text>
          </View>
        </View>

        {/* Formulario */}

        <View className="px-4 py-3 w-full">
          <View className="bg-gray-300 rounded-md p-3">
            <Text className="font-bold text-md mb-2 text-gray-800">
              Kilometraje actual del vehículo
            </Text>

            <InputField
              placeholder="Coloque el Kilometraje acá"
              contaynerStyle={{ marginBottom: 13 }}
              keyboardType="numeric"
              onChangeText={setKilometraje}
              value={kilometraje}
            />

            <Text className="font-bold text-gray-800 mb-2">
              Último cambio de aceite:
            </Text>

            <TouchableOpacity onPress={() => setShowAceite(true)}>
              <InputField
                editable={false}
                value={dayjs(dateAceite).format("DD/MM/YYYY")}
                contaynerStyle={{ marginBottom: 13 }}
              />
            </TouchableOpacity>

            {showAceite && (
              <DateTimePicker
                mode="date"
                // display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                value={dateAceite}
                maximumDate={new Date(2023, 10, 20)}
                locale="es-ES"
                positiveButton={{ label: "Confirmar", textColor: "black" }}
                negativeButton={{ label: "Cancelar", textColor: COLORS.orange }}
                positiveButtonLabel="Confirmar"
                negativeButtonLabel="Cancelar"
                onChange={(e, selectedValue) => {
                  setShowAceite(false);
                  setDateAceite(selectedValue);
                }}
              />
            )}

            <Text className="font-bold text-gray-800 mb-2">
              Último cambios de neumáticos:
            </Text>

            <TouchableOpacity onPress={() => setShowNeumatico(true)}>
              <InputField
                editable={false}
                value={dayjs(dateCauchos).format("DD/MM/YYYY")}
                contaynerStyle={{ marginBottom: 13 }}
              />
            </TouchableOpacity>
            {showNeumatico && (
              <DateTimePicker
                mode="date"
                // display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                value={dateCauchos}
                maximumDate={new Date(2023, 10, 20)}
                locale="es-ES"
                positiveButton={{ label: "Confirmar", textColor: "black" }}
                negativeButton={{ label: "Cancelar", textColor: COLORS.orange }}
                positiveButtonLabel="Confirmar"
                negativeButtonLabel="Cancelar"
                onChange={(e, selectedValue) => {
                  setShowNeumatico(false);
                  setDateCauchos(selectedValue);
                }}
              />
            )}

            <Text className="font-bold text-gray-800 mb-2">
              Último cambio de batería:
            </Text>

            <TouchableOpacity onPress={() => setShowBateria(true)}>
              <InputField
                editable={false}
                value={dayjs(dateBateria).format("DD/MM/YYYY")}
                contaynerStyle={{ marginBottom: 13 }}
              />
            </TouchableOpacity>
            {showBateria && (
              <DateTimePicker
                mode="date"
                // display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                value={dateBateria}
                maximumDate={new Date(2023, 10, 20)}
                locale="es-ES"
                positiveButton={{ label: "Confirmar", textColor: "black" }}
                negativeButton={{ label: "Cancelar", textColor: COLORS.orange }}
                positiveButtonLabel="Confirmar"
                negativeButtonLabel="Cancelar"
                onChange={(e, selectedValue) => {
                  setShowBateria(false);
                  setDateBateria(selectedValue);
                }}
              />
            )}

            <Button
            title={'Actualizar Vehículo'}
            loading={loading} 
            onPress={() => updateCarFn({
                id: myVehicle.id,
                odometro: myVehicle.kilometraje,
                battery_date: dateBateria,
                oil_date: dateAceite,
                tire_date: dateCauchos
            }, user?.token, setLoading, navigation)} 
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
