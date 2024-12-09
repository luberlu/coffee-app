import { Text, View } from "@/components/Themed";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Welcome() {
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
        Welcome on board
      </Text>
    </View>
  );
}
