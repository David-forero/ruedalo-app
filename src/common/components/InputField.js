import { View, Text, TextInput } from "react-native";
import React from "react";

import { COLORS } from "../constants";

export default function InputField({
    contaynerStyle,
    placeholder,
    leftIcon,
    rightIcon,
    secureTextEntry,
    keyboardType = 'default',
    value = null,
    onBlur,
    onChangeText,
    textContentType = 'none',
    error = false,
    touched,
    editable = true
}) {
    return (
        <View className="mb-3">
            <View
                className={`${error ? 'bg-red-100' : 'bg-gray-100'}`}
                style={{
                    width: "100%",
                    height: 50,
                    borderRadius: 10,
                    alignItems: "center",
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    ...contaynerStyle,
                }}
            >
                {leftIcon && <View style={{ paddingRight: 14 }}>{leftIcon}</View>}
                <TextInput
                    style={{ flex: 1 }}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    onChangeText={onChangeText}
                    onKeyPress={onBlur}
                    onBlur={onBlur}
                    value={value}
                    textContentType={textContentType}
                    keyboardType={keyboardType}
                    touched={touched}
                    editable={editable}
                />
            </View>
            {error && <Text className="px-3 text-red-700 my-1">*{error}</Text>}
        </View>
    );
}
