import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function InputField({
    contaynerStyle,
    placeholder,
    icon,
    keyboardType = 'default',
    value = null,
    onBlur,
    onChangeText,
    error = false,
    touched,
    editable = true,
    showPasswords = false,
    setShowPasswords,
    onPressPassword
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
                    justifyContent: 'space-between',
                    ...contaynerStyle,
                }}
            >
                <TextInput
                    style={{ flex: 1 }}
                    placeholder={placeholder}
                    secureTextEntry={!showPasswords}
                    onChangeText={onChangeText}
                    onKeyPress={onBlur}
                    onBlur={onBlur}
                    value={value}
                    textContentType={showPasswords ? 'none' : 'password'}
                    keyboardType={keyboardType}
                    touched={touched}
                    editable={editable}
                />
                {icon && <TouchableOpacity onPress={() => setShowPasswords(!showPasswords)} >{<Ionicons name={showPasswords ? "eye-off-outline" : "eye-outline"} size={24} color="black" />}</TouchableOpacity>}
            </View>
            {error && <Text className="px-3 text-red-700 my-1">*{error}</Text>}
        </View>
    );
}
