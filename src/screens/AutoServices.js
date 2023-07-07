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
import { Rating, AirbnbRating } from "react-native-ratings";

import {
  COLORS,
  FONTS,
  SAFEAREAVIEW,
  category,
  dummyData,
} from "../common/constants";
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

const banners = [
  {
    image: require("../assets/images/banners/banner5.jpg"),
  },

  {
    image: require("../assets/images/banners/banner6.jpg"),
  },
];

const AutoServices = () => {
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [selectCategory, setSelectCategory] = useState(1);
  const { myPlace, location, loadingLocation } = useStoreContext();
  const [bannerServices, setBannerServices] = useState(null);

  const { populars, setPopulars, mostSells, setMostSells, getListServicessFn } =
    useServicesContext();
  const { getBannersFn } = useUserContext();

  useEffect(() => {
    async function init() {
      setLoading(true);
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
        <View className="ml-3 flex-row mt-3 mb-4">
          <Pin />
          <Text
            style={{
              marginLeft: 12,
              ...FONTS.Roboto_400Regular,
              fontSize: 14,
            }}
            onPress={() => {
              if (!myPlace) {
                navigation.navigate("Selectlocation");
              }
            }}
          >
            {loadingLocation ? (
              "Cargando..."
            ) : (
              <>
                {myPlace
                  ? `${myPlace[0]?.region} ${myPlace[0]?.subregion} ${myPlace[0]?.postalCode} `
                  : "Activar mi ubicación"}
              </>
            )}
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
            onPress={() => navigation.navigate("Filter")}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 15,
            }}
          >
            <Filter />
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
                uri: "https://backend.ruedalo.app/api/avatar/" + item?.avatar,
              }}
              style={{
                height: 136,
                width: "100%",
                flexDirection: "row",
              }}
              imageStyle={{
                borderRadius: 15,
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.white,
                  paddingHorizontal: 8,
                  alignSelf: "flex-start",
                  alignItems: "center",
                  flexDirection: "row",
                  borderRadius: 15,
                  top: 10,
                  left: 10,
                  height: 24,
                }}
              >
                <Text
                  style={{
                    marginRight: 4,
                    ...FONTS.Roboto_400Regular,
                    fontSize: 12,
                    color: COLORS.black,
                  }}
                >
                  {item.rating}
                </Text>

                <View>
                  <Star />
                </View>
                <Text
                  style={{
                    marginLeft: 4,
                    ...FONTS.Roboto_400Regular,
                    fontSize: 12,
                    color: COLORS.gray2,
                  }}
                >
                  ({Number(item.rating)})
                </Text>
              </View>
            </ImageBackground>
            <View style={{ padding: 12, flex: 1 }}>
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
                style={{
                  ...FONTS.Roboto_500Medium,
                  fontSize: 12,
                  //   marginBottom: 8,
                }}
                numberOfLines={1}
              >
                {item.registered_name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              ></View>
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
              textTransform: "capitalize",
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
                uri: "https://backend.ruedalo.app/api/avatar/" + item.avatar[0],
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
                {item.description}
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
                  ({item?.rating})
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
