import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants";

export default function OrderHistoryCategory({ item, type }) {
    return (
        <View
            style={{
                width: "100%",
                height: 97,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.lightGray,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
            }}
        >
            <Image
                source={item.image}
                style={{
                    width: 65,
                    height: 65,
                    borderRadius: 40,
                    marginRight: 12,
                }}
            />
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 3,
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.Roboto_400Regular,
                            fontSize: 13,
                            color: COLORS.gray2,
                            flex: 1,
                        }}
                    >
                        {item.date}
                    </Text>
                    <View
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: 5,
                        }}
                        className="bg-orange-500 mr-2"
                    />
                    
                    <Text
                        style={{
                            ...FONTS.Roboto_700Bold,
                            fontSize: 13,
                            color: COLORS.carrot,
                        }}
                    >
                        ${item.price}
                    </Text>
                </View>

                <Text
                    style={{
                        ...FONTS.Roboto_700Bold,
                        fontSize: 15,
                        textTransform: "capitalize",
                        color: COLORS.black,
                    }}
                >
                    {item.name}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {item.completed == true ? (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    width: 8,
                                    height: 8,
                                    backgroundColor: "red",
                                    borderRadius: 4,
                                    marginRight: 5,
                                }}
                            />
                            <Text
                                style={{
                                    ...FONTS.Roboto_400Regular,
                                    fontSize: 13,
                                    color: COLORS.carrot,
                                }}
                            >
                                Esperando pago
                            </Text>
                        </View>
                    ) : (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    width: 8,
                                    height: 8,
                                    backgroundColor: COLORS.black2,
                                    borderRadius: 4,
                                    marginRight: 5,
                                }}
                            />
                            {type == "upcoming" ? (
                                <Text
                                    style={{
                                        ...FONTS.Roboto_400Regular,
                                        fontSize: 13,
                                        color: COLORS.black2,
                                    }}
                                >
                                    En proceso
                                </Text>
                            ) : (
                                <Text
                                    style={{
                                        ...FONTS.Roboto_400Regular,
                                        fontSize: 13,
                                        color: COLORS.black2,
                                    }}
                                >
                                    Completado
                                </Text>
                            )}
                        </View>
                    )}

                    {type == "completed" && (
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.black2,
                                borderRadius: 12,
                            }}
                        >
                            <Text
                                style={{
                                    paddingHorizontal: 16,
                                    paddingVertical: 4,
                                    color: COLORS.white,
                                }}
                            >
                                Re-Order
                            </Text>
                        </TouchableOpacity>
                    )}

                    {type == "upcoming" && (
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.red,
                                borderRadius: 12,
                            }}
                        >
                            <Text
                                style={{
                                    paddingHorizontal: 16,
                                    paddingVertical: 4,
                                    color: COLORS.white,
                                }}
                            >
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
}
