import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

import PaymentCardView from "../../Components/CartScreen/PaymentCardView";

export default function PaymentMainScreen() {
    const { orderId } = useLocalSearchParams();
    return (
        <View>
            <PaymentCardView orderId={orderId} />
        </View>
    );
}
