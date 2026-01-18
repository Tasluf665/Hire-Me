import React from "react";
import { useFonts } from "expo-font";
import { Redirect } from "expo-router";

const index = () => {
  const [fontsLoaded] = useFonts({
    "RobotoSlab_Bold": require("../assets/fonts/RobotoSlab-Bold.ttf"),
    "RobotoSlab_Light": require("../assets/fonts/RobotoSlab-Light.ttf"),
    "RobotoSlab_Regular": require("../assets/fonts/RobotoSlab-Regular.ttf"),
    "RobotoSlab_SemiBold": require("../assets/fonts/RobotoSlab-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Redirect href={"/WelcomeScreen"} />;
};

export default index;
