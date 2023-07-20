import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { CardCatalog, Header } from "../common/components";
import { SIZES, SAFEAREAVIEW } from "../common/constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthContext } from "../context/AuthContext";
import { useStoreContext } from "../context/StoreContext";

const ListProducts = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { query, location, titleHeader, isProduct } = route.params;
  const { user } = useAuthContext();
  const { searchFn, searchList } = useStoreContext();
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setSearchText(query);
      setLoading(true);
      let myParams = {
        query,
        latitude: location.latitude,
        longitude: location.longitude,
        limit: 30,
      };
      searchFn(myParams, user?.token, setLoading, isProduct);
    }
  }, [query]);

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title={titleHeader} onPress={() => navigation.goBack()} />

        <View
          style={{
            height: 40,
            borderRadius: 10,
            flex: 1,
            marginHorizontal: 22,
            alignItems: "center",
            flexDirection: "row",
            paddingLeft: 14,
            marginTop: 12,
          }}
          className="bg-gray-100"
        >
          {/* <Search /> */}
          <TextInput
            placeholder="Buscar..."
            value={searchText}
            onChangeText={setSearchText}
            style={{ flex: 1, paddingLeft: 7 }}
            onSubmitEditing={() => {
              setLoading(true);

              let myParams = {
                query: searchText,
                latitude: location.latitude,
                longitude: location.longitude,
                limit: 30,
              };
              searchFn(myParams, user?.token, setLoading, isProduct);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setLoading(true);

              let myParams = {
                query: searchText,
                latitude: location.latitude,
                longitude: location.longitude,
                limit: 30,
              };
              searchFn(myParams, user?.token, setLoading, isProduct);
            }}
            style={{
              paddingHorizontal: 14,
            }}
          >
            {/* <Filter /> */}
            <Ionicons name="search-outline" size={16} color="#2d2d2d" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingHorizontal: 30,
            paddingVertical: SIZES.paddingTop_01,
          }}
        >
          {loading ? (
            <Text className="text-center text-gray-900 font-bold text-lg mt-10">
              Buscando...
            </Text>
          ) : (
            <>
              {searchList?.length > 0 ? (
                searchList.map((item) => (
                  <View key={item.id}>
                    <CardCatalog
                      image={item.image}
                      name={item.title || item.description}
                      price={item.price}
                      description={item.description}
                      type={isProduct ? "product" : "service"}
                    />
                    <View className="h-1 w-full border-b-2 border-slate-200">
                      {/* HR */}
                    </View>
                  </View>
                ))
              ) : (
                <Text className="text-center text-gray-900 font-bold text-lg mt-10">
                  No hay ningún producto con esa busqueda...
                </Text>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListProducts;
