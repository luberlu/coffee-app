import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Filter } from "@/components/Filter";
import { CoffeeList } from "@/components/CoffeeList";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Filter />
      <CoffeeList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
