import { View, Text, TextInput, Image } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import VenezuelaFlag from '../../assets/icons/venezuela-flag.png';
import { useEffect } from "react";

export default function InputPhone({
  contaynerStyle,
  placeholder,
  value = null,
  mask,
  setFieldValue,
  error = false,
  valueTwo,
  // editable = true,
}) {

  useEffect(() => {
    setFieldValue('phone', valueTwo);
  }, [valueTwo])
  

  return (
    <View className="mb-3">
      <View
        className={`${error ? "bg-red-100" : "bg-gray-100"}`}
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
        <Image source={VenezuelaFlag} style={{ paddingRight: 14, width: 30, height: 20, marginRight: 10 }}/>
     
        <MaskedTextInput
          onChangeText={(text, rawText) => {
            setFieldValue('phone', rawText);
          }}
          mask={mask}
          value={value}
          keyboardType="number-pad"
          placeholder={placeholder}
        />
      </View>
      {error && <Text className="px-3 text-red-700 my-1">*{error}</Text>}
    </View>
  );
}
