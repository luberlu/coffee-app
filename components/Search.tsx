import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { SearchIcon } from "./icons/Search";
import Colors, { constants } from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";
import fonts from "@/constants/Font";

export const Search = () => {
  const colorScheme = useColorScheme();
  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? "light"].tertiary }]}>
      <View style={styles.searchIcon}>
        <SearchIcon color="white" />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Search coffee"
        placeholderTextColor={ constants.grey.lighter }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchIcon: {
    marginRight: 8,
    color: "white"
  },
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    borderRadius: 8,
    padding: 16,
    marginRight: 16,
    height: 52
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: fonts.fontSize.sm,
    color: "white"
  },
});
