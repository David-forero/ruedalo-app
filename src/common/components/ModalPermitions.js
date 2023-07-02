import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal";
import { Linking } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

const ModalPermitions = ({showModal, setShowModal, title, description}) => {
    return (
        <Modal
          isVisible={showModal}
          onBackdropPress={setShowModal}
          hideModalContentWhileAnimating={true}
          backdropTransitionOutTiming={0}
          style={{ margin: 0 }}
          animationIn="zoomIn"
          animationOut="zoomOut"
        >
          <View
            style={{
              width: SIZES.width - 60,
              backgroundColor: COLORS.white,
              marginHorizontal: 30,
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 34,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                ...FONTS.Roboto_700Bold,
                fontSize: 16,
                marginBottom: 10,
              }}
            >
              {title}
            </Text>

            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                marginBottom: 26,
              }}
            >
              {description}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 130,
                  height: 40,
                  backgroundColor: COLORS.lightRed,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 7.5,
                }}
                onPress={() => setShowModal(false)}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.Roboto_700Bold,
                    fontSize: 16,
                    color: COLORS.red,
                  }}
                >
                  Más tarde
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 130,
                  height: 40,
                  backgroundColor: COLORS.black2,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 7.5,
                }}
                onPress={() => {
                  setShowModal(false);
                  Linking.openSettings();
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.Roboto_700Bold,
                    fontSize: 16,
                  }}
                >
                  Habilitar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
}

export default ModalPermitions

const styles = StyleSheet.create({})