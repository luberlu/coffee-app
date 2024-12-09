import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Alert, Pressable, Text, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useAuth } from '@/contexts/AuthContext';
import { router } from "expo-router";
import { logout } from '@/utils/authUtils';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  focused: boolean;
  title: string;
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
    <View style={[{ alignItems: 'center', width: 50, height: "100%" }]}>
      <Animated.View style={animatedStyles}>
        <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
      </Animated.View>
      <Text style={{ color: 'white', fontSize: 10, marginTop: 5 }}>{props.title}</Text>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { authTokens, setAuthTokens } = useAuth();
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
          title: '',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="code" color={color} focused={focused} title="Tab One" />,
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Pressable onPress={() => logout(authTokens, setAuthTokens, () => router.push("/sign-in"))}>
                {({ pressed }) => (
                  <FontAwesome
                    name="sign-out"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
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
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: '',
          tabBarStyle: {
            backgroundColor: 'green',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="code" color={color} focused={focused} title="Tab Two" />,
        }}
      />
    </Tabs>
  );
}
