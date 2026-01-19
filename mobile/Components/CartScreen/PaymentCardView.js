import { View } from "react-native";
import React from "react";
import { router } from "expo-router";

import CustomeSelectItem from "./CustomeSelectItem";

export default function PaymentCardView(props) {
    return (
        <View>
            <CustomeSelectItem
                details="Payment"
                onPress={() =>
                    router.push({
                        pathname: "/SSLCOMMERZ_Web_View",
                        params: { orderId: props.orderId },
                    })
                }
            />
        </View>
    );
}
