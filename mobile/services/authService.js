// TODO: Replace with your actual backend URL
import { API_URL } from "@env";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export const SignIn = async (email, password) => {
    console.log(API_URL);
    try {
        const response = await fetch(`${API_URL}/api/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || 'Something went wrong!' };
        }

        const resData = await response.json();
        return { data: resData.data };

    } catch (error) {
        return { error: error.message };
    }
};

export const SignUp = async (name, email, password) => {

    try {
        const response = await fetch(`${API_URL}/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || 'Something went wrong!' };
        }

        const resData = await response.json();
        return { data: resData.data };
    } catch (error) {
        return { error: error.message };
    }
};



export const ForgotPassword = async (email) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        });

        const resData = await response.json();

        if (!response.ok) {
            return { error: resData.message || resData.error || 'Something went wrong!' };
        }

        console.log(resData);

        return resData;
    } catch (error) {
        return { error: error.message };
    }
};

export const GoogleLogin = async (idToken, email) => {
    try {
        const response = await fetch(`${API_URL}/api/users/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: idToken,
                email: email,
            })
        });

        const resData = await response.json();

        if (!response.ok) {
            return { error: resData.message || resData.error || 'Something went wrong!' };
        }

        return resData;
    } catch (error) {
        return { error: error.message };
    }
};

export async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    return token;
}
