import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { useNavigation } from "@react-navigation/native";
import { Rating, AirbnbRating } from "react-native-ratings";
import DashedLine from "react-native-dashed-line";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Shadow } from "react-native-shadow-2";

import {
    Header,
    Empty,
    Button,
    Minus,
    Plus,
    InputField,
    BasketTwo,
} from "../components";
import { COLORS, SAFEAREAVIEW, FONTS, SIZES } from "../constants";

const dishes = [
    {
        id: "1",
        name: "Caramel cake with beries",
        compound: "Sells food, either fresh, specie, chili",
        presentationImage: require("../assets/images/dishes/dish-01-01.png"),
        popularDeal: true,
        bestMeal: true,
        recommended: true,
        price: 15.45,
        rating: 4.5,
        image: require("../assets/images/dishes/dish-01-02.png"),
        description:
            "Add the remaining ingredients and toss to coat. Serve. Notes. Note: Kani Salad is best served fresh. Due to the water content from cucumbers",
        weight: "350",
        qty: 1,
    },
    {
        id: "2",
        name: "Cheesecake with chocolate",
        compound: "Sells food, either fresh, specie, chili",
        presentationImage: require("../assets/images/dishes/dish-02-01.png"),
        bestMeal: true,
        popularDeal: true,
        recommended: true,
        price: 40.45,
        rating: 3.3,
        image: require("../assets/images/dishes/dish-02-02.png"),
        description:
            "Qui ex aute ipsum duis. Incididunt adipisicing voluptate laborum",
        weight: 350,
        qty: 1,
    },
    {
        id: "3",
        name: "Chocolate cake with cherries",
        compound: "Sells food, either fresh, specie, chili",
        presentationImage: require("../assets/images/dishes/dish-03-01.png"),
        bestMeal: true,
        popularDeal: false,
        recommended: true,
        price: 33.3,
        rating: 5.0,
        image: require("../assets/images/dishes/dish-03-02.png"),
        description:
            "Qui ex aute ipsum duis. Incididunt adipisicing voluptate laborum",
        weight: "350",
        qty: 1,
    },
];

