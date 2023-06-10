import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { Shadow } from "react-native-shadow-2";
import { FONTS, COLORS } from "../constants";

export default function ItemComponentTwo({ item, onPress }) {
    return (
        <Shadow
            viewStyle={{ marginRight: 15 }}
            startColor={COLORS.shadowStartColor}
            finalColor={COLORS.shadowFinalColor}
        >
            <TouchableOpacity
                style={{
                    width: 250,
                    borderRadius: 10,
                }}
                onPress={onPress}
            >
                <ImageBackground
                    source={{uri: 'https://repuestosya.cobrex.com.ve/api/product/' + item.image[0]}}
                    style={{
                        height: 144,
                        width: "100%",
                    }}
                    imageStyle={{ borderRadius: 10 }}
                >
                    {/* <TouchableOpacity
                        style={{
                            padding: 16,
                            alignSelf: "flex-start",
                        }}
                    >
                        <Heart
                            fillColor={COLORS.red}
                            strokeColor={COLORS.red}
                        />
                    </TouchableOpacity> */}
                </ImageBackground>
                <View
                    style={{
                        paddingHorizontal: 19,
                        paddingTop: 12,
                        paddingBottom: 15,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 3,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.Roboto_500Medium,
                                fontSize: 16,
                                textTransform: "capitalize",
                                lineHeight: 16 * 1.2,
                                width: "70%",
                            }}
                            numberOfLines={1}
                        >
                            {item.title}
                        </Text>

                        <Text
                            style={{
                                ...FONTS.Roboto_500Medium,
                                fontSize: 16,
                                color: COLORS.carrot,
                            }}
                        >
                            ${item.price}
                        </Text>
                    </View>
                    <Text
                        style={{
                            marginBottom: 15,
                            color: COLORS.gray2,
                        }}
                        numberOfLines={2}
                    >
                        {item.description}
                    </Text>
                  
                </View>
            </TouchableOpacity>
        </Shadow>
    );
}
