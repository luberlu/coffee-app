import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Text } from '@/components/Themed';

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  focused: boolean;
  title: string;
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
    <View style={[{ alignItems: 'center', width: 50, height: "100%" }]}>
      <Animated.View style={animatedStyles}>
        <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
      </Animated.View>
      <Text style={{ color: 'white', fontSize: 10, marginTop: 5 }}>{props.title}</Text>
    </View>
  );
};

export default TabBarIcon; 