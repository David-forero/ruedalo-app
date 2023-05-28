import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { tabs, COLORS, FONTS, dishes } from "../common/constants";

import HomeOne from "./Home";
import Favorite from "../screens/FavoriteList";
import Profile from "../screens/Profile";
import AutoServices from "./AutoServices";

export default function MainLayout() {
    const navigation = useNavigation();
    const [selectedTab, setSelectedTab] = useState("Home");

    return (
        <View style={{ flex: 1 }}>
            {selectedTab == "Home" && <HomeOne />}
            {selectedTab == "AutoServices" && <AutoServices />}
            {selectedTab == "Favorite" && <Favorite />}
            {selectedTab == "Profile" && <Profile />}

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 28,
                    paddingVertical: 16,
                    backgroundColor: COLORS.white,
                    borderTopColor: COLORS.lightGray,
                    borderTopWidth: 1,
                }}
            >
                {tabs.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() =>
                                item.screen == "Order" && dishes.length !== 0
                                    ? navigation.navigate("Order")
                                    : setSelectedTab(item.screen)
                            }
                        >
                            <Image
                                source={item.icon}
                                style={{
                                    height: 24,
                                    width: "100%",
                                    tintColor:
                                        selectedTab == item.screen
                                            ? COLORS.orange
                                            : COLORS.gray2,
                                    marginBottom: 10,
                                }}
                                resizeMode="contain"
                            />
                            <Text
                                style={{
                                    ...FONTS.Roboto_400Regular,
                                    fontSize: 14,
                                    lineHeight: 14 * 1,
                                    color:
                                        selectedTab == item.screen
                                            ? COLORS.orange
                                            : COLORS.gray2,
                                }}
                            >
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}
