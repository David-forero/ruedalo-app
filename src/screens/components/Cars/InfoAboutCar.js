import { Text, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useRef, useState } from "react";
import { InputField } from "../../../common/components";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "../../../common/constants";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useMyCarsContext } from "../../../context/MyCarsContext";

const InfoAboutCar = ({ values, handleChange, handleBlur, setFieldValue, setFullData }) => {
  const [showAceite, setShowAceite] = useState(false);
  const [showNeumatico, setShowNeumatico] = useState(false);
  const [showBateria, setShowBateria] = useState(false);

  useEffect(() => {
    async function init() {
      console.log(values);
      await setFullData(values);
    }
    init();
  }, [values]);

  return (
    <KeyboardAwareScrollView
      style={{
        paddingHorizontal: 30,
        paddingTop: 10,
      }}
    >
      <Text className="font-bold text-md mb-3 text-left text-gray-700">
        Kilometraje
      </Text>
      <InputField
        placeholder="Kilometraje"
        contaynerStyle={{ marginBottom: 13 }}
        keyboardType="numeric"
        onChangeText={handleChange("kilometraje")}
        onBlur={handleBlur("kilometraje")}
        value={values.kilometraje}
      />

      <Text className="font-bold text-md mb-3 text-left text-gray-700">
        Último cambio de aceite
      </Text>
      <TouchableOpacity onPress={() => setShowAceite(true)}>
        <InputField
          editable={false}
          value={dayjs(values.aceite).format("DD/MM/YYYY")}
          contaynerStyle={{ marginBottom: 13 }}
        />
      </TouchableOpacity>

      {showAceite && (
        <DateTimePicker
          mode="date"
          // display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          value={values.aceite}
          maximumDate={new Date(2023, 10, 20)}
          locale="es-ES"
          positiveButton={{ label: "Confirmar", textColor: "black" }}
          negativeButton={{ label: "Cancelar", textColor: COLORS.orange }}
          positiveButtonLabel="Confirmar"
          negativeButtonLabel="Cancelar"
          onChange={(e, selectedValue) => {
            setFieldValue("aceite", selectedValue);
            setShowAceite(false);
          }}
        />
      )}

      <Text className="font-bold text-md mb-3 text-left text-gray-700">
        Último cambio de neumáticos
      </Text>
      <TouchableOpacity onPress={() => setShowNeumatico(true)}>
        <InputField
          editable={false}
          value={dayjs(values.neumaticos).format("DD/MM/YYYY")}
          contaynerStyle={{ marginBottom: 13 }}
        />
      </TouchableOpacity>
      {showNeumatico && (
        <DateTimePicker
          mode="date"
          // display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          value={values.neumaticos}
          maximumDate={new Date(2023, 10, 20)}
          locale="es-ES"
          positiveButton={{ label: "Confirmar", textColor: "black" }}
          negativeButton={{ label: "Cancelar", textColor: COLORS.orange }}
          positiveButtonLabel="Confirmar"
          negativeButtonLabel="Cancelar"
          onChange={(e, selectedValue) => {
            setFieldValue("neumaticos", selectedValue);
            setShowNeumatico(false);
          }}
        />
      )}

      <Text className="font-bold text-md mb-3 text-left text-gray-700">
        Último cambio de batería
      </Text>
      <TouchableOpacity onPress={() => setShowBateria(true)}>
        <InputField
          editable={false}
          value={dayjs(values.bateria).format("DD/MM/YYYY")}
          contaynerStyle={{ marginBottom: 13 }}
        />
      </TouchableOpacity>
      {showBateria && (
        <DateTimePicker
          mode="date"
          // display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          value={values.bateria}
          maximumDate={new Date(2023, 10, 20)}
          locale="es-ES"
          positiveButton={{ label: "Confirmar", textColor: "black" }}
          negativeButton={{ label: "Cancelar", textColor: COLORS.orange }}
          positiveButtonLabel="Confirmar"
          negativeButtonLabel="Cancelar"
          onChange={(e, selectedValue) => {
            setFieldValue("bateria", selectedValue);
            setShowBateria(false);
          }}
        />
      )}
    </KeyboardAwareScrollView>
  );
};

export default InfoAboutCar;
