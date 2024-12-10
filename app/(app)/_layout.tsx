import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Redirect, Stack } from "expo-router";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { useAuth } from "@/contexts/AuthContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated && !process.env.EXPO_PUBLIC_DISABLE_AUTH) {
    return <Redirect href="/sign-in" />;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="get-started" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
