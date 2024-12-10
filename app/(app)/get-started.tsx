import { Text, View } from "@/components/Themed";
import fonts, { tokens } from "@/constants/Font";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  SharedValue,
  Easing,
  withDelay,
  withSequence,
} from "react-native-reanimated";
import React from "react";
import AnimatedOuter from "@/components/AnimatedOuter";


export default function GetStarted() {
  const imageValues = {
    opacity: useSharedValue(0),
    scale: useSharedValue(1.1),
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
    translateY: useSharedValue(10),
    opacity: useSharedValue(0),
  };

  const createAnimatedStyle = (values: {[key: string]: SharedValue<number>}) => {
    return useAnimatedStyle(() => {
      const transform = [];
      
      if ('translateY' in values) {
        transform.push({ translateY: values.translateY.value });
      }
      
      if ('scale' in values) {
        transform.push({ scale: values.scale.value });
      }

      return {
        transform,
        opacity: 'opacity' in values ? values.opacity.value : 1,
      };
    });
  };

  const styles = {
    image: createAnimatedStyle(imageValues),
    title: createAnimatedStyle(titleValues),
    text: createAnimatedStyle(textValues),
    button: createAnimatedStyle(buttonValues),
  };

  // Initial animation
  React.useEffect(() => {
    setTimeout(() => {
      animateImageIn(imageValues);
      animateTitleIn(titleValues);
      animateTextIn(textValues);
      animateButtonIn(buttonValues);
    }, 600);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
      <Animated.Image
        source={require("@/assets/images/app/coffee1.png")}
        style={[
          { width: "100%", height: "70%", position: "absolute", top: 0, transform: [{ scale: 1 }] },
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
        <Animated.View style={styles.button}>
          <Button
            href="/(app)/(tabs)"
            title="Get started"
            onBeforeNavigation={async () => {
              animateImageOut(imageValues);
              animateTitleOut(titleValues);
              animateTextOut(textValues);
              animateButtonOut(buttonValues);

              await new Promise((resolve) => setTimeout(resolve, 700));
            }}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

// Animation functions for Image
const animateImageIn = (values: {[key: string]: SharedValue<number>}) => {
  values.opacity.value = withDelay(0, withTiming(1, {
    duration: 1000,
    easing: Easing.out(Easing.quad)
  }));
  values.scale.value = withDelay(0, withTiming(1, {
    duration: 800,
    easing: Easing.out(Easing.quad)
  }));
};

const animateImageOut = (values: {[key: string]: SharedValue<number>}) => {
  values.opacity.value = withDelay(0, withTiming(0, {
    duration: 200,
    easing: Easing.ease
  }));
  values.scale.value = withDelay(0, withTiming(1.1, {
    duration: 300,
    easing: Easing.ease
  }));
};

// Animation functions for Title
const animateTitleIn = (values: {[key: string]: SharedValue<number>}) => {
  values.translateY.value = withDelay(800, withTiming(0, {
    duration: 600,
    easing: Easing.out(Easing.quad)
  }));
  values.opacity.value = withDelay(800, withTiming(1, {
    duration: 600,
    easing: Easing.out(Easing.quad)
  }));
};

const animateTitleOut = (values: {[key: string]: SharedValue<number>}) => {
  values.translateY.value = withDelay(100, withTiming(0, {
    duration: 200,
    easing: Easing.ease
  }));
  values.opacity.value = withDelay(100, withTiming(0, {
    duration: 200,
    easing: Easing.ease
  }));
};

// Animation functions for Text
const animateTextIn = (values: {[key: string]: SharedValue<number>}) => {
  values.translateY.value = withDelay(900, withTiming(0, {
    duration: 600,
    easing: Easing.out(Easing.quad)
  }));
  values.opacity.value = withDelay(900, withTiming(1, {
    duration: 600,
    easing: Easing.out(Easing.quad)
  }));
};

const animateTextOut = (values: {[key: string]: SharedValue<number>}) => {
  values.translateY.value = withDelay(200, withTiming(0, {
    duration: 300,
    easing: Easing.ease
  }));
  values.opacity.value = withDelay(200, withTiming(0, {
    duration: 200,
    easing: Easing.ease
  }));
};

// Animation functions for Button
const animateButtonIn = (values: {[key: string]: SharedValue<number>}) => {
  values.translateY.value = withDelay(1100, withTiming(0, {
    duration: 500,
    easing: Easing.out(Easing.quad)
  }));
  values.opacity.value = withDelay(1100, withTiming(1, {
    duration: 500,
    easing: Easing.out(Easing.quad)
  }));

};

const animateButtonOut = (values: {[key: string]: SharedValue<number>}) => {
  values.translateY.value = withDelay(400, withTiming(0, {
    duration: 300,
    easing: Easing.ease
  }));
  values.opacity.value = withDelay(400, withTiming(0, {
    duration: 200,
    easing: Easing.ease
  }));
};