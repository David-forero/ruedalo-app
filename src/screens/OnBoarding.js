import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { SIZES, COLORS, FONTS, SAFEAREAVIEW, onboarding } from "../common/constants";
import {
    Button,
    Triangle,
    CircleOne,
    CircleTwo,
    CircleElement,
    CircleElementTwo,
} from "../common/components";

export default function OnBoarding() {
    const navigation = useNavigation();
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    function updateCurrentSlideIndex(e) {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / SIZES.width);
        setCurrentSlideIndex(currentIndex);
    }

    function renderDots() {
        return (
            <View>
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                    }}
                >
                    {onboarding.map((_, index) => {
                        return currentSlideIndex == index ? (
                            <View key={index} style={{ marginHorizontal: 5 }}>
                                <CircleElement />
                            </View>
                        ) : (
                            <View key={index} style={{ marginHorizontal: 5 }}>
                                <CircleElementTwo />
                            </View>
                        );
                    })}
                </View>
            </View>
        );
    }

    return (
        <View style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <FlatList
                data={onboarding}
                keyExtractor={(item) => item.id}
                horizontal={true}
                snapToInterval={SIZES.width}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                renderItem={({ item, index }) => {
                    return (
                        <View
                            style={{
                                width: SIZES.width,
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Image
                                    source={item.image}
                                    style={{
                                        width: SIZES.width - 20,
                                        height: SIZES.height / 2.3,
                                    }}
                                    resizeMode="contain"
                                />
                            </View>
                            <View
                                style={{
                                    ...SIZES.width,
                                    borderTopRightRadius: 30,
                                    borderTopLeftRadius: 30,
                                    overflow: "hidden",
                                    backgroundColor: COLORS.black2,
                                    paddingTop: SIZES.height / 20,
                                    paddingBottom: SIZES.height / 30,
                                    paddingHorizontal: 40,
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 24,
                                        color: COLORS.white,
                                        marginBottom: SIZES.height / 50,
                                        textTransform: "capitalize",
                                        ...FONTS.Roboto_700Bold,
                                    }}
                                >
                                    {item.title}
                                </Text>
                                <Text
                                    style={{
                                        marginBottom: 45,
                                        textAlign: "center",
                                        fontSize: 14,
                                        color: COLORS.white,
                                        paddingHorizontal: 10,
                                        marginBottom: SIZES.height / 20,
                                        ...FONTS.Roboto_400Regular,
                                    }}
                                >
                                    {item.description}
                                </Text>
                                <Button
                                    title="¡Empecemos!"
                                    containerStyle={{
                                        marginBottom: SIZES.height / 26,
                                        backgroundColor: COLORS.orange,
                                    }}
                                    onPress={() =>
                                        navigation.navigate("SignIn")
                                    }
                                />

                                {renderDots()}

                                <View
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        zIndex: -1,
                                    }}
                                >
                                    <Triangle />
                                </View>
                                <View
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                    }}
                                >
                                    <CircleOne />
                                </View>
                                <View
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                    }}
                                >
                                    <CircleTwo />
                                </View>
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    );
}
