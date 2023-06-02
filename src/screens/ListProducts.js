import { StyleSheet, Text, View } from 'react-native'
import { useState } from "react";
import { CardCatalog } from "../common/components";
import { COLORS, FONTS, SIZES, SAFEAREAVIEW, category, dummyData } from "../common/constants";

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
            paddingHorizontal: 30,
            paddingVertical: SIZES.paddingTop_01,
          }}
        >
          {dummyData[0].dishes.map(item => (
            <CardCatalog key={item.id} image={item.image} name={item.name} price={item.price} description={item.description} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ListProducts

const styles = StyleSheet.create({})