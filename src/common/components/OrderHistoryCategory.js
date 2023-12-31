import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants";
import Dayjs from "dayjs";
import statusOrder from "../functions/statusOrder";

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
                source={{ uri: `https://backend.dev.ruedalo.app/api/${item.type === 'product' ? 'product' : 'service'}/${item.type === 'product' ? item?.product?.image[0] : item?.service?.image[0]}`}}
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
                        {Dayjs(item?.createdAt).format('DD/MM/YYYY')}
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
                        Total: ${item?.total} 
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
                    {item.type == 'product' ? item?.product?.title : item?.service?.description}
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
                                {statusOrder(item?.status)}
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
                                    backgroundColor: COLORS.black,
                                    borderRadius: 4,
                                    marginRight: 5,
                                }}
                            />
                            {type == "upcoming" ? (
                                <Text
                                    style={{
                                        ...FONTS.Roboto_400Regular,
                                        fontSize: 13,
                                        color: COLORS.black,
                                    }}
                                >
                                      {statusOrder(item?.status)}
                                </Text>
                            ) : (
                                <Text
                                    style={{
                                        ...FONTS.Roboto_400Regular,
                                        fontSize: 13,
                                        color: COLORS.black,
                                    }}
                                >
                                    Completado
                                </Text>
                            )}
                        </View>
                    )}

                    {/* {type == "completed" && (
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.black,
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
                    )} */}
                </View>
            </View>
        </View>
    );
}
