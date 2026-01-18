import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import Colors from "../../Constant/Colors";
import CustomeFonts from "../../Constant/CustomeFonts";

export default function ProfileScreen() {
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Profile Screen</Text>
            <TouchableNativeFeedback onPress={() => dispatch(logout())}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Logout</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
        fontFamily: CustomeFonts.RobotoSlabLight
    },
    button: {
        backgroundColor: Colors.Primary,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: Colors.White,
        fontWeight: "bold",
        textAlign: "center",
    }
});
