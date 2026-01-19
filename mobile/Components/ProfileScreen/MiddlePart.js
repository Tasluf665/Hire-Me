import React from "react";
import { router } from "expo-router";

import CardView from "./CardView";

const MiddlePart = () => {
  return (
    <>
      <CardView
        iconName="history"
        title="History"
        onPress={() => router.push("/(Profile)/HistoryScreen")}
      />
      <CardView
        iconName="user-circle-o"
        title="Profile"
        onPress={() => router.push("/(Profile)/MyDetailsScreen")}
      />
      <CardView
        iconName="star"
        title="Save Address"
        onPress={() => router.push("/(Profile)/DeliveryAddressScreen")}
      />
    </>
  );
};

export default MiddlePart;
