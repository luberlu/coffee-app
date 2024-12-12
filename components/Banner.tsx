import { ImageBackground } from "expo-image";
import { StyleSheet, ViewStyle } from "react-native";
import { View, Text } from "./Themed";
import Colors from "@/constants/Colors";
import fonts from "@/constants/Font";
import { constants } from "@/constants/Colors";

interface BannerProps {
  type?: "promo" | "info" | "new";
  title: string;
  lines: string[];
  image: any;
  style?: ViewStyle;
}

export function Banner({ type = "promo", title, lines, image, style }: BannerProps) {
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
              <Text style={styles.tagText}>{title}</Text>
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  tag: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 8,
  },
  tagText: {
    color: Colors.white,
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  textContainer: {
    alignItems: "center",
  },
  textLine: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  text: {
    color: Colors.white,
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  textHighlight: {
    backgroundColor: Colors.secondary,
    height: 2,
    flex: 1,
    marginLeft: 4,
  },
}); 