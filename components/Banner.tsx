import { ImageBackground } from "expo-image";
import { StyleSheet, ViewStyle } from "react-native";
import { View, Text } from "./Themed";
import Colors from "@/constants/Colors";
import fonts from "@/constants/Font";
import { constants } from "@/constants/Colors";

interface BannerProps {
  type?: "Promo" | "Info" | "New";
  lines: string[];
  image: any;
  style?: ViewStyle;
}

export function Banner({
  type = "Promo",
  lines,
  image,
  style,
}: BannerProps) {
  return (
    <View style={[styles.banner, style]}>
      <ImageBackground
        source={image}
        style={{ width: "100%", height: "100%" }}
        contentPosition="center"
        contentFit="cover"
      >
        <View style={styles.content}>
          {type && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{type}</Text>
            </View>
          )}
          <View style={styles.textContainer}>
            {lines.map((line, index) => (
              <View key={index} style={styles.textLine}>
                <Text style={styles.text}>{line}</Text>
                <View style={styles.textHighlight}></View>
              </View>
            ))}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: constants.grey.darker,
    borderRadius: 16,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    overflow: "hidden",
  },
  text: {
    fontSize: fonts.fontSize.lg,
    fontWeight: "bold",
    backgroundColor: "transparent",
    zIndex: 1,
  },
 textContainer: {
    gap: 2,
    backgroundColor: "transparent",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 13,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "transparent",
  },
  tag: {
    backgroundColor: Colors.light.promo,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  tagText: {
    color: "white",
    fontSize: fonts.fontSize.sm,
    fontWeight: "bold",
  },
  textHighlight: {
    backgroundColor: Colors.light.tertiary,
    position: "absolute",
    left: -3,
    top: 16,
    width: "106%",
    height: "70%",
    zIndex: 0,
  },
  textLine: {
    backgroundColor: "transparent",
    position: "relative",
    alignItems: "flex-start",
  }
});
