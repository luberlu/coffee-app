import { FlatList, Pressable, ScrollView, StyleSheet } from "react-native";
import { View, Text } from "./Themed";
import { COFFEE_TYPES, useFilterStore } from "@/stores/useFilterStore";
import { CoffeeListItem } from "./CoffeeListItem";
import { useMemo } from "react";
import Colors, { constants } from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";

export interface Coffee {
  id: string;
  name: string;
  type: string;
  strength: string;
}

export const coffees: Coffee[] = [
  { id: "1", name: "Le Réveil Enchanté", type: "Espresso", strength: "Mild" },
  {
    id: "2",
    name: "Douceur Nuageuse",
    type: "Cappuccino",
    strength: "Medium",
  },
  { id: "3", name: "Velours de Moka", type: "Moka", strength: "Strong" },
  {
    id: "4",
    name: "L'Éveil des Sens",
    type: "Espresso",
    strength: "Extra Strong",
  },
  { id: "5", name: "La Pause Crémeuse", type: "Latte", strength: "Mild" },
  {
    id: "6",
    name: "Symphony Lactée",
    type: "Cappuccino",
    strength: "Medium",
  },
  { id: "7", name: "L'Or Noir", type: "Espresso", strength: "Strong" },
  {
    id: "8",
    name: "Caresse Vanillée",
    type: "Latte Macchiato",
    strength: "Mild",
  },
  { id: "9", name: "Le Rêveur Italien", type: "Ristretto", strength: "Mild" },
  { id: "10", name: "Danse Arabica", type: "Americano", strength: "Medium" },
];

function TypeBar() {
  const colorScheme = useColorScheme();
  const { selectedCoffeeType, setSelectedCoffeeType } = useFilterStore();

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ flexDirection: "row", flexWrap: "nowrap" }}
      >
        {COFFEE_TYPES.map((item) => (
          <Pressable
            key={item}
            onPress={() => setSelectedCoffeeType(item)}
            style={{
              backgroundColor:
                selectedCoffeeType === item
                  ? Colors[colorScheme ?? "light"].primary
                  : constants.grey.darker,
              padding: 10,
              margin: 5,
              borderRadius: 6,
              minWidth: 80,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: selectedCoffeeType === item ? "white" : "white",
              }}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexDirection: "row",
    flexWrap: "nowrap",
  },
});

export default function CoffeeListOuter() {
  return (
    <View style={{ flex: 1 }}>
      <TypeBar />
      <View style={{ flex: 1 }}>
        <CoffeeList />
      </View>
    </View>
  );
}

export function CoffeeList() {
  const { selectedCoffeeType, selectedCoffeeStrength, searchQuery } =
    useFilterStore();

  const filteredCoffees = useMemo(() => {
    return coffees.filter((coffee) => {
      const typeMatch =
        !selectedCoffeeType || coffee.type === selectedCoffeeType;
      const strengthMatch =
        !selectedCoffeeStrength || coffee.strength === selectedCoffeeStrength;

      const searchMatch =
        !searchQuery ||
        coffee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coffee.type.toLowerCase().includes(searchQuery.toLowerCase());

      return typeMatch && strengthMatch && searchMatch;
    });
  }, [coffees, selectedCoffeeType, selectedCoffeeStrength, searchQuery]);

  return (
    <FlatList
      numColumns={2}
      columnWrapperStyle={{ gap: 10 }}
      contentContainerStyle={{ paddingTop: 10 }}
      data={filteredCoffees}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CoffeeListItem id={item.id} name={item.name} type={item.type} />
      )}
    />
  );
}
