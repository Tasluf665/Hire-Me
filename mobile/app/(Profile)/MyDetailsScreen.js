import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";

import Colors from "../../Constant/Colors";

import NameSelect from "../../Components/ProfileScreen/MyDetailsScreen/NameSelect";
import BirthDayPicker from "../../Components/ProfileScreen/MyDetailsScreen/BirthDayPicker";
import EmailSelect from "../../Components/ProfileScreen/MyDetailsScreen/EmailSelect";
import GenderSelect from "../../Components/ProfileScreen/MyDetailsScreen/GenderSelect";
import PhoneSelect from "../../Components/ProfileScreen/MyDetailsScreen/PhoneSelect";


export default function MyDetailsMainScreen(props) {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.Primary_Helper} />
            <View style={{ marginBottom: 15 }}>
                <NameSelect />
            </View>
            <PhoneSelect />
            <EmailSelect />
            <GenderSelect />
            <BirthDayPicker />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight + 20,
    },
});
