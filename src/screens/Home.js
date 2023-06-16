import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Rating } from "react-native-ratings";

import { COLORS, FONTS, SAFEAREAVIEW, category } from "../common/constants";
import {
  Pin,
  Clock,
  PinTwo,
  Heading,
  SliderBanner,
  ItemComponentTwo,
  LoadingListOne,
  LoadingListTwo,
} from "../common/components";
import { Ionicons } from "@expo/vector-icons";
import { useAuthContext } from "../context/AuthContext";
import { useStoreContext } from "../context/StoreContext";
import useLocation from "../common/hooks/useLocation";
import { RefreshControl } from "react-native-gesture-handler";

const banners = [
  {
    image: require("../assets/images/banners/banner1.jpg"),
  },
  {
    image: require("../assets/images/banners/banner3.jpg"),
  },

  {
    image: require("../assets/images/banners/banner2.jpg"),
  },

  {
    image: require("../assets/images/banners/banner4.jpg"),
  },
];

export default function Home() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [selectCategory, setSelectCategory] = useState(1);
  const { user } = useAuthContext();
  const { getListProductsFn, forMyCar, setForMyCar, mostSells, setMostSells } =
    useStoreContext();

  //My hooks
  const { error, place, location } = useLocation();

  useEffect(() => {
    async function init() {
      setLoading(true);
      const { data } = await getListProductsFn(
        {
          latitude: location?.latitude,
          longitude: location?.longitude,
        },
        user?.token,
        setLoading
      );
      console.log("list porducts -> ", data);
      setForMyCar(data.data);
      setMostSells(data.data);
    }
    init();
  }, [location]);

  function renderHeader() {
    return (
      <View
        style={{
          marginTop: 10,
          paddingLeft: 20,
        }}
      >
        <View className="ml-3 flex-row mt-3 mb-4">
          <Pin />
          <Text
            style={{
              marginLeft: 12,
              ...FONTS.Roboto_400Regular,
              fontSize: 14,
            }}
            numberOfLines={1}
          >
            {place
              ? `${place[0]?.name} ${place[0]?.subregion} ${place[0]?.postalCode} `
              : "Crear una dirección acá"}
          </Text>
        </View>

        <View
          style={{
            height: 40,
            borderRadius: 10,
            flex: 1,
            marginRight: 22,
            alignItems: "center",
            flexDirection: "row",
            paddingLeft: 14,
          }}
          className="bg-gray-100"
        >
          {/* <Search /> */}
          <TextInput
            placeholder="Buscar..."
            style={{ flex: 1, paddingLeft: 7 }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("ListProducts")}
            style={{
              paddingHorizontal: 14,
              // paddingVertical: 15,
            }}
          >
            {/* <Filter /> */}
            <Ionicons name="search-outline" size={16} color="#2d2d2d" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderCategories() {
    function categories(item, index) {
      return (
        <TouchableOpacity onPress={() => setSelectCategory(item.id)}>
          <View style={{ marginLeft: index === 0 ? 0 : 20 }}>
            <View
              className="bg-gray-100"
              style={{
                width: 48,
                height: 48,
                // selectCategory == item.id
                //     ? COLORS.black2
                //     : COLORS.lightOrange,
                borderRadius: 35,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 7,
                marginBottom: 11,
              }}
            >
              <Image
                source={item.image}
                style={{
                  height: 28,
                  width: "100%",
                  // tintColor:
                  //     selectCategory == item.id
                  //         ? COLORS.white
                  //         : COLORS.gray2,
                }}
                resizeMode="contain"
              />
            </View>
            <Text
              style={{
                textAlign: "center",
                ...FONTS.Roboto_500Medium,
                fontSize: 14,
                textTransform: "capitalize",
                color: selectCategory == item.id ? COLORS.black2 : COLORS.gray2,
              }}
            >
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={{ marginBottom: 40 }}>
        <View>
          <FlatList
            data={category}
            horizontal={true}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => categories(item, index)}
            contentContainerStyle={{ paddingLeft: 30 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }

  function renderPopularRestaurants() {
    return (
      <View>
        <Heading title="Para tu vehículo" />

        {loading || !forMyCar ? (
          <FlatList
            contentContainerStyle={{
              paddingLeft: 30,
              paddingVertical: 21,
            }}
            data={[1, 2, 3, 4]}
            keyExtractor={(item) => item}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={() => <LoadingListOne />}
          />
        ) : (
          <FlatList
            contentContainerStyle={{
              paddingLeft: 30,
              paddingVertical: 21,
            }}
            data={forMyCar?.list_product}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <ItemComponentTwo
                item={item}
                onPress={() =>
                  navigation.navigate("FoodDetails", {
                    id: item.id,
                  })
                }
              />
            )}
          />
        )}
      </View>
    );
  }

  function renderNearByYou() {
    return (
      <View style={{ paddingHorizontal: 30 }}>
        <Heading
          title="Lo mas vendido"
          containerStyle={{ paddingHorizontal: 0, marginBottom: 21 }}
        />

        {loading || !forMyCar ? (
          <>
            {[1, 2, 3].map((item) => (
              <LoadingListTwo key={item} />
            ))}
          </>
        ) : (
          <>
            {mostSells?.list_product.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  height: 100,
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 15,
                }}
                onPress={() =>
                  navigation.navigate("FoodDetails", {
                    id: item.id,
                  })
                }
              >
                <Image
                  source={{
                    uri:
                      "https://backend.ruedalo.app/api/product/" +
                      item.image[0],
                  }}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 10,
                    marginRight: 20,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      ...FONTS.Roboto_500Medium,
                      fontSize: 16,
                      marginBottom: 10,
                      lineHeight: 16 * 1,
                      textTransform: "capitalize",
                    }}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 7,
                    }}
                  >
                    <PinTwo />
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
                      Torre construción, calle las brisas
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
                      {Math.round(item?.distance)}km
                    </Text>
                  </View>
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
                      startingValue={item?.rating}
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
                      ({Number(item?.rating)})
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={async () => {
              setLoading(true);
              getOrders(user?.token, setLoading);
              const { data } = await getListProductsFn(
                {
                  latitude: location.latitude,
                  longitude: location.longitude,
                },
                user?.token,
                setLoading
              );
              console.log("list porducts 2j-> ", data);
              setForMyCar(data.data);
              setMostSells(data.data);
            }}
          />
        }
      >
        {renderHeader()}

        <SliderBanner data={banners} />

        {renderCategories()}
        {renderPopularRestaurants()}
        {renderNearByYou()}
      </ScrollView>
    </SafeAreaView>
  );
}
