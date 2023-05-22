import * as React from "react";
import { View, Dimensions, Text, Image, ImageBackground } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

const window =  Dimensions.get("window");

const PAGE_WIDTH = window.width;
const colors = [
  {
    image: require('../../assets/images/banners/banner1.jpg')
  },
  {
    image:  require('../../assets/images/banners/banner3.jpg')
  },

  {
    image:  require('../../assets/images/banners/banner2.jpg')
  },

  {
    image:  require('../../assets/images/banners/banner4.jpg')
  },
];

const SliderBanner = ({data, autoPlay = true, isVertical = false }) => {
  const [snapEnabled, setSnapEnabled] = React.useState(true);
  const progressValue = useSharedValue(0);
  const baseOptions = isVertical
    ? ({
      vertical: true,
      width: PAGE_WIDTH * 0.86,
      height: '170px',
    })
    : ({
      vertical: false,
      width: PAGE_WIDTH,
      height: PAGE_WIDTH * 0.4,
    });

  return (
    <View
      className="items-center"
    >
      <Carousel
        {...baseOptions}
        className="h-[170px]"
        loop
        // pagingEnabled={true}
        snapEnabled={snapEnabled}
        autoPlay={autoPlay}
        autoPlayInterval={2000}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={colors}
        renderItem={({ item }) => (
          <Image  
            source={item.image}
            className="w-full h-full"
            resizeMode="contain"
            resizeMethod="scale"
          />
        )}
      />
      {/* {!!progressValue && (
        <View
          style={
            isVertical
              ? {
                flexDirection: "column",
                justifyContent: "space-between",
                width: 10,
                alignSelf: "center",
                position: "absolute",
                right: 5,
                top: 40,
              }
              : {
                flexDirection: "row",
                justifyContent: "space-between",
                width: 100,
                alignSelf: "center",
              }
          }
        >
          {colors.map((backgroundColor, index) => {
            return (
              <PaginationItem
                backgroundColor={backgroundColor}
                animValue={progressValue}
                index={index}
                key={index}
                isRotate={isVertical}
                length={colors.length}
              />
            );
          })}
        </View>
      )} */}
     
    </View>
  );
}

export default SliderBanner