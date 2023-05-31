import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import Modal from "react-native-modal";
import { Shadow } from "react-native-shadow-2";

import { Header, Remove } from "../common/components";
import { SAFEAREAVIEW, favorite, COLORS, SIZES, FONTS } from "../common/constants";

export default function MyCars() {
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);

    function renderMyCarsList() {
        return (
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 30,
                    flexGrow: 1,
                    paddingVertical: SIZES.paddingVertical,
                }}
                showsVerticalScrollIndicator={false}
            >
                <View className="mb-5" >
                    <Text className="text-gray-900 font-semibold text-2xl text-center">Añade tu vehículo aquí</Text>
                    <Text className="text-gray-700 text-md mt-3 text-center">Esto te permitirá a que nosotros busquemos tiendas y servicios más cercanos para tu vehículo</Text>
                </View>

                <Text className="text-gray-900 font-semibold text-lg mb-3">Tus Vehículos</Text>

                {favorite.map((item, index) => {
                    return (
                        <Shadow
                            startColor={COLORS.shadowStartColor}
                            finalColor={COLORS.shadowFinalColor}
                            distance={COLORS.shadowDistance}
                            key={index}
                            viewStyle={{
                                marginBottom: 30,
                                width: "100%",
                            }}
                        >
                            <TouchableOpacity
                                key={index}
                                style={{
                                    width: "100%",
                                    height: 100,
                                    backgroundColor: COLORS.white,
                                    borderRadius: 5,
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    source={item.image}
                                    style={{
                                        width: 100,
                                        height: "100%",
                                        resizeMode: "cover",
                                        borderTopLeftRadius: 5,
                                        borderBottomLeftRadius: 5,
                                        marginRight: 16,
                                    }}
                                />
                                <View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...FONTS.Roboto_500Medium,
                                                fontSize: 16,
                                                color: COLORS.black,
                                                textTransform: "capitalize",
                                                marginBottom: 2,
                                                lineHeight: 16 * 1.2,
                                            }}
                                            numberOfLines={1}
                                        >
                                            {item.name}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => setShowModal(!false)}
                                            style={{
                                                paddingHorizontal: 15,
                                                paddingVertical: 2,
                                            }}
                                        >
                                            <Remove
                                                width={30}
                                                height={30}
                                                strokeColor="red"
                                                fillColor="red"
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    <View className="flex-row space-x-3" >
                                        <Text
                                            className="font-bold text-gray-700"
                                        >
                                            Tipo de ceite:
                                        </Text>

                                        <Text
                                            className="text-red-950 font-bold"
                                        >
                                            {item.typeAceite}
                                        </Text>
                                    </View>

                                    <View className="flex-row space-x-3" >
                                        <Text
                                            className="font-bold text-gray-700"
                                        >
                                            Combustible:
                                        </Text>

                                        <Text
                                            className="text-green-900 font-bold"
                                        >
                                            {item.combustible}
                                        </Text>
                                    </View>
                                    <View className="flex-row space-x-3" >
                                        <Text
                                            className="font-bold text-gray-700"
                                        >
                                            Caja:
                                        </Text>

                                        <Text
                                            className="text-yellow-600 "
                                        >
                                            {item.caja}
                                        </Text>
                                    </View>

                                  
                                </View>
                            </TouchableOpacity>
                        </Shadow>
                    );
                })}
            </ScrollView>
        );
    }

    function DeleteModal() {
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
                            marginBottom: 35,
                        }}
                    >
                        ¿Estás seguro de eliminar este vehículo?
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
                            onPress={() => setShowModal(false)}
                        >
                            <Text
                                style={{
                                    color: COLORS.white,
                                    ...FONTS.Roboto_700Bold,
                                    fontSize: 16,
                                    color: COLORS.red,
                                }}
                            >
                                No
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

    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <Header title="Mis Vehículos" onPress={() => navigation.goBack()} />
            {renderMyCarsList()}
            {<DeleteModal />}
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.2)',
                    backgroundColor: COLORS.orange,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    borderRadius: 100,
                }}
                onPress={() => navigation.navigate('AddCarForm')}
            >
               <Text className="text-white text-3xl ">+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}