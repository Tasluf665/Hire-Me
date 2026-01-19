import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { scale } from "react-native-size-matters";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import CustomeFonts from "../../Constant/CustomeFonts";
import { router } from "expo-router";

function ServiceCard({ onPress, iconColor, backgroundColor, item }) {

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                onPress();
                router.push({
                    pathname: "/OrderFormMainScreen",
                    params: { item: JSON.stringify(item) },
                });
            }}
        >
            <View style={[styles.services, { backgroundColor }]}>
                <View style={styles.icon}>
                    <MaterialCommunityIcons
                        name={item.iconName}
                        size={scale(35)}
                        color={iconColor}
                    />
                </View>
                <Text style={[styles.iconText, { color: iconColor }]}>{item.name}</Text>
                <View style={styles.arrow}>
                    <AntDesign name="right-circle" size={scale(20)} color={iconColor} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = ScaledSheet.create({
    services: {
        elevation: 4,
        height: "150@vs",
        width: "100@s",
        borderRadius: 25,
        alignItems: "center",
        marginRight: 25,
        marginBottom: 10,
        marginTop: 5,
        marginLeft: 5,
    },
    icon: {
        marginTop: "20%",
        marginBottom: "12%",
    },
    iconText: {
        fontFamily: CustomeFonts.RobotoSlabSemiBold,
        fontSize: "14@s",
        color: "#fff",
    },
    arrow: {
        marginBottom: "15%",
        marginTop: "20%",
    },
});

export default ServiceCard;
