import { Image, Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import Minus from "./svg/Minus";
import Plus from "./svg/Plus";
import { COLORS, FONTS } from "../constants";
import { useNavigation } from "@react-navigation/native";

const CardCatalog = ({ name, price, image, description, type, id }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
       { console.log('SAS')
        navigation.navigate("FoodDetails", { id, commerceGoBack: true })}
      }
      style={{ paddingBottom: 15 }}
    >
      <Shadow
        startColor={COLORS.shadowStartColor}
        finalColor={COLORS.shadowFinalColor}
        distance={10}
      >
        <View
          style={{
            width: "100%",
            height: 110,
            backgroundColor: COLORS.white,
            // marginBottom: 15,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <Image
            source={{
              uri: `https://backend.dev.ruedalo.app/api/${
                type === "product" ? "product" : "avatar"
              }/${image[0]}`,
            }}
            style={{
              width: 100,
              height: "100%",
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            }}
          />
          <View
            style={{
              marginVertical: 6,
              marginHorizontal: 16,
              flex: 1,
            }}
          >
            <Text
              style={{
                ...FONTS.Roboto_500Medium,
                fontSize: 16,
                textTransform: "capitalize",
                lineHeight: 16 * 1.2,
                marginBottom: 2,
              }}
              numberOfLines={2}
            >
              {name}
            </Text>

            <Text
              style={{
                ...FONTS.Roboto_400Regular,
                fontSize: 12,
                color: COLORS.gray2,
                marginBottom: 8,
              }}
              numberOfLines={2}
            >
              {description}
            </Text>

            <View />
            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  ...FONTS.Roboto_700Bold,
                  fontSize: 14,
                  color: COLORS.carrot,
                }}
              >
                Precio: ${price}
              </Text>
            </View>
          </View>
        </View>
      </Shadow>
    </TouchableOpacity>
  );
};

export default CardCatalog;
