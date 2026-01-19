import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import CustomeFonts from "../Constant/CustomeFonts";

export default function TopBar(props) {
  return (
    <View style={[styles.topBar, props.customeStyle]}>
      <AntDesign
        name="arrow-left"
        size={24}
        color="black"
        onPress={props.onPress ? props.onPress : () => router.back()}
      />
      <Text style={styles.text}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    backgroundColor: "white",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    marginBottom: 10,
  },
  text: {
    fontFamily: CustomeFonts.LatoRegular,
    fontSize: 15,
    marginLeft: 15,
  },
});
