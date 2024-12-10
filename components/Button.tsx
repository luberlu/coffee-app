import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Link, LinkProps, router } from 'expo-router';
import Colors from "@/constants/Colors";
import fonts from "@/constants/Font";
import { useColorScheme } from "@/components/useColorScheme";

interface ButtonProps {
  href: LinkProps["href"];
  title: string;
  forcedColorScheme?: "light" | "dark";
  onBeforeNavigation?: () => Promise<undefined>;
}

export default function Button({ 
  href, 
  title, 
  forcedColorScheme,
  onBeforeNavigation 
}: ButtonProps) {
  const colorScheme = forcedColorScheme ?? useColorScheme();
  
  const handlePress = async () => {
    if (onBeforeNavigation) {
      await onBeforeNavigation();
    }
    router.push(href);
  };

  return (
    <Pressable 
      style={[styles.button, { backgroundColor: Colors[colorScheme ?? "light"].primary }]}
      onPress={handlePress}
    >
      <Text style={[styles.buttonText, { color: colorScheme === "light" ? 'black' : 'white' }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 10,
    padding: 16,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: fonts.fontSize.md,
    fontWeight: "bold",
    color: "black",
    textAlign: "center"
  },
}); 