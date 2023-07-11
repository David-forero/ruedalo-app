import { View, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../constants";
import dayjs from 'dayjs';
import { useNavigation } from "@react-navigation/native";
require('dayjs/locale/es')

var relativeTiem = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTiem)

export default function NotificationCategory({ icon, title, subtitle, createdAt, id, objective }) {
    const navigation = useNavigation();

    const redirect = (objective, id) => { 
        // alert(objective)
        if (objective === "order") {
            navigation.navigate("Order", {id})
        }
     }

    return (
        <TouchableOpacity
            onPress={() => redirect(objective, id)}
            style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                borderColor: COLORS.lightGray,
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 16,
                paddingVertical: 19,
                marginBottom: 15,
            }}
        >
            {icon}
            <View style={{ marginLeft: 15, width: '85%' }}>
                <Text
                    style={{
                        ...FONTS.Roboto_700Bold,
                        fontSize: 16,
                        color: COLORS.black,
                        textTransform: "capitalize",
                        marginBottom: 3,
                    }}
                >
                    {title}
                </Text>
                <Text
                    style={{
                        ...FONTS.Roboto_400Regular,
                        fontSize: 14,
                        color: COLORS.gray2,
                    }}
                >
                    {subtitle}
                </Text>

                <Text
                    style={{
                        ...FONTS.Roboto_400Regular,
                        fontSize: 14,
                        color: COLORS.orange,
                        marginTop: 5
                    }}
                >
                    {dayjs(createdAt).locale('es').fromNow()}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
