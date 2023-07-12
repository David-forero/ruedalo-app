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

import {
  CardCatalog,
  CategoryFilter,
  Header,
  Heading,
} from "../common/components";
import {
  COLORS,
  FONTS,
  SIZES,
  SAFEAREAVIEW,
  category,
} from "../common/constants";
import { useEffect, useState } from "react";
import { Rating } from "react-native-ratings";
import { useServicesContext } from "../context/ServicesContext";
import { useAuthContext } from "../context/AuthContext";

export default function RestaurantMenu() {
  const [selectCategory, setSelectCategory] = useState(null);
  const [loadingCommerce, setLoadingCommerce] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const {
    getCommerceFn,
    commerce,
    listServicesCommmerceFn,
    listProductsCommmerceFn,
    catalog,
  } = useServicesContext();
  const { user } = useAuthContext();
  const route = useRoute();
  const navigation = useNavigation();
  const { id, typeCommerce } = route.params;
  const [tabCommerce, setTabCommerce] = useState("product");

  useEffect(() => {
    setLoadingCommerce(true);
    getCommerceFn(id.toString(), user?.token, setLoadingCommerce);
    getProducts();
  }, [id]);

  const getProducts = () => {
    listProductsCommmerceFn(
      id,
      selectCategory,
      user?.token,
      setLoadingProducts
    );
  };

  const getServices = () => {
    listServicesCommmerceFn(
      id,
      selectCategory,
      user?.token,
      setLoadingProducts
    );
  };

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          title="Detalles de la tienda"
          onPress={() => navigation.goBack()}
        />
        {loadingCommerce ? (
          <Text>Cargando...</Text>
        ) : (
          <>
            <Image
              source={{
                uri:
                  "https://backend.ruedalo.app/api/avatar/" +
                  commerce?.avatar[0],
              }}
              style={styles.image}
              className="rounded-b-lg"
            />

            <View style={styles.container}>
              <View className="flex-row justify-between items-center mb-2">
                <View>
                  <Text className="text-gray-700 font-bold text-lg">
                    {commerce?.registered_name}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Rating
                      type="star"
                      count={5}
                      defaultRating={commerce?.rating}
                      imageSize={12}
                      showRating={false}
                      isDisabled={false}
                      readonly={true}
                      startingValue={commerce?.rating}
                    />
                    <Text
                      style={{
                        marginLeft: 5.5,
                        ...FONTS.Roboto_500Medium,
                        fontSize: 12,
                        color: COLORS.black,
                      }}
                    >
                      {commerce?.rating}
                    </Text>
                  </View>
                </View>

                <View className="bg-green-300 p-2 rounded-full">
                  <Text className="text-green-600 text-[12px] font-semibold">
                    Abierto
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center justify-around space-x-3 mt-4">
                <TouchableOpacity onPress={() => {
                    setTabCommerce('product')
                    getProducts()
                }} className="w-2/6 h-8 bg-gray-900 items-center rounded-lg justify-center">
                  <Text className={`${tabCommerce === "product" ? 'text-orange-600' : 'text-white' } font-bold`}>Productos</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    setTabCommerce('service')
                    getServices()
                }} className="w-2/6 h-8 bg-gray-900 items-center rounded-lg justify-center">
                  <Text className={`${tabCommerce === "service" ? 'text-orange-600' : 'text-white'} font-bold`}>Servicios</Text>
                </TouchableOpacity>
              </View>

              {/* <View>
                        <Text className="text-gray-500 text-sm">
                       
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea eos asperiores fugit tempore, vero esse consequuntur quibusdam vitae labore error blanditiis doloremque ipsum hic modi sit non obcaecati quidem dolore est possimus sunt quos omnis totam tempora. Molestias, doloremque commodi!
                        </Text>


                    </View> */}
            </View>

            {/* START CATEGORY */}
            <View className="mt-5">
              <FlatList
                data={category}
                horizontal={true}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <CategoryFilter
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    index={index}
                    setSelectCategory={setSelectCategory}
                    selectCategory={selectCategory}
                  />
                )}
                contentContainerStyle={{ paddingLeft: 30 }}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            {/* END CATEGORY */}

            {/* START CATALOG */}

            <View
              style={{
                paddingHorizontal: 30,
                paddingVertical: SIZES.paddingTop_01,
              }}
            >
              {catalog ? (
                catalog?.map((item) => (
                  <CardCatalog
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    name={item.title}
                    price={item.price}
                    type={typeCommerce}
                    description={item.description}
                  />
                ))
              ) : (
                <Text>Cargando...</Text>
              )}
            </View>
            {/* END CATALOG */}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginHorizontal: 30,
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
