import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";
import { Rating } from "react-native-ratings";

import { COLORS, FONTS, SAFEAREAVIEW, category, dummyData } from "../common/constants";
import {
    Basket,
    Search,
    Pin,
    Star,
    DeliveryMan,
    Clock,
    PinTwo,
    Filter,
    HeartTwo,
    Heading,
    SliderBanner,
    ItemComponentTwo
} from "../common/components";
import { Ionicons } from '@expo/vector-icons';

const banners = [
    {
        image: require('../assets/images/banners/banner1.jpg')
    },
    {
        image: require('../assets/images/banners/banner3.jpg')
    },

    {
        image: require('../assets/images/banners/banner2.jpg')
    },

    {
        image: require('../assets/images/banners/banner4.jpg')
    },
];

export default function Home() {
    const navigation = useNavigation();
    const [selectCategory, setSelectCategory] = useState(1);

    function renderHeader() {
        return (
            <View
                style={{
                    marginTop: 10,
                    paddingLeft: 20
                }}
            >

                <View
                    className="ml-3 flex-row mt-3 mb-4"
                >
                    <Pin />
                    <Text
                        style={{
                            marginLeft: 12,
                            ...FONTS.Roboto_400Regular,
                            fontSize: 14,
                        }}
                    >
                        {/* story.user.length > 11 ? story.user.slice(0, 10).toLowerCase() + '...' : story.user.toLowerCase() */}
                        Los teques - centro comercial la casc...
                    </Text>
                </View>

                <View
                    style={{
                        height: 40,
                        borderRadius: 10,
                        flex: 1,
                        marginRight: 22,
                        alignItems: "center",
                        flexDirection: "row",
                        paddingLeft: 14,
                    }}
                    className="bg-gray-100"
                >
                    {/* <Search /> */}
                    <TextInput
                        placeholder="Buscar..."
                        style={{ flex: 1, paddingLeft: 7 }}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ListProducts")}
                        style={{
                            paddingHorizontal: 14,
                            // paddingVertical: 15,
                        }}
                    >
                        {/* <Filter /> */}
                        <Ionicons name="search-outline" size={16} color="#2d2d2d" />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    function renderCategories() {
        function categories(item, index) {
            return (
                <TouchableOpacity onPress={() => setSelectCategory(item.id)}>
                    <View style={{ marginLeft: index === 0 ? 0 : 20 }} >
                        <View
                            className="bg-gray-100"
                            style={{
                                width: 48,
                                height: 48,
                                // selectCategory == item.id
                                //     ? COLORS.black2
                                //     : COLORS.lightOrange,
                                borderRadius: 35,
                                justifyContent: "center",
                                alignItems: "center",
                                marginHorizontal: 7,
                                marginBottom: 11,
                            }}
                        >
                            <Image
                                source={item.image}
                                style={{
                                    height: 28,
                                    width: "100%",
                                    // tintColor:
                                    //     selectCategory == item.id
                                    //         ? COLORS.white
                                    //         : COLORS.gray2,
                                }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text
                            style={{
                                textAlign: "center",
                                ...FONTS.Roboto_500Medium,
                                fontSize: 14,
                                textTransform: "capitalize",
                                color:
                                    selectCategory == item.id
                                        ? COLORS.black2
                                        : COLORS.gray2,
                            }}
                        >
                            {item.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }

        return (
            <View style={{ marginBottom: 40 }}>

                <View>
                    <FlatList
                        data={category}
                        horizontal={true}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) =>
                            categories(item, index)
                        }
                        contentContainerStyle={{ paddingLeft: 30 }}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        );
    }

    function renderPopularRestaurants() {
        return (
            <View>
                <Heading title="Para tu vehículo" />
                <FlatList
                    contentContainerStyle={{
                        paddingLeft: 30,
                        paddingVertical: 21,
                    }}
                    data={dummyData[0].dishes}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <ItemComponentTwo
                            item={item}
                            onPress={() =>
                                navigation.navigate("FoodDetails", {
                                    image: item.image,
                                    name: item.name,
                                    price: item.price,
                                    description: item.description
                                })
                            }
                        />
                    )}
                />
            </View>
        )
    }

    function renderNearByYou() {
        return (
            <View style={{ paddingHorizontal: 30 }}>
                <Heading
                    title="Lo mas vendido"
                    containerStyle={{ paddingHorizontal: 0, marginBottom: 21 }}
                />

                {dummyData[0].dishes.map(
                    (item, index) =>
                        <TouchableOpacity
                            key={index}
                            style={{
                                height: 100,
                                width: "100%",
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 15,
                            }}
                            onPress={() =>
                                navigation.navigate("FoodDetails", {
                                    image: item.image,
                                    name: item.name,
                                    price: item.price,
                                    description: item.description
                                })
                            }
                        >
                            <Image
                                source={item.image}
                                style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 10,
                                    marginRight: 20,
                                }}
                            />
                            <View style={{ flex: 1 }}>
                                <Text
                                    style={{
                                        ...FONTS.Roboto_500Medium,
                                        fontSize: 16,
                                        marginBottom: 10,
                                        lineHeight: 16 * 1,
                                        textTransform: "capitalize",
                                    }}
                                    numberOfLines={1}
                                >
                                    {item.name}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: 7,
                                    }}
                                >
                                    <PinTwo />
                                    <Text
                                        style={{
                                            marginLeft: 5,
                                            ...FONTS.Roboto_400Regular,
                                            fontSize: 12,
                                            color: COLORS.gray2,
                                            lineHeight: 12 * 1.2,
                                            width: "85%",
                                        }}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {item.address}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: 8,
                                    }}
                                >
                                    <Clock />
                                    <Text
                                        style={{
                                            marginLeft: 5,
                                            ...FONTS.Roboto_400Regular,
                                            fontSize: 12,
                                            color: COLORS.gray2,
                                            lineHeight: 12 * 1.2,
                                        }}
                                    >
                                        {item.timeOfDelivery}
                                    </Text>
                                    <View
                                        style={{
                                            width: 4,
                                            height: 4,
                                            backgroundColor: COLORS.black2,
                                            borderRadius: 2,
                                            marginHorizontal: 4,
                                        }}
                                    />
                                    <Text
                                        style={{
                                            ...FONTS.Roboto_400Regular,
                                            fontSize: 12,
                                            color: COLORS.gray2,
                                            lineHeight: 12 * 1.2,
                                        }}
                                    >
                                        {item.distance}
                                    </Text>
                                </View>
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
                                        startingValue={item.rating}
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
                                        ({item.numberOfRatings})
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                )}
            </View>
        );
    }

    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
            >
                {renderHeader()}

                <SliderBanner data={banners} />

                {renderCategories()}
                {renderPopularRestaurants()}
                {renderNearByYou()}
            </ScrollView>
        </SafeAreaView>
    );
}
