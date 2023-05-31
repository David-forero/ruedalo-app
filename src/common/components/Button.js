import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants";

export default function Button({
    title,
    containerStyle,
    textColor,
    onPress,
    textStyle,
    loading = false,
    valid = true
}) {
    return (
        <TouchableOpacity
            className={`${valid ? 'opacity-100' : 'opacity-80'}`}
            style={{
                width: "100%",
                height: 50,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.black2,
                ...containerStyle,
                zIndex: 1,
            }}
            onPress={onPress}
            disabled={loading || !valid}
        >
            {
                loading ? (<ActivityIndicator size="small" color="#fff" />) : (<Text
                    style={{
                        textAlign: "center",
                        color: textColor,
                        fontSize: 16,
                        color: COLORS.white,
                        textTransform: "capitalize",
                        ...FONTS.Roboto_500Medium,
                        ...textStyle,
                    }}
                >
                    {title}
                </Text>)
            }
        </TouchableOpacity>
    );
}
