import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Pressable } from "react-native";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import {
  COFFEE_STRENGTHS,
  COFFEE_TYPES,
  useFilterStore,
} from "@/stores/useFilterStore";
import Button from "@/components/Button";

export default function FilterScreen() {
  const colorScheme = useColorScheme();
  const {
    selectedCoffeeType,
    setSelectedCoffeeType,
    selectedCoffeeStrength,
    setSelectedCoffeeStrength,
  } = useFilterStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Types</Text>
      <View style={styles.filterContainer}>
        {COFFEE_TYPES.map((type) => (
          <Pressable
            key={type}
            onPress={() => setSelectedCoffeeType(type)}
            style={({ pressed }) => [
              styles.filterButton,
              {
                backgroundColor:
                  selectedCoffeeType === type
                    ? Colors[colorScheme ?? "light"].primary
                    : Colors[colorScheme ?? "light"].tertiary,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text style={styles.filterText}>{type}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={[styles.title, { marginTop: 20 }]}>Force</Text>
      <View style={styles.filterContainer}>
        {COFFEE_STRENGTHS.map((strength) => (
          <Pressable
            key={strength}
            onPress={() => setSelectedCoffeeStrength(strength)}
            style={({ pressed }) => [
              styles.filterButton,
              {
                backgroundColor:
                  selectedCoffeeStrength === strength
                    ? Colors[colorScheme ?? "light"].primary
                    : Colors[colorScheme ?? "light"].tertiary,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text style={styles.filterText}>{strength}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.bottomContainer}>
        <Button title="Validate" href="back" />
      </View>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  filterText: {
    color: "white",
    fontSize: 16,
  },
  bottomContainer: {
    paddingVertical: 20,
  },
  validateButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  validateButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
