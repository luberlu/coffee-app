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
    <Animated.View ref={ref as React.Ref<Animated.View>} style={animatedStyle as ViewStyle} {...otherProps}>
      <Text style={style as TextStyle}>{children}</Text>
    </Animated.View>
  );
});

AnimatedTextOuter.displayName = "AnimatedTextOuter";

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

export default function GetStarted() {
    const reanim = false;
  const AnimatedText = Animated.createAnimatedComponent(AnimatedTextOuter);
  const animations: Record<'image' | 'title' | 'text' | 'button', AnimationConfig> = {
    image: {
      translateY: useSharedValue(0),
      opacity: useSharedValue(0),
      scale: useSharedValue(1),
      delay: 300,
      in: {
        translateY: 0,
        opacity: 1,
        scale: 1
      },
      out: {
        translateY: 0,
        opacity: 0,
        scale: 1.1
      }
    },
    title: {
      translateY: useSharedValue(20),
      opacity: useSharedValue(0),
      scale: useSharedValue(1),
      delay: 400,
      in: {
        translateY: 0,
        opacity: 1,
        scale: 1
      },
      out: {
        translateY: 0,
        opacity: 0,
        scale: 1
      }
    },
    text: {
      translateY: useSharedValue(20),
      opacity: useSharedValue(0),
      scale: useSharedValue(1),
      delay: 500,
      in: {
        translateY: 0,
        opacity: 1,
        scale: 1
      },
      out: {
        translateY: 0,
        opacity: 0,
        scale: 1
      }
    },
    button: {
      translateY: useSharedValue(20),
      opacity: useSharedValue(0),
      scale: useSharedValue(1),
      delay: 600,
      in: {
        translateY: 0,
        opacity: 1,
        scale: 1
      },
      out: {
        translateY: 0,
        opacity: 0,
        scale: 1
      }
    }
  };

  React.useEffect(() => {
    const animateElement = ({ translateY, opacity, scale, delay, in: inValues }: AnimationConfig) => {
      setTimeout(() => {
        translateY.value = withTiming(inValues.translateY, { duration: 600 });
        opacity.value = withTiming(inValues.opacity, { duration: 600 });
        scale.value = withTiming(inValues.scale, { duration: 600 });
      }, delay);
    };

    Object.values(animations).forEach(animateElement);
  }, [reanim]);

  const createAnimatedStyle = ({ translateY, opacity, scale }: Omit<AnimationConfig, 'delay'>) =>
    useAnimatedStyle(() => ({
      transform: [
        { translateY: translateY.value },
        { scale: scale.value }
      ],
      opacity: opacity.value,
    }));

  const styles = {
    image: createAnimatedStyle(animations.image),
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
          source={require("@/assets/images/app/coffee1.png")}
          style={[{ width: "100%", height: "70%", position: "absolute", top: 0 }, styles.image]}
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
          <Button 
            href="/(app)/(tabs)" 
            title="Get started" 
            onBeforeNavigation={async () => {
              return new Promise(resolve => {
                Object.values(animations).forEach(({ translateY, opacity, scale, delay, out }) => {
                  setTimeout(() => {
                    translateY.value = withTiming(out.translateY, {
                      duration: 300,
                    });
                    opacity.value = withTiming(out.opacity, {
                      duration: 300,
                    });
                    scale.value = withTiming(out.scale, {
                      duration: 300,
                    });
                  }, delay);
                });
                setTimeout(resolve, 1000);
              });
            }}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
}
