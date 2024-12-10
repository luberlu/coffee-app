import { View, Text } from "@/components/Themed";
import LogoutButton from "./LogoutButton";
import InfoButton from "./InfoButton";
import { Link } from "expo-router";

const HeaderRight = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Link href="/get-started">
        <Text>Get Started</Text>
      </Link>
      <LogoutButton />
      <InfoButton />
    </View>
  );
}; 

export default HeaderRight;