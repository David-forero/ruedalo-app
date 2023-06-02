import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useState } from "react";
import { CardCatalog, Header } from "../common/components";
import { COLORS, FONTS, SIZES, SAFEAREAVIEW, category, dummyData } from "../common/constants";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ListProducts = () => {
  // const route = useRoute();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Header
          title="Productos"
          onPress={() => navigation.goBack()}
        />

        <View
          style={{
            height: 40,
            borderRadius: 10,
            flex: 1,
            marginHorizontal: 22,
            alignItems: "center",
            flexDirection: "row",
            paddingLeft: 14,
            marginTop: 12
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
          {dummyData[0].dishes.map(item => (
            <View key={item.id}>
              <CardCatalog image={item.image} name={item.name} price={item.price} description={item.description} />
              <View className="h-1 w-full border-b-2 border-slate-200">
                {/* HR */}
              </View>
            </View>
          ))}

          {dummyData[0].dishes.map(item => (
            <View key={item.id}>
              <CardCatalog image={item.image} name={item.name} price={item.price} description={item.description} />
              <View className="h-1 w-full border-b-2 border-slate-200">
                {/* HR */}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ListProducts

const styles = StyleSheet.create({})