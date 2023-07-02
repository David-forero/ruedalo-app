import React from "react";
import { Modal, View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { COLORS } from "../../constants";

const LoadingFullScreen = ({ isLoading, message }) => {
  return (
    <Modal transparent visible={isLoading} onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" color={COLORS.orange} />
          {/* <Text className="mt-4 text-center">Iniciando session con google</Text> */}
        </View>
      </View>
    </Modal>
  );
};

export default LoadingFullScreen;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
  },
  activityIndicatorWrapper: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
