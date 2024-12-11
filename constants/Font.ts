import { TextStyle } from "react-native";

export const fonts = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 32,
  },
};

export const tokens = {
  title: {
    fontSize: fonts.fontSize.lg,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  } satisfies TextStyle,
};

export default fonts;
