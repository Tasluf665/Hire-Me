import { View, Button } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";

import Colors from "../../Constant/Colors";

export default function ButtomSaveButton(props) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Save" color={Colors.Primary} onPress={props.onPress} />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    marginBottom: "40@vs",
    backgroundColor: Colors.BackGroundGray
  },
  buttonContainer: {
    width: "70%",
    justifyContent: "center",
    alignSelf: "center",
  },
});