export default function Order() {
    const navigation = useNavigation();

    function renderItem(data) {
        return (
            <View style={{ paddingBottom: 15 }}>
                <Shadow
                    startColor={COLORS.shadowStartColor}
                    finalColor={COLORS.shadowFinalColor}
                    distance={10}
                >
                    <View
                        style={{
                            width: "100%",
                            height: 110,
                            backgroundColor: COLORS.white,
                            // marginBottom: 15,
                            flexDirection: "row",
                            alignItems: "center",
                            borderRadius: 5,
                        }}
                    >
                        <Image
                            source={data.item.presentationImage}
                            style={{
                                width: 100,
                                height: "100%",
                                borderTopLeftRadius: 5,
                                borderBottomLeftRadius: 5,
                            }}
                        />
                        <View
                            style={{
                                marginVertical: 6,
                                marginHorizontal: 16,
                                flex: 1,
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.Roboto_500Medium,
                                    fontSize: 16,
                                    textTransform: "capitalize",
                                    lineHeight: 16 * 1.2,
                                    marginBottom: 2,
                                }}
                                numberOfLines={1}
                            >
                                {data.item.name}
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 5,
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
                                    startingValue={data.item.rating}
                                />
                                <Text
                                    style={{
                                        marginLeft: 5.5,
                                        ...FONTS.Roboto_500Medium,
                                        fontSize: 12,
                                        color: COLORS.black,
                                    }}
                                >
                                    {data.item.rating}
                                </Text>
                            </View>
                            <Text
                                style={{
                                    ...FONTS.Roboto_400Regular,
                                    fontSize: 12,
                                    color: COLORS.gray2,
                                    marginBottom: 8,
                                }}
                                numberOfLines={1}
                            >
                                {data.item.compound}
                            </Text>

                            <View />
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            width: 24,
                                            height: 24,
                                            backgroundColor:
                                                COLORS.lightGreen_02,
                                            borderRadius: 15,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                        onPress={() => console.log("minus")}
                                    >
                                        <Minus />
                                    </TouchableOpacity>
                                    <Text
                                        style={{
                                            marginHorizontal: 6,
                                            ...FONTS.Roboto_500Medium,
                                            fontSize: 12,
                                            lineHeight: 12 * 1.2,
                                            color: COLORS.gray2,
                                        }}
                                    >
                                        1
                                    </Text>
                                    <TouchableOpacity
                                        style={{
                                            width: 24,
                                            height: 24,
                                            backgroundColor: COLORS.black2,
                                            borderRadius: 15,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                        onPress={() => console.log("plus")}
                                    >
                                        <Plus />
                                    </TouchableOpacity>
                                </View>
                                <Text
                                    style={{
                                        ...FONTS.Roboto_700Bold,
                                        fontSize: 14,
                                        color: COLORS.carrot,
                                    }}
                                >
                                    Price: ${data.item.price}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Shadow>
            </View>
        );
    }

    function renderFooterComponent() {
        return (
            <View>
                <View style={{ marginTop: 15 }}>
                    <DashedLine
                        dashLength={10}
                        dashThickness={1}
                        dashGap={5}
                        dashColor={COLORS.gray2}
                        dashStyle={{ borderRadius: 5 }}
                    />
                </View>

                <View
                    style={{
                        height: 50,
                        width: "100%",
                        borderWidth: 1,
                        borderRadius: 10,
                        marginVertical: 18,
                        borderColor: "#D7D7D7",
                        justifyContent: "center",
                        paddingHorizontal: 15,
                    }}
                >
                    <TextInput
                        placeholder="Enter your promo code"
                        placeholderTextColor={COLORS.black}
                        style={{ flex: 1 }}
                    />
                </View>
                <View style={{ marginBottom: 27 }}>
                    <DashedLine
                        dashLength={10}
                        dashThickness={1}
                        dashGap={5}
                        dashColor={COLORS.gray2}
                        dashStyle={{ borderRadius: 5 }}
                    />
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        marginBottom: 5,
                    }}
                >
                    <Text style={{ ...FONTS.Roboto_700Bold, fontSize: 14 }}>
                        Discount:
                    </Text>
                    <Text
                        style={{
                            ...FONTS.Roboto_700Bold,
                            fontSize: 14,
                            color: COLORS.carrot,
                        }}
                    >
                        {" "}
                        $200.00
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        marginBottom: 25,
                    }}
                >
                    <Text style={{ ...FONTS.Roboto_700Bold, fontSize: 14 }}>
                        Sub Total ( 5 item ):
                    </Text>
                    <Text
                        style={{
                            ...FONTS.Roboto_700Bold,
                            fontSize: 14,
                            color: COLORS.carrot,
                        }}
                    >
                        {" "}
                        $200.00
                    </Text>
                </View>

                <Button
                    title="Process to Checkout"
                    onPress={() => navigation.navigate("PaymentMethodOne")}
                    containerStyle={{ marginBottom: 20 }}
                />
            </View>
        );
    }

    function renderHiddenItem({ data }) {
        return (
            <TouchableOpacity
                style={{
                    alignSelf: "flex-end",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                }}
                onPress={() => console.log("Remove Item")}
            >
                <BasketTwo />
            </TouchableOpacity>
        );
    }

    function renderSwipeListView() {
        return (
            <SwipeListView
                data={dishes}
                renderItem={(data, rowMap) => renderItem(data)}
                renderHiddenItem={(data, rowMap) => renderHiddenItem(data)}
                showsVerticalScrollIndicator={false}
                rightOpenValue={-85}
                contentContainerStyle={{
                    paddingHorizontal: 30,
                    paddingVertical: SIZES.paddingTop_01,
                }}
                ListFooterComponent={() => renderFooterComponent()}
                closeOnRowPress={true}
                closeOnRowOpen={true}
                closeOnRowBeginSwipe={true}
                disableRightSwipe={true}
            />
        );
    }

    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <Header title="Order Details" onPress={() => navigation.goBack()} />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                {renderSwipeListView()}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
