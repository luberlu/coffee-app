import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { Filter } from "@/components/Filter";
import CoffeeListOuter from "@/components/CoffeeList";
import { constants } from "@/constants/Colors";
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
