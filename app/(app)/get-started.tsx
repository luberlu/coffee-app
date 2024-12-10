import { Text, View } from "@/components/Themed";
import fonts, { tokens } from "@/constants/Font";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  SharedValue,
  interpolate,
} from "react-native-reanimated";
import React from "react";
import AnimatedOuter from "@/components/AnimatedOuter";
import { calcBezier } from "@/utils/bezier";
import { animations } from "@/components/animations/get-started";

export default function GetStarted() {
  const imageValues = {
    opacity: useSharedValue(0),
    scale: useSharedValue(0),
  };

  const titleValues = {
    translateY: useSharedValue(10),
    opacity: useSharedValue(0),
  };

  const textValues = {
    translateY: useSharedValue(10),
    opacity: useSharedValue(0),
  };

  const buttonValues = {
    translateY: useSharedValue(0),
    translateX: useSharedValue(0),
    opacity: useSharedValue(0),
  };

  const viewValues = {
    translateY: useSharedValue(0),
    translateX: useSharedValue(0),
  };

  const createAnimatedStyle = (values: {
    [key: string]: SharedValue<number>;
  }) => {
    return useAnimatedStyle(() => {
      const transform = [];

      if ("translateY" in values) {
        transform.push({ translateY: values.translateY.value });
      }

      if ("translateX" in values) {
        transform.push({ translateX: values.translateX.value });
      }

      if ("scale" in values) {
        transform.push({
          scale: interpolate(values.scale.value, [0, 1], [1.1, 1]),
        });
      }

      return {
        transform,
        opacity: "opacity" in values ? values.opacity.value : 1,
      };
    });
  };

  const styles = {
    image: createAnimatedStyle(imageValues),
    title: createAnimatedStyle(titleValues),
    text: createAnimatedStyle(textValues),
    button: createAnimatedStyle(buttonValues),
    view: useAnimatedStyle(() => {
      const progress = viewValues.translateY.value;

      return {
        transform: [
          {
            translateY: interpolate(
              progress,
              [0, 1],
              [
                viewValues.translateY.value,
                calcBezier(viewValues.translateY.value, 0, 45, 50),
              ],
              "clamp"
            ),
          },
          {
            translateX: interpolate(
              progress,
              [0, 1],
              [
                viewValues.translateY.value,
                calcBezier(viewValues.translateY.value, 0, -300, -500),
              ],
              "clamp"
            ),
          },
        ],
      };
    }),
  };

  // Initial animation
  React.useEffect(() => {
    setTimeout(() => {
      animations.image.in(imageValues);
      animations.title.in(titleValues);
      animations.text.in(textValues);
      animations.button.in(buttonValues);
    }, 600);
  }, []);

  return (
    <Animated.View
      style={[{ flex: 1, justifyContent: "flex-end", backgroundColor: "black" }, styles.view]}
    >
      <Animated.Image
        source={require("@/assets/images/app/coffee1.png")}
        style={[
          {
            width: "100%",
            height: "70%",
            position: "absolute",
            top: 0,
            left: 0,
            transform: [{ scale: 1 }],
          },
          styles.image,
        ]}
        resizeMode="cover"
      />
      <Animated.View
        style={[
          {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            padding: 30,
            paddingBottom: 80,
          },
        ]}
      >
        <AnimatedOuter animatedStyle={styles.title}>
          <Text style={tokens.title}>
            Fall in Love with{"\n"}
            Coffee in Blissful{"\n"}
            Delight!
          </Text>
        </AnimatedOuter>
        <AnimatedOuter animatedStyle={styles.text}>
          <Text
            style={{
              fontSize: fonts.fontSize.sm,
              color: Colors.dark.quaternary,
              textAlign: "center",
            }}
          >
            Welcome to our cozy coffee corner, where{"\n"}
            every cup is a delightful for you.
          </Text>
        </AnimatedOuter>
        <Animated.View style={[styles.button, { width: "100%" }]}>
          <Button
            href="/(app)/(tabs)"
            title="Get started"
            onBeforeNavigation={async () => {
              animations.view.out(viewValues);
              animations.image.out(imageValues);
              animations.title.out(titleValues);
              animations.text.out(textValues);
              animations.button.out(buttonValues);

              await new Promise((resolve) => setTimeout(resolve, 400));
            }}
          />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}
