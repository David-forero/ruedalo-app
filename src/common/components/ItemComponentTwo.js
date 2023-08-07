import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { Shadow } from "react-native-shadow-2";
import { FONTS, COLORS } from "../constants";
import { AntDesign } from '@expo/vector-icons';
import Clock from "./svg/Clock";

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
                    source={{uri: 'https://backend.dev.ruedalo.app/api/product/' + item?.image[0]}}
                    style={{
                        height: 144,
                        width: "100%",
                    }}
                    imageStyle={{ borderRadius: 10 }}
                    resizeMode="contain"
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

                    <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 7,
                    }}
                  >
                    <AntDesign name="profile" size={14} color={'#1DBF73'} />
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
                      {item.brand}
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
                        ...FONTS.Roboto_400Regular,
                        fontSize: 12,
                        color: COLORS.gray2,
                        lineHeight: 12 * 1.2,
                        marginLeft: 4,
                      }}
                    >
                      Unos {Math.round(item?.distance)}km de distancia
                    </Text>
                  </View>
                  
                </View>
            </TouchableOpacity>
        </Shadow>
    );
}
