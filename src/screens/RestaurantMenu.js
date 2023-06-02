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
import { COLORS, FONTS, SIZES, SAFEAREAVIEW, category } from "../common/constants";
import { useState } from "react";
import { Rating } from "react-native-ratings";

export default function RestaurantMenu() {
    const [selectCategory, setSelectCategory] = useState(0);

    const route = useRoute();
    const navigation = useNavigation();
    const { restaurant, dishes } = route.params;

    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Header
                    title="Catálogo de producos"
                    onPress={() => navigation.goBack()}
                />
                <Image source={restaurant.image} style={styles.image} className="rounded-b-lg" />

                <View style={styles.container}>
                    <View className="flex-row justify-between items-center mb-2">
                        <View>
                            <Text className="text-gray-700 font-bold text-lg" >{restaurant.name}</Text>

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
                                    startingValue={restaurant.rating}
                                />
                                <Text
                                    style={{
                                        marginLeft: 5.5,
                                        ...FONTS.Roboto_500Medium,
                                        fontSize: 12,
                                        color: COLORS.black,
                                    }}
                                >
                                    {restaurant.rating}
                                </Text>
                            </View>
                        </View>

                        <View className="bg-green-300 p-2 rounded-full">
                            <Text className="text-green-600 text-[12px] font-semibold">
                                Abierto
                            </Text>
                        </View>
                    </View>

                    <View>
                        <Text className="text-gray-500 text-sm">
                            {restaurant.description}
                        </Text>


                    </View>
                </View>

                {/* START CATEGORY */}
                <View className="mt-5">
                    <FlatList
                        data={category}
                        horizontal={true}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) =>
                            <CategoryFilter id={item.id} image={item.image} name={item.name} index={index} setSelectCategory={setSelectCategory} selectCategory={selectCategory} />
                        }
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
                    {restaurant.dishes.map(item => (
                        <CardCatalog key={item.id} image={item.image} name={item.name} price={item.price} description={item.description} />
                    ))}
                </View>
                {/* END CATALOG */}


                {/* Button Basket */}
                {/* <TouchableOpacity className="bg-slate-500 w-14 h-14 absolute bottom-11 items-center rounded-full right-3 justify-center" >
                        <Text>BASKET</Text>
                </TouchableOpacity> */}



            </ScrollView>
        </SafeAreaView>
    );
}

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
        height: 200
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
        letterSpacing: 0.7
    }
});