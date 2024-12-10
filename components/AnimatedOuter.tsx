import React from "react";
import { ViewProps, ViewStyle, View as RNView, TextStyle } from "react-native";
import Animated from "react-native-reanimated";

const AnimatedOuter = React.forwardRef<
  typeof RNView,
  ViewProps & {
    children?: React.ReactNode;
    style?: ViewStyle | TextStyle;
    animatedStyle?: ViewStyle | TextStyle;
  }
>((props, ref) => {
  const { style, animatedStyle, children, ...otherProps } = props;
  return (
    <Animated.View
      ref={ref as React.Ref<Animated.View>}
      style={[style, animatedStyle as ViewStyle]}
      {...otherProps}
    >
      {children}
    </Animated.View>
  );
});

export default AnimatedOuter; 