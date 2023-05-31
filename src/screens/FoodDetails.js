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

export default function FoodDetails() {
    const navigation = useNavigation();
    const route = useRoute();
    const { dish, dishes, image, name, price, description } = route.params;

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
                        <View
                            style={{ flexDirection: "row", alignItems: "center" }}
                        >
                            <Text
                                style={{ ...FONTS.Roboto_500Medium, fontSize: 16 }}
                            >
                                20
                            </Text>
                            <View style={{ marginHorizontal: 6 }}>
                                <Star />
                            </View>
                            <Text
                                style={{
                                    ...FONTS.Roboto_500Medium,
                                    fontSize: 16,
                                    color: COLORS.gray2,
                                }}
                            >
                                120 Review
                            </Text>
                        </View>
                    </View>
                </View>
                <Button
                    title="Comprar"
                    containerStyle={{ marginBottom: 83 }}
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
            {renderDetails()}
        </SafeAreaView>
    );
}
