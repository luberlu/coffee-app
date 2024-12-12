import { StyleSheet, useColorScheme } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Filter } from "@/components/Filter";
import CoffeeListOuter from "@/components/CoffeeList";
import Colors, { constants } from "@/constants/Colors";
import Location from "@/components/Location";

export default function TabOneScreen() {
  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <Location />
        <Filter />
      </View>
      <CoffeeListOuter />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: constants.grey.darker,
    padding: 16,
    paddingTop: 68,
  },
  container: {
    flex: 1,
    padding: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
