import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import TabBarIcon from "@/components/tabs/TabBarIcon";
import HeaderRight from "@/components/tabs/headerRight";
import { FavoritesIcon } from "@/components/icons/Favorites";
import { HomeIcon } from "@/components/icons/Home";
import { CartIcon } from "@/components/icons/Cart";
import { NotificationsIcon } from "@/components/icons/Notifications";
import { View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "black" : "white",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          alignItems: "stretch",
          flexDirection: "row",
          paddingLeft: 24,
          paddingRight: 24,
          height: 90,
        },
        tabBarLabelStyle: {
          display: "none",
        },
        tabBarIconStyle: {
          height: "100%",
          width: "100%",
          minHeight: "100%",
          alignItems: "center",
          justifyContent: "center",
        },
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="code"
              color={color}
              focused={focused}
              title="Home"
            >
              <HomeIcon
                color={focused ? Colors[colorScheme ?? "light"].primary : color}
              />
            </TabBarIcon>
          ),
          headerRight: () => <HeaderRight />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="code"
              color={color}
              focused={focused}
              title="Favorites"
            >
              <FavoritesIcon
                color={focused ? Colors[colorScheme ?? "light"].primary : color}
              />
            </TabBarIcon>
          ),
          headerRight: () => <HeaderRight />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="code"
              color={color}
              focused={focused}
              title="Cart"
            >
              <CartIcon
                color={focused ? Colors[colorScheme ?? "light"].primary : color}
              />
            </TabBarIcon>
          ),
          headerRight: () => <HeaderRight />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="code"
              color={color}
              focused={focused}
              title="Notifications"
            >
              <NotificationsIcon
                color={focused ? Colors[colorScheme ?? "light"].primary : color}
              />
              <NotificationsPin
                color={ Colors[colorScheme ?? "light"].primary }
              />
            </TabBarIcon>
          ),
          headerRight: () => <HeaderRight />,
        }}
      />
    </Tabs>
  );
}

const NotificationsPin = ({ color }: { color: string }) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        right: 1,
        backgroundColor: color,
        borderRadius: 100,
        width: 10,
        height: 10,
      }}
    />
  );
};
