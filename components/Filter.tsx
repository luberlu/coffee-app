import { View, StyleSheet, Pressable, useColorScheme } from "react-native";
import { Search } from "./Search";
import { FilterIcon } from "./icons/Filter";
import Colors, { constants } from "@/constants/Colors";
import { Link } from "expo-router";

export const Filter = () => {
  return (
    <View style={styles.container}>
      <Search />
      <FilterOptions />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingTop: 70,
    paddingBottom: 90,
    backgroundColor: constants.grey.darker
  },
});

const FilterOptions = () => {
  const colorScheme = useColorScheme();

  return (
    <Link href="/filter" asChild>
      <Pressable>
        {({ pressed }) => (
          <View
            style={[
              stylesFilterOptions.container,
              {
                backgroundColor: Colors[colorScheme ?? "light"].primary,
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <FilterIcon color="white" />
          </View>
        )}
      </Pressable>
    </Link>
  );
};

const stylesFilterOptions = StyleSheet.create({
  container: {
    height: 52,
    width: 52,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
