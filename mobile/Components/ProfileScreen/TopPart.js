import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableNativeFeedback } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { File, Paths } from "expo-file-system";
import { useSelector } from "react-redux";

import Colors from "../../Constant/Colors";
import CustomFonts from "../../Constant/CustomeFonts";

const TopPart = (props) => {
  const [imageUri, setImageUri] = useState();
  const userId = useSelector((state) => state.auth.userId);

  const requestPermission = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync();

    if (!result.granted) {
      alert("You need to enable permission to add profile picture");
    }
  };
  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (userId) { // Ensure userId is available
      const file = new File(Paths.document, `${userId}.jpeg`);
      if (file.exists) {
        setImageUri(file.uri);
      }
    }
  }, [userId]);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images", // Use string "images" to avoid Enum error
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];

        const manipResult = await manipulateAsync(
          selectedAsset.uri,
          [],
          { compress: 1, format: SaveFormat.JPEG }
        );

        const targetFile = new File(Paths.document, `${userId}.jpeg`);
        const sourceFile = new File(manipResult.uri);

        // Delete existing file if it exists to avoid FileAlreadyExistsException
        if (targetFile.exists) {
          targetFile.delete();
        }

        // Copy source to target using new File API
        sourceFile.copy(targetFile);

        setImageUri(`${targetFile.uri}?t=${new Date().getTime()}`);
      }
    } catch (error) {
      console.log(
        "selectImage ~ error",
        error
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={selectImage}>
        <Image
          style={styles.image}
          source={
            imageUri
              ? { uri: imageUri }
              : require("../../assets/Images/profile-icon.jpg")
          }
        />
      </TouchableNativeFeedback>

      <Text style={styles.text}>{props.name}</Text>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    marginTop: "50@vs",
  },
  image: {
    width: "100@vs",
    height: "100@vs",
    borderRadius: "50@vs",
    marginBottom: "10@vs",
  },
  text: {
    fontFamily: CustomFonts.RobotoSlabRegular,
    marginTop: "10@vs",
    color: Colors.Secondary,
    fontSize: "14@s",
  },
});

export default TopPart;
