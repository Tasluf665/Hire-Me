import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableNativeFeedback,
    Alert,
    KeyboardAvoidingView,
    StatusBar,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { router } from "expo-router"; // Added router
import { SignUp } from "../../services/authService"; // Added SignUp service
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/authSlice";
import CustomeActivityIndicator from "../../Components/CustomeActivityIndicator";

import PasswordTextInput from "../../Components/PasswordTextInput";
import Colors from "../../Constant/Colors";
import CustomeFonts from "../../Constant/CustomeFonts";

export default function SignUpScreen(props) {
    const [name, setName] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [confirmPassword, setConfirmPassword] = React.useState();

    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.auth.isLoading);

    const nameInput = React.useRef(null);

    React.useEffect(() => {
        if (nameInput.current) {
            nameInput.current.focus();
        }
    }, [nameInput]);

    const handleSubmittion = async () => {
        try {
            if (password === confirmPassword) {
                dispatch(setLoading(true));
                const authResult = await SignUp(name, email, password);
                dispatch(setLoading(false));
                if (authResult.error) {
                    Alert.alert(authResult.error);
                } else {
                    // Alert.alert(authResult.data.message); // Assuming backend sends message, or just Success
                    Alert.alert("Sign Up Successful");
                    router.back(); // Go back to SignIn
                }
            } else {
                Alert.alert("Password does not match");
            }
        } catch (err) {
            dispatch(setLoading(false));
            console.log(err.message);
            Alert.alert("An error occurred");
        }
    };

    if (isLoading) {
        return <CustomeActivityIndicator visible={isLoading} />;
    }
    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                paddingTop: StatusBar.currentHeight,
                backgroundColor: Colors.Primary_Helper,
            }}
            behavior={"padding"}
        >
            <View style={styles.container}>
                <View style={styles.itemContainer}>
                    <Text style={styles.title}>Sign Up</Text>
                    <Text
                        style={[styles.text, { fontFamily: CustomeFonts.RobotoSlabBold }]}
                    >
                        Name
                    </Text>
                    <TextInput
                        ref={nameInput}
                        style={styles.textInput}
                        onChangeText={setName}
                    />
                    <Text
                        style={[styles.text, { fontFamily: CustomeFonts.RobotoSlabBold }]}
                    >
                        Email
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <PasswordTextInput title="Password" setPassword={setPassword} />
                    <PasswordTextInput
                        title="Confirm Password"
                        setPassword={setConfirmPassword}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableNativeFeedback onPress={handleSubmittion}>
                            <View style={styles.button}>
                                <Text style={[styles.titelText]}>Sign Up</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = ScaledSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    buttonContainer: {
        width: "70%",
        height: "52@vs",
        overflow: "hidden",
        borderRadius: "16@s",
        marginTop: "25@vs",
        alignSelf: "center",
    },
    button: {
        width: "100%",
        height: "100%",
        borderRadius: "16@s",
        backgroundColor: Colors.Primary,
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.BorderGray,
        marginBottom: "20@vs",
        fontFamily: CustomeFonts.RobotoSlabRegular,
        fontSize: "14@s",
        paddingVertical: 5,
    },
    itemContainer: {
        marginHorizontal: "16@s",
        marginVertical: "20@vs",
    },
    title: {
        fontFamily: CustomeFonts.RobotoSlabBold,
        fontSize: "18@s",
        marginBottom: "10@vs",
    },
    text: {
        fontFamily: CustomeFonts.RobotoSlabRegular,
        fontSize: "13@s",
        marginBottom: "8@vs",
        color: Colors.DarkGray,
    },
    titelText: {
        fontFamily: CustomeFonts.RobotoSlabBold,
        fontSize: "16@s",
        color: "white",
    },
    forgotContainer: {
        width: "100%",
        alignItems: "flex-end",
    },
    passwordInputContainer: {
        flexDirection: "row",
    },
});
