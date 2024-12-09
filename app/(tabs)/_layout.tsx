import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  focused: boolean;
}) {

  const rotate = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  React.useEffect(() => {
    if (props.focused) {
      rotate.value = withSpring(rotate.value + 180, {
        damping: 10,
        stiffness: 100
      });
    }
  });

  return (
    <Animated.View style={animatedStyles}>
      <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
    </Animated.View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarStyle: {
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
          title: 'Tab One',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="code" color={color} focused={focused} />,
          headerRight: () => (
            <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarStyle: {
            backgroundColor: 'green',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="code" color={color} focused={focused} />,
        }}
      />
    </Tabs>
  );
}
