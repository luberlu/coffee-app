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
} from "react-native-reanimated";
import React from "react";
import AnimatedOuter from "@/components/AnimatedOuter";

interface AnimationValues {
  [key: string]: number;
}

interface AnimationConfig {
  values: {[key: string]: SharedValue<number>};
  timing: {
    duration: number;
    easing: (value: number) => number;
  };
  outTiming: {
    duration: number;
    easing: (value: number) => number;
  };
  in: AnimationValues & { delay: number };
  out: AnimationValues & { delay: number };
}

const createAnimationConfig = (type: 'image' | 'title' | 'text' | 'button'): AnimationConfig => {
  const configs = {
    image: {
      initial: {
        translateY: 0,
        opacity: 0,
        scale: 1.1,
      },
      in: {
        translateY: 0,
        opacity: 1,
        scale: 1,
        delay: 0,
      },
      out: {
        translateY: 0,
        opacity: 0,
        scale: 1.1,
        delay: 0,
      },
      timing: {
        duration: 800,
        easing: Easing.linear,
      },
      outTiming: {
        duration: 300,
        easing: Easing.ease,
      },
    },
    title: {
      initial: {
        translateY: 10,
        opacity: 0,
        scale: 1,
      },
      in: {
        translateY: 0,
        opacity: 1,
        scale: 1,
        delay: 200,
      },
      out: {
        translateY: 0,
        opacity: 0,
        scale: 1,
        delay: 100,
      },
      timing: {
        duration: 800,
        easing: Easing.ease,
      },
      outTiming: {
        duration: 300,
        easing: Easing.ease,
      },
    },
    text: {
      initial: {
        translateY: 10,
        opacity: 0,
        scale: 1,
      },
      in: {
        translateY: 0,
        opacity: 1,
        scale: 1,
        delay: 400,
      },
      out: {
        translateY: 0,
        opacity: 0,
        scale: 1,
        delay: 200,
      },
      timing: {
        duration: 800,
        easing: Easing.ease,
      },
      outTiming: {
        duration: 300,
        easing: Easing.ease,
      },
    },
    button: {
      initial: {
        translateY: 10,
        opacity: 0,
        scale: 1,
      },
      in: {
        translateY: 0,
        opacity: 1,
        scale: 1,
        delay: 800,
      },
      out: {
        translateY: 0,
        opacity: 0,
        scale: 1,
        delay: 400,
      },
      timing: {
        duration: 800,
        easing: Easing.ease,
      },
      outTiming: {
        duration: 300,
        easing: Easing.ease,
      },
    },
  };

  const config = configs[type];
  const values: {[key: string]: SharedValue<number>} = {};
  
  Object.entries(config.initial).forEach(([key, value]) => {
    values[key] = useSharedValue(value);
  });

  return {
    values,
    in: { ...config.in },
    out: { ...config.out },
    timing: config.timing,
    outTiming: config.outTiming,
  };
};

const animateValues = (
  values: {[key: string]: SharedValue<number>},
  targetValues: AnimationValues,
  timing: { duration: number; easing: (value: number) => number },
  delay: number = 0
) => {
  Object.entries(values).forEach(([key, sharedValue]) => {
    if (key in targetValues) {
      sharedValue.value = withDelay(
        delay,
        withTiming(targetValues[key], {
          duration: timing.duration,
          easing: timing.easing,
        })
      );
    }
  });
};

const createAnimatedStyle = (config: AnimationConfig) => {
  return useAnimatedStyle(() => ({
    transform: [
      { translateY: config.values.translateY.value },
      { scale: config.values.scale.value }
    ],
    opacity: config.values.opacity.value,
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
    image: createAnimatedStyle(animations.image),
    title: createAnimatedStyle(animations.title),
    text: createAnimatedStyle(animations.text),
    button: createAnimatedStyle(animations.button),
  };

  const animateIn = ({
    values,
    in: inValues,
    timing,
  }: AnimationConfig) => {
    animateValues(values, inValues, timing, inValues.delay);
  };

  const animateOut = ({
    values,
    out,
    outTiming,
  }: AnimationConfig) => {
    animateValues(values, out, outTiming, out.delay);
  };

  React.useEffect(() => {
    Object.values(animations).forEach(animateIn);
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
              const maxDelay = Math.max(...Object.values(animations).map(config => config.out.delay));
              const maxDuration = Math.max(...Object.values(animations).map(config => config.outTiming.duration));
              
              Object.values(animations).forEach((config) => animateOut(config));
              await new Promise((resolve) => setTimeout(resolve, maxDelay + maxDuration));
            }}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
}
