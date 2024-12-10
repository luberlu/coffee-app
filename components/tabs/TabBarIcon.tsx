import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  focused: boolean;
  title: string;
  children: React.ReactNode;
}) => {
  const rotate = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  React.useEffect(() => {
    if (props.focused) {
      rotate.value = withSpring(rotate.value + 180, {
        damping: 10,
        stiffness: 100,
      });
    }
  });

  return (
    <View>
      <Animated.View>{props.children}</Animated.View>
    </View>
  );
};

export default TabBarIcon;
