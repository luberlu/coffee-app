import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Pressable } from "react-native";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useLocationStore } from "@/stores/useLocationStore";
import { router } from "expo-router";
import { Image } from 'expo-image';

const CITIES = [
  {
    name: 'Paris',
    image: require('@/assets/images/cities/paris.webp'),
  },
  {
    name: 'London',
    image: require('@/assets/images/cities/london.webp'),
  },
  {
    name: 'Lisboa',
    image: require('@/assets/images/cities/lisboa.webp'),
  },
  {
    name: 'Barcelona',
    image: require('@/assets/images/cities/barcelona.webp'),
  },
];

export default function LocationScreen() {
  const colorScheme = useColorScheme();
  const { location, setLocation } = useLocationStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a city</Text>
      <View style={styles.citiesContainer}>
        {CITIES.map((city) => (
          <Pressable
            key={city.name}
            onPress={() => {
              setLocation(city.name);
              router.back();
            }}
            style={({ pressed }) => [
              styles.cityButton,
              {
                backgroundColor:
                  location === city.name
                    ? Colors[colorScheme ?? "light"].primary
                    : Colors[colorScheme ?? "light"].tertiary,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Image source={city.image} style={styles.cityImage} contentFit="cover" transition={100} />
            <Text style={styles.cityText}>{city.name}</Text>
          </Pressable>
        ))}
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
    gap: 20,
  },
  cityButton: {
    borderRadius: 8,
    marginBottom: 10,
    width: '47%',
    overflow: 'hidden',
  },
  cityImage: {
    width: '100%',
    height: 100,
  },
  cityText: {
    color: "white",
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 12,
  },
  bottomContainer: {
    paddingVertical: 20,
  },
}); 