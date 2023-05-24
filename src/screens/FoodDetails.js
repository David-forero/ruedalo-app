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
} from "../components";
import { COLORS, FONTS, SAFEAREAVIEW, SIZES } from "../common/constants";

export default function FoodDetails() {
    const navigation = useNavigation();
    const route = useRoute();
    const { dish, dishes } = route.params;

    function renderDetails() {
        return (
            <View
                style={{
                    marginHorizontal: 30,
                    marginTop: 30,
                    marginBottom: 20,
                }}
            >
                <Image
                    source={dish.image}
                    style={{
                        height: 206,
                        width: "100%",
                        borderRadius: 14,
                        marginBottom: 21,
                    }}
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
                    {dish.name}
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
                    {dish.description}
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
                        ${dish.price}
                    </Text>
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Text
                            style={{ ...FONTS.Roboto_500Medium, fontSize: 16 }}
                        >
                            {dish.rating}
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
                <Button
                    title="Add to Cart"
                    containerStyle={{ marginBottom: 33 }}
                    onPress={() => {
                        showMessage({
                            message: "Success",
                            description: `${dish.name} was added.`,
                            type: "success",
                        });
                    }}
                />
            </View>
        );
    }

    function renderRecommended() {
        return (
            <View>
                <Heading
                    title="Recommended"
                    fontStyle={{ ...FONTS.Roboto_500Medium, fontSize: 18 }}
                />
                <FlatList
                    data={dishes}
                    horizontal={true}
                    contentContainerStyle={{
                        paddingLeft: 30,
                        paddingBottom: 30,
                        paddingVertical: 21,
                    }}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                        return (
                            item.recommended === true && (
                                <ItemComponentOne item={item} />
                            )
                        );
                    }}
                />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <Header title="Food Details" onPress={() => navigation.goBack()} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                {renderDetails()}
                {renderRecommended()}
            </ScrollView>
        </SafeAreaView>
    );
}
