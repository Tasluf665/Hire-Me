import React from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Alert,
    StatusBar,
    TouchableOpacity,
    TouchableNativeFeedback,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import LottieView from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, setLoading } from "../../store/authSlice";
import { SignIn, ForgotPassword, GoogleLogin } from "../../services/authService";
import { router } from "expo-router";
import {
    GoogleSignin,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import { APP_WEB_CLIENT_ID, APP_IOS_CLIENT_ID } from "@env";

import SocialButton from "../../Components/SocialButton";
import PasswordTextInput from "../../Components/PasswordTextInput";
import CustomeFonts from "../../Constant/CustomeFonts";
import Colors from "../../Constant/Colors";
import CustomeActivityIndicator from "../../Components/CustomeActivityIndicator";

export default function SignInScreen(props) {
    const [password, setPassword] = React.useState();
    const [email, setEmail] = React.useState();
    const isLoading = useSelector((state) => state.auth.isLoading);

    const emailInput = React.useRef(null);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (emailInput.current) {
            emailInput.current.focus();
        }
    }, [emailInput]);

    React.useEffect(() => {
        GoogleSignin.configure({
            webClientId: APP_WEB_CLIENT_ID,
            iosClientId: APP_IOS_CLIENT_ID,
            offlineAccess: true,
        });
    }, []);

    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            if (userInfo.data.idToken) {
                dispatch(setLoading(true));
                const result = await GoogleLogin(userInfo.data.idToken, userInfo.data.user.email);
                dispatch(setLoading(false));

                if (result.error) {
                    Alert.alert("Google Login Failed", result.error);
                } else {
                    dispatch(
                        authenticate(
                            result.data._id,
                            result.data.token,
                            result.data.refreshToken
                        )
                    );
                    // Navigation handled by auth slice/layout redirection
                }
            }

        } catch (error) {
            console.log("Google Sign-In Error:", error);
            dispatch(setLoading(false));
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert("Sign in in progress");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert("Play services not available");
            } else {
                Alert.alert("Google Sign-In Error", error.message);
                console.log(error);
            }
        }
    };

    const handleEmailSubmittion = async () => {
        dispatch(setLoading(true));
        const authResult = await SignIn(email, password);
        dispatch(setLoading(false));

        if (authResult.error) {
            Alert.alert(authResult.error);
        } else {
            dispatch(
                authenticate(
                    authResult.data._id,
                    authResult.data.token,
                    authResult.data.refreshToken
                )
            );
        }
    };

    if (isLoading) {
        return <CustomeActivityIndicator visible={isLoading} />
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <LottieView
                        source={require("../../assets/StartupImages/maintance.json")}
                        style={styles.image}
                        autoPlay
                        loop
                    />
                </View>

                <View style={styles.otherItemContainer}>
                    <Text style={styles.titelText}>Get your Maintenance</Text>
                    <Text style={styles.titelText}>with Aloron</Text>

                    <Text
                        style={[styles.text, { fontFamily: CustomeFonts.RobotoSlabBold }]}
                    >
                        Email
                    </Text>
                    <TextInput
                        ref={emailInput}
                        style={styles.textInput}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    <PasswordTextInput title="Password" setPassword={setPassword} />

                    <View style={styles.forgotContainer}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => {
                                router.push("SignUpScreen");
                            }}
                        >
                            <Text style={styles.text}>New User ?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={async () => {
                                if (!email) {
                                    Alert.alert("Enter email address to Reset Password");
                                } else {
                                    const result = await ForgotPassword(email);
                                    Alert.alert(result.success ? result.success : result.error);
                                }
                            }}
                        >
                            <Text style={styles.text}>Forgot Password ?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableNativeFeedback onPress={handleEmailSubmittion}>
                            <View style={styles.button}>
                                <Text style={[styles.buttonText]}>Log in</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>

                    <SocialButton
                        social="google"
                        onPress={signInWithGoogle}
                        color={Colors.GoogleColor}
                        text="Continue with Google"
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Primary_Helper,
        paddingTop: StatusBar.currentHeight,
    },
    imageContainer: {
        width: "100%",
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20@vs",
    },
    image: {
        width: "300@s",
        height: "200@s",
    },
    otherItemContainer: {
        marginHorizontal: "18@s",
    },
    text: {
        fontFamily: CustomeFonts.RobotoSlabRegular,
        fontSize: "13@s",
        marginBottom: "8@vs",
        color: Colors.DarkGray,
        marginTop: "5@vs",
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.BorderGray,
        marginBottom: "20@vs",
        fontFamily: CustomeFonts.RobotoSlabRegular,
        fontSize: "14@s",
        paddingVertical: 5,
    },
    forgotContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonContainer: {
        width: "70%",
        height: "52@vs",
        overflow: "hidden",
        borderRadius: "16@s",
        marginTop: "25@vs",
        alignSelf: "center",
        marginBottom: "10@vs",
    },
    button: {
        width: "100%",
        height: "100%",
        borderRadius: "16@s",
        backgroundColor: Colors.Primary,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontFamily: CustomeFonts.RobotoSlabBold,
        fontSize: "16@s",
        color: "white",
    },
    titelText: {
        fontFamily: CustomeFonts.RobotoSlabBold,
        fontSize: "17@s",
        marginVertical: 5,
    },
});
