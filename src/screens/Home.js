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
import { RefreshControl } from "react-native-gesture-handler";
import { useUserContext } from "../context/UserContext";
import Logo from "../assets/icons/logo.png";

export default function Home() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [selectCategory, setSelectCategory] = useState(1);
  const [bannerStore, setBannerStore] = useState(null);
  const { user, notificationCounts } = useAuthContext();
  const [searchText, setSearchText] = useState("");
  const {
    getListProductsFn,
    forMyCar,
    setForMyCar,
    mostSells,
    setMostSells,
    location  } = useStoreContext();
  const { getBannersFn } = useUserContext();
  //My hooks

  useEffect(() => {
    async function init() {
      setLoading(true);
      let banners = await getBannersFn("product", user?.token);
      setBannerStore(banners);
      let coordenates = {
        latitude: location?.latitude || null,
        longitude: location?.longitude || null,
      };
      const { data } = await getListProductsFn(
        coordenates?.latitude ? coordenates : {},
        user?.token,
        setLoading
      );
      setForMyCar(data.data);
      setMostSells(data.data);
    }
    init();
  }, [location, user?.token]);

  function renderHeader() {
    return (
      <View
        style={{
          marginTop: 10,
          paddingLeft: 20,
        }}
      >
        <View className="flex-row items-center justify-between mb-5 pr-5">
          <Image source={Logo} className="w-10 h-10 ml-2" />

          <View className="ml-3 flex-row">
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
              style={{
                elevation: 7,
                marginRight: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {
                notificationCounts > 0 ? (
                  <Text className="absolute text-[12px] -top-1 -right-1 h-3 w-3 bg-blue-500 text-center rounded-full text-white flex justify-center items-center font-bold"></Text>
                ) : null
              }
              <Ionicons
                name="ios-notifications-outline"
                size={22}
                color="#2d2d2d"
              />
            </TouchableOpacity>
          </View>
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
            value={searchText}
            onChangeText={setSearchText}
            style={{ flex: 1, paddingLeft: 7 }}
            onSubmitEditing={() =>
              navigation.navigate("ListProducts", {
                query: searchText,
                location,
                titleHeader: "Productos",
                isProduct: true,
              })
            }
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ListProducts", {
                query: searchText,
                location,
                titleHeader: "Productos",
                isProduct: true,
              })
            }
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
                      "https://backend.dev.ruedalo.app/api/product/" +
                      item.image[0],
                  }}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 10,
                    marginRight: 20,
                  }}
                  resizeMode="contain"
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
                      {item.address}
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
              const { data } = await getListProductsFn(
                {
                  latitude: location?.latitude,
                  longitude: location?.longitude,
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

        <SliderBanner data={bannerStore || []} />

        {renderCategories()}
        {renderPopularRestaurants()}
        {renderNearByYou()}
      </ScrollView>
    </SafeAreaView>
  );
}
