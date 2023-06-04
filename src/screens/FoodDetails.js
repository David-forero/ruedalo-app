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
import { showMessage } from "react-native-flash-message";

import {
    Header,
    Star,
    Button,
    Heart,
    Add,
    ItemComponentOne,
    Heading,
} from "../common/components";
import { COLORS, FONTS, SAFEAREAVIEW, SIZES } from "../common/constants";
import { Picker } from "@react-native-picker/picker";

export default function FoodDetails() {
    const navigation = useNavigation();
    const route = useRoute();
    const [marca, setMarca] = useState(null)

    const {  image, name, price } = route.params;

    function renderDetails() {
        return (
            <View
                style={{
                    marginHorizontal: 30,
                    // marginBottom: 20,
                }}
                className="flex-col justify-around h-screen"
            >
                <View>
                    <Image
                        source={image}
                        style={{
                            height: 206,
                            width: "100%",
                            borderRadius: 14,
                            marginBottom: 21,
                        }}
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
                        {name}
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus iure facilis quibusdam? Cupiditate hic quisquam recusandae aliquam. Officiis, quod soluta expedita corporis iste perspiciatis at, aliquid voluptas nemo enim quos, quidem eveniet velit laborum sint neque impedit maiores adipisci! Quibusdam dolorum nemo deleniti. Temporibus vero eius laboriosam optio repudiandae eos libero ratione amet dolore! Distinctio natus eum laborum ut explicabo ratione excepturi error, reiciendis atque officiis ab nesciunt, corrupti placeat?
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 25,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.Roboto_700Bold,
                                fontSize: 20,
                                color: COLORS.carrot,
                            }}
                        >
                            ${price}
                        </Text>

                    </View>
                </View>

                <View>
                    <Text className='font-bold text-md mb-3 text-left text-gray-700 mt-5'>Cantidad</Text>

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
                        selectedValue={marca}
                        onValueChange={(itemValue, itemIndex) =>
                            setMarca(itemValue)
                        }
                    >
                        <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="1" value="1" />
                        <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="2" value="2" />
                        <Picker.Item style={{ color: COLORS.gray2, marginLeft: 10 }} label="3" value="3" />
                    </Picker>
                </View>

                <Button
                    title="Comprar"
                    containerStyle={{ marginBottom: 20, marginTop: 60 }}
                    onPress={() => {
                        navigation.navigate('PaymentMethodOne')
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
