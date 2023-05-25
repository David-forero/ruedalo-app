import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SAFEAREAVIEW } from '../common/constants'

const AutoServices = () => {
  return (
    <SafeAreaView
      style={{ ...SAFEAREAVIEW.AndroidSafeArea }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <Text>AutoServices</Text>

      </ScrollView>
    </SafeAreaView>
  )
}

export default AutoServices

const styles = StyleSheet.create({})