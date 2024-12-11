import { FlatList, Pressable, ScrollView, StyleSheet, Image } from "react-native";
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
  price: number;
}

export const coffees: Coffee[] = [
  {
    id: "1",
    name: "Le Réveil Enchanté",
    type: "Espresso",
    strength: "Mild",
    price: 3.5,
  },
  {
    id: "2",
    name: "Douceur Nuageuse",
    type: "Cappuccino",
    strength: "Medium",
    price: 4.25,
  },
  {
    id: "3",
    name: "Velours de Moka",
    type: "Moka",
    strength: "Strong",
    price: 4.75,
  },
  {
    id: "4",
    name: "L'Éveil des Sens",
    type: "Espresso",
    strength: "Extra Strong",
    price: 3.75,
  },
  {
    id: "5",
    name: "La Pause Crémeuse",
    type: "Latte",
    strength: "Mild",
    price: 4.5,
  },
  {
    id: "6",
    name: "Symphony Lactée",
    type: "Cappuccino",
    strength: "Medium",
    price: 4.25,
  },
  {
    id: "7",
    name: "L'Or Noir",
    type: "Espresso",
    strength: "Strong",
    price: 3.5,
  },
  {
    id: "8",
    name: "Caresse Vanillée",
    type: "Latte Macchiato",
    strength: "Mild",
    price: 4.95,
  },
  {
    id: "9",
    name: "Le Rêveur Italien",
    type: "Ristretto",
    strength: "Mild",
    price: 3.25,
  },
  {
    id: "10",
    name: "Danse Arabica",
    type: "Americano",
    strength: "Medium",
    price: 3.95,
  },
];

function TypeBar() {
  const colorScheme = useColorScheme();
  const { selectedCoffeeType, setSelectedCoffeeType } = useFilterStore();

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ flexDirection: "row", flexWrap: "nowrap"}}
      >
        <Pressable
          key="all"
          onPress={() => setSelectedCoffeeType(null)}
          style={{
            backgroundColor:
              selectedCoffeeType === null
                ? Colors[colorScheme ?? "light"].primary
                : constants.grey.darker,
            padding: 10,
            margin: 5,
            marginLeft: 0,
            borderRadius: 6,
            minWidth: 80,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            All Coffee
          </Text>
        </Pressable>

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
    paddingLeft: 16,
    paddingRight: 16,
  },
  promoBanner: {
    backgroundColor: constants.grey.darker,
    borderRadius: 16,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    overflow: "hidden",
  },
  promoText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default function CoffeeListOuter() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "transparent",
        marginTop: -80,
        height: "100%"
      }}
    >
      <View style={{ backgroundColor: "transparent", padding: 16 }}>
        <View style={styles.promoBanner}>
          <Image
            source={require("@/assets/images/banner1.png")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      </View>

      <TypeBar />

      <View style={{ flex: 1, padding: 16 }}>
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
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ gap: 15 }}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
      data={filteredCoffees}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CoffeeListItem
          id={item.id}
          name={item.name}
          type={item.type}
          price={item.price}
        />
      )}
    />
  );
}
