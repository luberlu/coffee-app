import { StyleSheet, useColorScheme } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Filter } from "@/components/Filter";
import CoffeeListOuter from "@/components/CoffeeList";
import Colors, { constants } from "@/constants/Colors";

export default function TabOneScreen() {
  return (
    <View style={[styles.container, { backgroundColor: constants.grey.darker }]}>
      <Filter />
      <CoffeeListOuter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
