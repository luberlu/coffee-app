import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { LinkProps, router } from 'expo-router';
import Colors from "@/constants/Colors";
import fonts from "@/constants/Font";
import { useColorScheme } from "@/components/useColorScheme";

interface ButtonProps {
  href: LinkProps["href"] | "back";
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
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = async () => {
    if (onBeforeNavigation) {
      await onBeforeNavigation();
    }
    if(href) {
      if(href === "back") {
        router.back();
      } else {
        router.push(href);
      }
    }
  };

  return (
    <Pressable 
      style={[styles.button, { opacity: isPressed ? 0.5 : 1, backgroundColor: Colors[colorScheme ?? "light"].primary }]}
      onPressIn={() => setIsPressed(true)}
      onPress={ handlePress }
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