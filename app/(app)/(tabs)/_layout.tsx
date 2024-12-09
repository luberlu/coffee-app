import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import TabBarIcon from "./components/TabBarIcon";
import HeaderRight from "./components/headerRight";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarStyle: {
            backgroundColor: "red",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="code" color={color} focused={focused} title="Tab One" />
          ),
          headerRight: () => <HeaderRight />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "",
          tabBarStyle: {
            backgroundColor: "green",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="code" color={color} focused={focused} title="Tab Two" />
          ),
          headerRight: () => <HeaderRight />,
        }}
      />
    </Tabs>
  );
}