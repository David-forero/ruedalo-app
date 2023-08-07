import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";
import { Rating } from "react-native-ratings";

import { COLORS, FONTS, SAFEAREAVIEW } from "../common/constants";
import {
  Pin,
  Star,
  DeliveryMan,
  Clock,
  PinTwo,
  Filter,
  Heading,
  SliderBanner,
  LoadingListOne,
} from "../common/components";
import { useServicesContext } from "../context/ServicesContext";
import { useAuthContext } from "../context/AuthContext";
import { useStoreContext } from "../context/StoreContext";
import { useUserContext } from "../context/UserContext";
import Logo from "../assets/icons/ruedalo3.png";
import { Ionicons } from "@expo/vector-icons";
import categoriesIcons from "../assets/icons/categories";

const AutoServices = () => {
  const navigation = useNavigation();
  const { user, notificationCounts } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const { location } = useStoreContext();
  const [bannerServices, setBannerServices] = useState(null);
  const [searchText, setSearchText] = useState("");
  const {
    getCategoryServicesFn,
    populars,
    setPopulars,
    mostSells,
    setMostSells,
    getListServicessFn,
    categoriesServices,
  } = useServicesContext();
  const { getBannersFn } = useUserContext();

  useEffect(() => {
    async function init() {
      setLoading(true);
      getCategoryServicesFn(user?.token, setLoading);

      let banners = await getBannersFn("service", user?.token);
      setBannerServices(banners);
      const { data } = await getListServicessFn(
        {
          latitude: location?.latitude,
          longitude: location?.longitude,
        },
        user?.token,
        setLoading
      );
      setPopulars(data.data);
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
        <View className="flex-row items-center justify-between mb-5 pr-5">
          <Image
            source={Logo}
            resizeMode="contain"
            className="w-36 h-10 ml-2"
          />

          <View className="ml-3 flex-row">
            <TouchableOpacity
              onPress={() => {
                setNotificationCounts(0);
                navigation.navigate("Notifications");
              }}
              style={{
                elevation: 7,
                marginRight: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {notificationCounts > 0 ? (
                <Text className="absolute text-[12px] -top-1 -right-1 h-3 w-3 bg-blue-500 text-center rounded-full text-white flex justify-center items-center font-bold"></Text>
              ) : null}
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
                titleHeader: "Servicios",
                isProduct: false,
              })
            }
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ListProducts", {
                query: searchText,
                location,
                titleHeader: "Servicios",
                isProduct: false,
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SubCategory", {
              id: item.id,
              name: item.name,
              type: "service",
            })
          }
        >
          <View style={{ marginLeft: index === 0 ? 0 : 36 }}>
            <View
              className="bg-gray-100"
              style={{
                width: 48,
                height: 48,
                borderRadius: 35,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 7,
                marginBottom: 11,
              }}
            >
              <Image
                source={categoriesIcons[item.icon ? item.icon : "notImage"]}
                style={{
                  height: 28,
                  width: "100%",
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
                color: COLORS.gray2,
                width: 65,
              }}
              numberOfLines={1}
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
            data={categoriesServices}
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
    function renderFood(item, index) {
      return (
        <Shadow
          startColor={COLORS.shadowStartColor}
          finalColor={COLORS.shadowFinalColor}
          distance={COLORS.shadowDistance}
          viewStyle={{ marginRight: 15 }}
        >
          <TouchableOpacity
            style={{
              width: 266,
              height: 232,
              backgroundColor: COLORS.white,
              borderRadius: 15,
            }}
            onPress={() =>
              navigation.navigate("ServicesDetails", {
                id: item.id,
              })
            }
          >
            <ImageBackground
              source={{
                uri: `https://backend.dev.ruedalo.app/api/${
                  item?.image?.length > 0 ? "service" : "avatar"
                }/${
                  item?.image?.length > 0
                    ? item.image[0]
                    : item?.avatar?.length > 0
                    ? item.avatar[0]
                    : "default_avatar"
                }`,
              }}
              style={{
                height: 136,
                width: "100%",
                flexDirection: "row",
              }}
              imageStyle={{
                borderRadius: 15,
              }}
            ></ImageBackground>
            <View style={{ padding: 12, flex: 1 }}>
              <View className="flex-row items-center justify-between mb-2">
                <Text
                  numberOfLines={2}
                  style={{
                    ...FONTS.Roboto_400Regular,
                    fontSize: 16,
                    textTransform: "capitalize",
                    color: COLORS.black,
                    marginBottom: 2,
                    lineHeight: 16 * 1,
                  }}
                >
                  {item.description}
                </Text>

                <Text
                  numberOfLines={1}
                  className="font-bold text-orange-600"
                >
                  ${item.price}
                </Text>
              </View>

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
                  {item.registered_name}
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
            </View>
          </TouchableOpacity>
        </Shadow>
      );
    }

    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 30,
          }}
        >
          <Text
            style={{
              ...FONTS.Roboto_700Bold,
              fontSize: 20,
            }}
          >
            Servicios más populares
          </Text>
        </View>
        {loading || !populars ? (
          <FlatList
            contentContainerStyle={{
              paddingLeft: 30,
              paddingVertical: 21,
            }}
            data={[1, 2, 3, 4]}
            keyExtractor={(item) => item.id}
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
            data={populars?.list_service}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => renderFood(item, index)}
          />
        )}
      </View>
    );
  }

  function renderNearByYou() {
    return (
      <View style={{ paddingHorizontal: 30 }}>
        <Heading
          title="Cerca de ti"
          fontStyle={{ textTransform: "none" }}
          containerStyle={{ paddingHorizontal: 0, marginBottom: 21 }}
        />

        {mostSells?.list_service.map((item, index) => (
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
              navigation.navigate("ServicesDetails", {
                id: item.id,
              })
            }
          >
            <Image
              source={{
                uri: `https://backend.dev.ruedalo.app/api/${
                  item?.image?.length > 0 ? "service" : "avatar"
                }/${
                  item?.image?.length > 0
                    ? item.image[0]
                    : item?.avatar?.length > 0
                    ? item.avatar[0]
                    : "default_avatar"
                }`,
              }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 10,
                marginRight: 20,
              }}
              resizeMode="stretch"
            />
            <View style={{ flex: 1 }}>
              <View className="flex-row justify-between items-center">
                <Text
                  style={{
                    ...FONTS.Roboto_500Medium,
                    fontSize: 16,
                    marginBottom: 2,
                    lineHeight: 16 * 1,
                    textTransform: "capitalize",
                  }}
                  numberOfLines={1}
                  className="w-2/3"
                >
                  {item.description}
                </Text>
                <Text
                  style={{
                    ...FONTS.Roboto_500Medium,
                    fontSize: 14,
                    marginBottom: 12,
                    color: COLORS.orange,
                  }}
                  numberOfLines={1}
                >
                  {`$${item.price}`}
                </Text>
              </View>
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
                  {item.registered_name}
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
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {renderHeader()}

        <SliderBanner data={bannerServices || []} />

        {renderCategories()}
        {renderPopularRestaurants()}
        {renderNearByYou()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AutoServices;
