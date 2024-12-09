import { View } from "@/components/Themed";
import LogoutButton from "./LogoutButton";
import InfoButton from "./InfoButton";

const HeaderRight = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <LogoutButton />
      <InfoButton />
    </View>
  );
}; 

export default HeaderRight;