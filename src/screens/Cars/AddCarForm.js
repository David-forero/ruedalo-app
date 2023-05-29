import React, { useRef, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
// import Carousel from 'react-native-snap-carousel-v4'
import { useNavigation } from "@react-navigation/native";
import { Header, InputField, Button } from "../../common/components";
import { COLORS, FONTS, SAFEAREAVIEW, SIZES } from "../../common/constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";
import Modal from "react-native-modal";

export default function AddCarForm() {
    const navigation = useNavigation();
    const [marca, setMarca] = useState(null)
    const [selectModel, setSelectModel] = useState(null);
    const [yearCar, setYearCar] = useState(null);
    const [combustible, setCombustible] = useState(null);
    const [selectAceite, setSelectAceite] = useState(null);
    const [selectCaja, setSelectCaja] = useState(null);
    const [showModal, setShowModal] = useState(false);


    function ConfimModal() {
        return (
            <Modal
                isVisible={showModal}
                onBackdropPress={setShowModal}
                hideModalContentWhileAnimating={true}
                backdropTransitionOutTiming={0}
                style={{ margin: 0 }}
                animationIn="zoomIn"
                animationOut="zoomOut"
            >
                <View
                    style={{
                        width: SIZES.width - 60,
                        backgroundColor: COLORS.white,
                        marginHorizontal: 30,
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        paddingVertical: 34,
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            ...FONTS.Roboto_700Bold,
                            fontSize: 16,
                            marginBottom: 19,
                        }}
                    >
                        Diagnóstico del Vehículo
                    </Text>

                    <Text
                        style={{
                            textAlign: "center",
                            ...FONTS.Roboto_400Regular,
                            fontSize: 12,
                            marginBottom: 30
                        }}
                    >
                        ¿Desea recibir notificaciones y sugerencias sobre el funcionamiento de tu vehículo?
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 130,
                                height: 40,
                                backgroundColor: COLORS.lightRed,
                                borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                marginHorizontal: 7.5,
                            }}
                            onPress={() => {
                                setShowModal(false);
                                navigation.navigate('CreateCardSuccess')
                            }}
                        >
                            <Text
                                style={{
                                    color: COLORS.white,
                                    ...FONTS.Roboto_700Bold,
                                    fontSize: 16,
                                    color: COLORS.red,
                                }}
                            >
                                Quizás luego
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: 130,
                                height: 40,
                                backgroundColor: COLORS.black2,
                                borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                marginHorizontal: 7.5,
                            }}
                            onPress={() => {
                                setShowModal(false);
                                navigation.navigate('CreateCardSuccess')
                            }}
                        >
                            <Text
                                style={{
                                    color: COLORS.white,
                                    ...FONTS.Roboto_700Bold,
                                    fontSize: 16,
                                }}
                            >
                                Seguro
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    function renderContent() {
        return (
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    // alignItems: "center",
                    paddingHorizontal: 30,
                    paddingVertical: SIZES.paddingVertical,
                }}
            >

                <Text className='font-bold text-md mb-3 text-left text-gray-700'>Marca del coche</Text>
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
                    }>
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

                <Text className='font-bold text-md mb-3 text-left text-gray-700'>Tipo de combustible</Text>
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
                    selectedValue={combustible}
                    onValueChange={(itemValue, itemIndex) =>
                        setCombustible(itemValue)
                    }>
                    <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Gasolina" value="ve" />
                    <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Gasolina Gas" value="co" />
                    <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Diesel" value="ec" />
                    <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Eléctrico" value="pe" />
                    <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Gas" value="ch" />
                </Picker>

                <Text className='font-bold text-md mb-3 text-left text-gray-700'>Tipo de caja</Text>
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
                    selectedValue={selectCaja}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectCaja(itemValue)
                    }>
                    <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Sincrónico" value="ve" />
                    <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Automático" value="co" />
                    <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Caja dual" value="ec" />
                </Picker>

                <Text className='font-bold text-md mb-3 text-left text-gray-700'>Tipo de aceite</Text>
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
                    selectedValue={selectAceite}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectAceite(itemValue)
                    }>
                    <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Mineral" value="ve" />
                    <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Semi-sintético" value="co" />
                    <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="Sintético" value="ec" />
                </Picker>


                <Text className='font-bold text-md mb-3 text-left text-gray-700'>Kilometraje</Text>
                <InputField
                    // placeholder="Kilometraje"
                    contaynerStyle={{ marginBottom: 13 }}
                    keyboardType="numeric"
                />

                <Text className='font-bold text-md mb-3 text-left text-gray-700'>Último cambio de aceite"</Text>
                <InputField
                    // placeholder="Último cambio de aceite"
                    contaynerStyle={{ marginBottom: 13 }}
                    keyboardType="numeric"
                />

                <Text className='font-bold text-md mb-3 text-left text-gray-700'>Último cambio de neumáticos</Text>
                <InputField
                    // placeholder="Último cambio de neumáticos"
                    contaynerStyle={{ marginBottom: 13 }}
                    keyboardType="numeric"
                />

                <Text className='font-bold text-md mb-3 text-left text-gray-700'>Último cambio de batería</Text>
                <InputField
                    // placeholder="Último cambio de batería"
                    contaynerStyle={{ marginBottom: 13 }}
                    keyboardType="numeric"
                />



                <Button
                    title="Agregar Vehiculo"
                    containerStyle={{
                        backgroundColor: COLORS.black2,
                        marginBottom: 38,
                        marginTop: 20
                    }}
                    onPress={() => setShowModal(!false)}
                />

            </KeyboardAwareScrollView>
        );
    }
    return (
        // <View style={styles.container}>
        //     <Carousel
        //         data={[{ id: 1 }, { id: 2 }, { id: 3 }]} // Datos de los items del carousel
        //         renderItem={() => (
        //             <Text>Hello</Text>
        //         )}
        //         sliderWidth={Dimensions.get('window').width}
        //         itemWidth={Dimensions.get('window').width}
        //         layout="default"
        //     />
        // </View>

        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <Header title="Registro del vehículo" onPress={() => navigation.goBack()} />
            <ScrollView className="mt-10">
                {renderContent()}
            </ScrollView>
            {<ConfimModal />}
        </SafeAreaView>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });