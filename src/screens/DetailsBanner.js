import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { CardCatalog, CategoryFilter, Header } from "../common/components";
import {
  COLORS,
  FONTS,
  SIZES,
  SAFEAREAVIEW,
  category,
} from "../common/constants";
import { useState } from "react";
import { Rating } from "react-native-ratings";

const DetailsBanner = () => {
  const [selectCategory, setSelectCategory] = useState(0);

  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;
  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Publicidad" onPress={() => navigation.goBack()} />
        <Image
          source={{
            uri: "https://backend.ruedalo.app/api/banner/" + item?.banner[0],
          }}
          style={styles.image}
          className="rounded-b-lg"
          resizeMode="contain"
        />

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("RestaurantMenu", {
              restaurant: dummyData[0],
            })
          }
          className="px-5 flex-row space-x-3 mt-5"
        >
          <Image
            source={{
              uri:
                "https://backend.ruedalo.app/api/avatar/" +
                item?.commerce.avatar[0],
            }}
            className="h-10 w-10 rounded-full"
            resizeMode="stretch"
          />

          <View>
            <Text>{item?.commerce.registered_name}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Rating
                type="star"
                count={5}
                defaultRating={14}
                imageSize={12}
                showRating={false}
                isDisabled={false}
                readonly={true}
                startingValue={item?.commerce.rating}
              />
              <Text
                style={{
                  ...FONTS.Roboto_400Regular,
                  fontSize: 12,
                  color: COLORS.gray2,
                  marginLeft: 10,
                  lineHeight: 12 * 1.2,
                }}
              >
                ({item?.commerce.rating})
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View className="mx-5 mt-8 bg-slate-100 p-3 rounded-md">
          <Text className="text-gray-950 text-sm">{item.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsBanner;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  button: {
    backgroundColor: "black",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 5,
  },
  subtitle: {
    color: "#525252",
    fontSize: 15,
  },
  iconContainer: {
    position: "absolute",
    top: 40,
    left: 10,
  },
  menuTitle: {
    marginTop: 20,
    marginVertical: 10,
    fontSize: 16,
    letterSpacing: 0.7,
  },
});
