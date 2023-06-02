import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";
import React, { useRef, useState } from "react";
import { InputField, Button } from "../../../common/components";
import { COLORS, SIZES } from "../../../common/constants";

const CarForm = () => {
    const [marca, setMarca] = useState(null)
    const [selectModel, setSelectModel] = useState(null);
    const [yearCar, setYearCar] = useState(null);

    return (
        <View
            style={{
                paddingHorizontal: 30,
            }}
        >

            <Text className='font-bold text-md mb-3 text-left text-gray-700 mt-5'>Marca del coche</Text>
            <Picker
                style={{
                    width: "100%",
                    height: 50,
                    backgroundColor: COLORS.lightGray,
                    borderRadius: 10,
                    alignItems: "center",
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    marginBottom: 13
                }}
                mode="dropdown"
                selectedValue={marca}
                onValueChange={(itemValue, itemIndex) =>
                    setMarca(itemValue)
                }
            >
                <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Ford" value="ve" />
                <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Renault" value="co" />
                <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Opel" value="ec" />
                <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Toyota" value="pe" />
                <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Chery" value="ch" />
            </Picker>


            <Text className='font-bold text-md mb-3 text-left text-gray-700'>Modelo</Text>
            <Picker
                style={{
                    width: "100%",
                    height: 50,
                    backgroundColor: COLORS.lightGray,
                    borderRadius: 20,
                    alignItems: "center",
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    marginBottom: 13
                }}
                mode="dropdown"
                selectedValue={selectModel}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectModel(itemValue)
                }>
                <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Modelo 1" value="ve" />
                <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Modelo 2" value="co" />
                <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Modelo 3" value="ec" />
                <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Modelo 4" value="pe" />
                <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Modelo 5" value="ch" />
            </Picker>

            <Text className='font-bold text-md mb-3 text-left text-gray-700'>Año</Text>
            <Picker
                style={{
                    width: "100%",
                    height: 50,
                    backgroundColor: COLORS.lightGray,
                    borderRadius: 20,
                    alignItems: "center",
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    marginBottom: 13
                }}
                mode="dropdown"
                selectedValue={yearCar}
                onValueChange={(itemValue, itemIndex) =>
                    setYearCar(itemValue)
                }>
                <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="2008" value="ve" />
                <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="2009" value="co" />
                <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="2010" value="ec" />
                <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="2011" value="pe" />
                <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="2012" value="ch" />
            </Picker>


            {/* <Button
                title="Agregar Vehiculo"
                containerStyle={{
                    backgroundColor: COLORS.black2,
                    marginBottom: 38,
                    marginTop: 20
                }}
                onPress={() => setShowModal(!false)}
            /> */}

        </View>

    )
}

export default CarForm