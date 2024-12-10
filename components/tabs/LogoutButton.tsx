import React from 'react';
import { Pressable, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { logout } from '@/utils/authUtils';
import { useAuth } from '@/contexts/AuthContext';
import { router } from "expo-router";
import { useColorScheme } from '@/components/useColorScheme';
import { Text } from '@/components/Themed';

const LogoutButton = () => {
  const { authTokens, setAuthTokens } = useAuth();
  const colorScheme = useColorScheme();

  if (process.env.EXPO_PUBLIC_DISABLE_AUTH) {
    return null;
  }

  return (
    <Pressable onPress={() => logout(authTokens, setAuthTokens, () => router.push("/sign-in"))}>
      {({ pressed }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', opacity: pressed ? 0.5 : 1 }}>
          <Text style={{ color: Colors[colorScheme ?? 'light'].text, fontSize: 16, marginRight: 10 }}>
            Logout
          </Text>
          <FontAwesome
            name="sign-out"
            size={25}
            color={Colors[colorScheme ?? 'light'].text}
            style={{ marginRight: 15 }}
          />
        </View>
      )}
    </Pressable>
  );
};

export default LogoutButton; 