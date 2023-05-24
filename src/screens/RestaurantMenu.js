import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    StyleSheet
} from "react-native";
import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

import {
    Header,
    Heading,
    ItemComponentOne,
    ItemComponentTwo,
} from "../common/components";
import { SAFEAREAVIEW, category, FONTS, COLORS } from "../common/constants";

export default function RestaurantMenu() {
    const [selectCategory, setSelectCategory] = useState(1);

    const route = useRoute();
    const navigation = useNavigation();
    const { restaurant, dishes } = route.params;
    console.log(restaurant.image, '🔥');



    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <Header
                title="Catálogo de producos"
                onPress={() => navigation.goBack()}
            />
            <Image source={restaurant.image} style={styles.image} className="rounded-b-lg" />

            <View style={styles.container}>
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-gray-700 font-bold text-lg" >{restaurant.name}</Text>
                    <View className="bg-green-300 p-2 rounded-full">
                        <Text className="text-green-600 text-[12px] font-semibold">
                        Abierto
                        </Text>
                    </View>
                </View>

                <View>
                    <Text className="text-gray-500 text-sm">
                        {restaurant.description}
                    </Text>
                </View>
                {/* <Text style={styles.subtitle}>
                    ${restaurant.deliveryFee.toFixed(1)} &#8226; {restaurant.minDeliveryTime}-
                    {restaurant.maxDeliveryTime} minutes
                </Text> */}

                {/* <Text style={styles.menuTile}>Menu</Text> */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    button: {
        backgroundColor: "black",
        marginTop: "auto",
        padding: 20,
        alignItems: "center",
        margin: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 18,
    },
    image: {
        width: "100%",
        height: 200
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginVertical: 5,
    },
    subtitle: {
        color: "#525252",
        fontSize: 15,
    },
    iconContainer: {
        position: "absolute",
        top: 40,
        left: 10,
    },
    menuTitle: {
        marginTop: 20,
        marginVertical: 10,
        fontSize: 16,
        letterSpacing: 0.7
    }
});