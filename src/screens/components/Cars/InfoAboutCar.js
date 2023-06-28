import { Text, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import { InputField } from "../../../common/components";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "../../../common/constants";
import dayjs from "dayjs";

const InfoAboutCar = ({ setKilometraje, setDateAceite, setDateCauchos, dateCauchos, dateAceite, kilometraje, setDateBateria, dateBateria }) => {
  const [showAceite, setShowAceite] = useState(false);
  const [showNeumatico, setShowNeumatico] = useState(false);
  const [showBateria, setShowBateria] = useState(false);

  return (
    <KeyboardAwareScrollView
      style={{
        paddingHorizontal: 30,
        paddingTop: 10,
      }}
    >
      <Text className="font-bold text-md mb-3 text-left text-gray-700">
        Kilometraje actual del vehículo
      </Text>
      <InputField
        placeholder="Coloque el Kilometraje acá"
        contaynerStyle={{ marginBottom: 13 }}
        keyboardType="numeric"
        onChangeText={setKilometraje}
        value={kilometraje}
      />

      <Text className="font-bold text-md mb-3 text-left text-gray-700">
        Último cambio de aceite
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
            setDateAceite(selectedValue)
          }}
        />
      )}

      <Text className="font-bold text-md mb-3 text-left text-gray-700">
        Último cambio de neumáticos
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

      <Text className="font-bold text-md mb-3 text-left text-gray-700">
        Último cambio de batería
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
    </KeyboardAwareScrollView>
  );
};

export default InfoAboutCar;
