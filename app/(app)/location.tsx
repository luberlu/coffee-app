import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Pressable } from "react-native";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import Button from "@/components/Button";
import { useLocationStore } from "@/stores/useLocationStore";
import { router } from "expo-router";

const CITIES = [
  'Paris',
  'London',
  'Lisboa',
  'Barcelona',
];

export default function LocationScreen() {
  const colorScheme = useColorScheme();
  const { location, setLocation } = useLocationStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisir une ville</Text>
      <View style={styles.citiesContainer}>
        {CITIES.map((city) => (
          <Pressable
            key={city}
            onPress={() => {
              setLocation(city);
              router.back();
            }}
            style={({ pressed }) => [
              styles.cityButton,
              {
                backgroundColor:
                  location === city
                    ? Colors[colorScheme ?? "light"].primary
                    : Colors[colorScheme ?? "light"].tertiary,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text style={styles.cityText}>{city}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.bottomContainer}>
        <Button title="Valider" href="back" />
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
  citiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  cityButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: '47%',
  },
  cityText: {
    color: "white",
    fontSize: 16,
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 'auto',
    paddingVertical: 20,
  },
}); 