import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { CardCatalog, Header } from "../common/components";
import {
  COLORS,
  FONTS,
  SIZES,
  SAFEAREAVIEW,
  category,
  dummyData,
} from "../common/constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthContext } from "../context/AuthContext";
import { useStoreContext } from "../context/StoreContext";

const ListProducts = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { query, location } = route.params;
  const { user } = useAuthContext();
  const { searchFn, searchList } = useStoreContext();
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("el query ->", query);
    if (query) {
      setLoading(true);
      let params = {
        query,
        latitude: location.latitude,
        longitude: location.longitude,
        limit: 30,
      };
      searchFn(params, user?.token, setLoading);
    }
  }, [query]);

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Productos" onPress={() => navigation.goBack()} />

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
            style={{ flex: 1, paddingLeft: 7 }}
          />
          <TouchableOpacity
            onPress={() => {}}
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
          {loading ? null : (
            <>
              {!searchList
                ? searchList?.map((item) => (
                    <View key={item.id}>
                      {/* <CardCatalog
                        image={item.image}
                        name={item.name}
                        price={item.price}
                        description={item.description}
                      /> */}
                      <View className="h-1 w-full border-b-2 border-slate-200">
                        {/* HR */}
                      </View>
                    </View>
                  ))
                : null}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListProducts;
