import { View, Text } from "./Themed";

export const CoffeeListItem = ({ name, type }: { name: string; type: string }) => {
  return (
    <View style={{ padding: 16, marginVertical: 8 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{name}</Text>
      <Text style={{ color: "#666" }}>{type}</Text>
    </View>
  );
};

