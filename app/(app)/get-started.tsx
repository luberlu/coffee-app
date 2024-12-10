import { Text, View } from "@/components/Themed";
import fonts, { tokens } from "@/constants/Font";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  SharedValue,
} from "react-native-reanimated";
import React from "react";
import AnimatedOuter from "@/components/AnimatedOuter";

interface AnimationConfig {
  translateY: SharedValue<number>;
  opacity: SharedValue<number>;
  scale: SharedValue<number>;
  delay: number;
  in: {
    translateY: number;
    opacity: number;
    scale: number;
  };
  out: {
    translateY: number;
    opacity: number;
    scale: number;
  };
}

const createAnimationConfig = (type: 'image' | 'title' | 'text' | 'button'): AnimationConfig => {
  const configs = {
    image: {
      initial: {
        translateY: 0,
        opacity: 0,
        scale: 1.2,
      },
      in: {
        translateY: 0,
        opacity: 1,
        scale: 1,
      },
      out: {
        translateY: 0,
        opacity: 0,
        scale: 1.1,
      },
      delay: 0,
    },
    title: {
      initial: {
        translateY: 20,
        opacity: 0,
        scale: 1,
      },
      in: {
        translateY: 0,
        opacity: 1,
        scale: 1,
      },
      out: {
        translateY: 0,
        opacity: 0,
        scale: 1,
      },
      delay: 400,
    },
    text: {
      initial: {
        translateY: 20,
        opacity: 0,
        scale: 1,
      },
      in: {
        translateY: 0,
        opacity: 1,
        scale: 1,
      },
      out: {
        translateY: 0,
        opacity: 0,
        scale: 1,
      },
      delay: 500,
    },
    button: {
      initial: {
        translateY: 20,
        opacity: 0,
        scale: 1,
      },
      in: {
        translateY: 0,
        opacity: 1,
        scale: 1,
      },
      out: {
        translateY: 0,
        opacity: 0,
        scale: 1,
      },
      delay: 600,
    },
  };

  const config = configs[type];
  return {
    translateY: useSharedValue(config.initial.translateY),
    opacity: useSharedValue(config.initial.opacity),
    scale: useSharedValue(config.initial.scale),
    delay: config.delay,
    in: config.in,
    out: config.out,
  };
};

const createAnimatedStyle = (type: 'image' | 'title' | 'text' | 'button', config: AnimationConfig) => {
  if (type === 'image') {
    return useAnimatedStyle(() => ({
      transform: [
        { translateY: config.translateY.value },
        { scale: config.scale.value }
      ],
      opacity: config.opacity.value,
    }));
  }

  return useAnimatedStyle(() => ({
    transform: [
      { translateY: config.translateY.value },
      { scale: config.scale.value }
    ],
    opacity: config.opacity.value,
  }));
};

export default function GetStarted() {
  const animations = {
    image: createAnimationConfig('image'),
    title: createAnimationConfig('title'),
    text: createAnimationConfig('text'),
    button: createAnimationConfig('button'),
  };

  const styles = {
    image: createAnimatedStyle('image', animations.image),
    title: createAnimatedStyle('title', animations.title),
    text: createAnimatedStyle('text', animations.text),
    button: createAnimatedStyle('button', animations.button),
  };

  React.useEffect(() => {
    const animateElement = ({
      translateY,
      opacity,
      scale,
      delay,
      in: inValues,
    }: AnimationConfig) => {
      setTimeout(() => {
        translateY.value = withTiming(inValues.translateY, { duration: 600 });
        opacity.value = withTiming(inValues.opacity, { duration: 600 });
        scale.value = withTiming(inValues.scale, { duration: 600 });
      }, delay);
    };

    Object.values(animations).forEach(animateElement);
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
              const animateOut = ({
                translateY,
                opacity,
                scale,
                out,
              }: AnimationConfig) => {
                translateY.value = withTiming(out.translateY, {
                  duration: 300,
                });
                opacity.value = withTiming(out.opacity, { duration: 300 });
                scale.value = withTiming(out.scale, { duration: 300 });
              };

              Object.values(animations).forEach(animateOut);
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
}
