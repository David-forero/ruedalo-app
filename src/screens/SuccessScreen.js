import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { SuccessTwo, Button } from "../common/components";
import { COLORS, FONTS, SAFEAREAVIEW } from "../common/constants";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function SuccessScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { screen = '', title, description, titleButton } = route.params;
    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 30,
                    flexGrow: 1,
                    justifyContent: "center",
                }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ alignSelf: "center", marginBottom: 36 }}>
                    <SuccessTwo />
                </View>
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.Roboto_700Bold,
                        fontSize: 22,
                        color: COLORS.black2,
                        marginBottom: 10,
                    }}
                >
                    {title}
                </Text>
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.Roboto_400Regular,
                        fontSize: 16,
                        color: COLORS.gray2,
                        marginBottom: 21,
                    }}
                >
                  {description}
                </Text>
               
                <Button
                    title={titleButton}
                    onPress={() => navigation.navigate(screen)}
                    containerStyle={{ backgroundColor: COLORS.orange }}
                    textStyle={{ color: COLORS.white }}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
