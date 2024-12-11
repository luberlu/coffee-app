import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Colors from "@/constants/Colors";
import { useColorScheme } from "../useColorScheme";
import { useFocusEffect } from "expo-router";

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  focused: boolean;
  title: string;
  children: React.ReactNode;
}) => {
  const scale = useSharedValue(0);
  const colorScheme = useColorScheme();

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useFocusEffect(
    React.useCallback(() => {
      scale.value = withTiming(1, {
        duration: 500,
        easing: Easing.elastic(1),
      });
      return () => {
        scale.value = 0;
      };
    }, [])
  );

  return (
    <View style={styles.icon}>
      <Animated.View>{props.children}</Animated.View>
      <Animated.View
        style={[
          animatedStyles,
          styles.focused,
          {
            backgroundColor: props.focused
              ? Colors[colorScheme ?? "light"].primary
              : "transparent",
          },
        ]}
      />
    </View>
  );
};

export default TabBarIcon;

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
  },
  focused: {
    marginTop: 6,
    height: 5,
    width: 10,
    borderRadius: 100,
  },
});
