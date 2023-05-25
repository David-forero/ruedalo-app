import { Image, Text, TouchableOpacity, View } from 'react-native'
import { FONTS, COLORS } from "../constants";

const CategoryFilter = ({ id, image, name, index, selectCategory, setSelectCategory }) => {

    return (
        <TouchableOpacity onPress={() => setSelectCategory(id)}>
            <View style={{ marginLeft: index === 0 ? 0 : 20 }} >
                <View
                    className={` ${selectCategory == id ? 'bg-gray-300' : 'bg-gray-100'}`}
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
                        source={image}
                        style={{
                            height: 28,
                            width: "100%",
                            // tintColor:
                            //     selectCategory == id
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
                        color:
                            selectCategory == id
                                ? COLORS.orange
                                : COLORS.gray2,
                    }}
                >
                    {name} 
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default CategoryFilter