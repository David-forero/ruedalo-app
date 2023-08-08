import { Text, ScrollView, View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../../common/constants";
import { useMyCarsContext } from "../../../context/MyCarsContext";
import { Dropdown } from "react-native-element-dropdown";
import { useAuthContext } from "../../../context/AuthContext";
import { SelectList } from "react-native-dropdown-select-list";

const CarForm = ({
  setSelectedBrand,
  setSelectedModel,
  setSelectedYear,
  selectedYear,
  selectedModel,
  selectedBrand,
  setSelectedTrim,
  selectedTrim,
  setMyYear,
  setMyModels,
  setMyMakes,
  setMyTrims,
}) => {
  const {
    models,
    makes,
    trims,
    getModelsFn,
    getMakesFn,
    getYearsFn,
    getTrimsFn,
  } = useMyCarsContext();
  const { user } = useAuthContext();
  const [isFocusYear, setIsFocusYear] = useState(false);
  const [isFocusMake, setIsFocusMake] = useState(false);
  const [isFocusModel, setIsFocusModel] = useState(false);
  const [isFocusTrim, setIsFocusTrim] = useState(false);

  useEffect(() => {
    getMakesFn(user?.token);
    getYearsFn(user?.token);
  }, []);

  return (
    <ScrollView
      style={{
        paddingHorizontal: 30,
        height: "80%",
      }}
    >
      <Text className="font-bold text-md mb-3 text-left text-gray-700">
        Año del vehículo
      </Text>
      <Dropdown
        style={[styles.dropdown, isFocusYear && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={[{ label: "2020", value: "2020" }]}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocusYear ? "Selecciona el año" : "..."}
        searchPlaceholder="Buscar el año de tu vehículo..."
        value={selectedYear}
        onFocus={() => setIsFocusYear(true)}
        onBlur={() => setIsFocusYear(false)}
        onChange={(item) => {
          getMakesFn(item, user?.token);
          setMyYear(item.value);
          setSelectedYear(item.value);
          setIsFocusYear(false);
        }}
      />

      <Text className="font-bold text-md mb-3 text-left text-gray-700 mt-5">
        Marca del vehículo
      </Text>
      <Dropdown
        style={[styles.dropdown, isFocusMake && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={makes || []}
        disable={!selectedYear || !makes}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocusMake ? "Selecciona la marca" : "..."}
        searchPlaceholder="Buscar la marca de tu vehículo..."
        value={selectedBrand}
        onFocus={() => setIsFocusMake(true)}
        onBlur={() => setIsFocusMake(false)}
        onChange={(item) => {
          getModelsFn(item, user?.token, selectedYear);
          setSelectedBrand(item.value);
          setMyMakes(item);

          setIsFocusMake(false);
        }}
      />

      <Text className="font-bold text-md mb-3 text-left text-gray-700 mt-5">
        Modelo
      </Text>

      <Dropdown
        style={[styles.dropdown, isFocusModel && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={models || []}
        disable={!selectedBrand || !models}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocusModel ? "Selecciona el modelo" : "..."}
        searchPlaceholder="Buscar el modelo de tu vehículo..."
        value={selectedModel}
        onFocus={() => setIsFocusModel(true)}
        onBlur={() => setIsFocusModel(false)}
        onChange={(item) => {
          getTrimsFn(selectedYear, item, selectedBrand, user?.token);
          setSelectedModel(item.value);
          setMyModels(item);
          setIsFocusModel(false);
        }}
      />

      {/* <Text className="font-bold text-md mb-3 text-left text-gray-700 mt-5">
        Ajuste automovil (Opcional)
      </Text>
      <Dropdown
        style={[styles.dropdown, isFocusTrim && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={trims || []}
        disable={!trims || !selectedModel}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocusTrim ? "Selecciona el ajuste" : "..."}
        searchPlaceholder="Buscar el ajuste de tu vehículo..."
        value={selectedTrim}
        onFocus={() => setIsFocusTrim(true)}
        onBlur={() => setIsFocusTrim(false)}
        onChange={(item) => {
          getTrimsFn(selectedYear, item, selectedBrand, user?.token);
          setMyTrims(item);
          setSelectedTrim(item.value);
          setIsFocusTrim(false);
        }}
      /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    backgroundColor: '#F4F4F5',
    borderRadius: 10,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default CarForm;
