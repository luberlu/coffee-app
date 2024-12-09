import { Text, View } from "@/components/Themed";
import fonts, { tokens } from "@/constants/Font";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  SharedValue,
} from "react-native-reanimated";
import React from "react";
import { ViewProps, ViewStyle, View as RNView, TextStyle } from "react-native";

const AnimatedTextOuter = React.forwardRef<
  typeof RNView,
  ViewProps & { 
    children?: React.ReactNode; 
    style?: ViewStyle | TextStyle;
    animatedStyle?: ViewStyle | TextStyle;
  }
>((props, ref) => {
  const { style, animatedStyle, children, ...otherProps } = props;
  return (
    <Animated.View ref={ref} style={animatedStyle as ViewStyle} {...otherProps}>
      <Text style={style as TextStyle}>{children}</Text>
    </Animated.View>
  );
});

AnimatedTextOuter.displayName = "AnimatedTextOuter";

interface AnimationConfig {
  translateY: SharedValue<number>;
  opacity: SharedValue<number>;
  delay: number;
}

export default function GetStarted() {
    const reanim = false;
  const AnimatedText = Animated.createAnimatedComponent(AnimatedTextOuter);
  const animations: Record<'title' | 'text' | 'button', AnimationConfig> = {
    title: {
      translateY: useSharedValue(20),
      opacity: useSharedValue(0),
      delay: 400
    },
    text: {
      translateY: useSharedValue(20),
      opacity: useSharedValue(0),
      delay: 500
    },
    button: {
      translateY: useSharedValue(20),
      opacity: useSharedValue(0),
      delay: 600
    }
  };

  React.useEffect(() => {
    const animateElement = ({ translateY, opacity, delay }: AnimationConfig) => {
      setTimeout(() => {
        translateY.value = withTiming(0, { duration: 600 });
        opacity.value = withTiming(1, { duration: 600 });
      }, delay);
    };

    Object.values(animations).forEach(animateElement);
  }, [reanim]);

  const createAnimatedStyle = ({ translateY, opacity }: Omit<AnimationConfig, 'delay'>) =>
    useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    }));

  const styles = {
    title: createAnimatedStyle(animations.title),
    text: createAnimatedStyle(animations.text),
    button: createAnimatedStyle(animations.button),
  };

  if(reanim) {
    return null;
  }

  return (
    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
      <Animated.Image
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(500)}
        source={require("@/assets/images/app/coffee1.png")}
        style={{ width: "100%", height: "70%", position: "absolute", top: 0 }}
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
        <AnimatedText
          style={tokens.title}
          animatedStyle={styles.title}
        >
          Fall in Love with{"\n"}
          Coffee in Blissful{"\n"}
          Delight!
        </AnimatedText>
        <AnimatedText
          style={{
            fontSize: fonts.fontSize.sm,
            color: Colors.dark.quaternary,
            textAlign: "center",
          } as ViewStyle}
          animatedStyle={styles.text}
        >
          Welcome to our cozy coffee corner, where{"\n"}
          every cup is a delightful for you.
        </AnimatedText>
        <Animated.View style={styles.button}>
          <Button href="/(app)/(tabs)" title="Get started" />
        </Animated.View>
      </Animated.View>
    </View>
  );
}
