import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";
import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

import {
    Header,
    Star,
    Button,
    ItemComponentOne,
    Heading,
} from "../common/components";
import { COLORS, FONTS, SAFEAREAVIEW, dummyData } from "../common/constants";
import { Picker } from "@react-native-picker/picker";
import { Rating } from "react-native-ratings";
import { useEffect } from "react";
import { useStoreContext } from "../context/StoreContext";
import { useAuthContext } from "../context/AuthContext";

export default function FoodDetails() {
    const navigation = useNavigation();
    const {product, getProductFn} = useStoreContext();
    const {user} = useAuthContext();
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const [selectAcount, setSelectAcount] = useState(null);
    const { id } = route.params;

    const [amount, setAmount] = useState(null);
    
    useEffect(() => {
        setLoading(false);
        getProductFn(id, user?.token, setLoading)
        
    }, [])

    useEffect(() => {
        setAmount(product?.price)
    }, [product?.price])
    

    function renderDetails() {
        return (
            <View
                style={{
                    marginHorizontal: 30,
                    // marginBottom: 20,
                }}
            >
                <View>
                    <Image
                        source={{uri: 'https://repuestosya.cobrex.com.ve/api/product/' + product?.image[0]}}
                        style={{
                            height: 206,
                            width: "100%",
                            borderRadius: 14,
                            marginBottom: 21,
                        }}
                        className="shadow-lg"
                        resizeMode="stretch"
                    />
                    <Text
                        style={{
                            marginBottom: 8,
                            ...FONTS.Roboto_500Medium,
                            fontSize: 18,
                            textTransform: "capitalize",
                            color: COLORS.black,
                        }}
                    >
                        {product?.title || 'Cargando...'}
                    </Text>
                    <Text
                        style={{
                            marginBottom: 12,
                            ...FONTS.Roboto_400Regular,
                            fontSize: 14,
                            color: COLORS.gray2,
                            lineHeight: 14 * 1.4,
                            marginBottom: 10,
                        }}
                    >
                        {/* {description} */}
                       {product?.description}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.Roboto_700Bold,
                                fontSize: 20,
                                color: COLORS.carrot,
                            }}
                        >
                            ${product?.price}
                        </Text>
                    </View>

                    <Text className='font-bold text-md mb-1 text-left text-gray-700 mt-5'>Vendido por</Text>

                    <TouchableOpacity onPress={() => navigation.navigate("RestaurantMenu", { restaurant: dummyData[0] })} className=" flex-row space-x-3 mt-2">
                        <Image
                            source={{ uri: 'https://repuestosya.cobrex.com.ve/api/avatar/' + product?.commerce.avatar[0]}}
                            className="h-10 w-10 rounded-full"
                            resizeMode="stretch"
                        />

                        <View>
                            <Text>{product?.commerce.registered_name}</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Rating
                                    type="star"
                                    count={5}
                                    defaultRating={14}
                                    imageSize={12}
                                    showRating={false}
                                    isDisabled={false}
                                    readonly={true}
                                    startingValue={product?.commerce.rating}
                                />
                                <Text
                                    style={{
                                        ...FONTS.Roboto_400Regular,
                                        fontSize: 12,
                                        color: COLORS.gray2,
                                        marginLeft: 10,
                                        lineHeight: 12 * 1.2,
                                    }}
                                >
                                    ({product?.commerce.rating})
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="mt-10">
                    <Text className='font-bold text-md mb-3 text-left text-gray-700'>Cantidad</Text>

                    <Picker
                        style={{
                            width: '100%',
                            height: 10,
                            backgroundColor: COLORS.lightGray,
                            borderRadius: 10,
                            alignItems: "center",
                            flexDirection: "row",
                            marginBottom: 30
                        }}
                        mode="dropdown"
                        selectedValue={selectAcount}
                        onValueChange={(itemValue, itemIndex) => {
                            setAmount(Number(itemValue) * Number(product?.price));
                            setSelectAcount(itemValue)
                        }}
                    >

                        <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="1" value="1" />
                        <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="2" value="2" />
                        <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="3" value="3" />
                    </Picker>
                </View>

                <Button
                    title={loading ? 'Cargando...' : `Comprar por $${amount}` }
                    containerStyle={{ marginBottom: 20, marginTop: 60 }}
                    onPress={() => {
                        navigation.navigate('PaymentMethodOne', {amount, product})
                    }}
                />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <Header title="Detalles del producto" onPress={() => navigation.goBack()} />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {renderDetails()}
            </ScrollView>
        </SafeAreaView>
    );
}
