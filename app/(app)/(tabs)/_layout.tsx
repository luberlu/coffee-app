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

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "black" : "black",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          alignItems: "stretch",
          flexDirection: "row",
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
            </TabBarIcon>
          ),
          headerRight: () => <HeaderRight />,
        }}
      />
    </Tabs>
  );
}
